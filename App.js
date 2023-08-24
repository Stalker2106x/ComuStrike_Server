const readline = require('readline');
const express = require('express')
const bodyParser = require('body-parser')
const xmljs = require('xml-js')
const fs = require('fs')
const path = require('path')
const { Worker } = require("worker_threads")
const { Validator, ValidationError } = require("express-json-validator-middleware")
const { Sequelize } = require('sequelize')
const pubip = require('public-ip')
const mariadb = require('mariadb')

const config = require('./config')
const utils = require('./utils')
const routes = require('./routes')
const xmlLayer = require('./routes/misc/xmlLayer')

const defaultData = require('./models/defaultData')

const Players = require('./models/Players')
const Teams = require('./models/Teams')
const Maps = require('./models/Maps')
const Tournaments = require('./models/Tournaments')

function objectSplit(object) {
  let xmlData = {}
  for (key of Object.keys(object)) {
    if (key.includes('__')) {
      // If a response has a key with __ we consider it being an attribute
      if (key.startsWith('__')) {
        // if __ has no prefix, attributes belong to current element
        xmlData._attributes = { ...xmlData._attributes, [key.replace('__', '')]: object[key]}
      } else {
        // if __ has prefix, attributes belong to child element
        let [child, attribute] = key.split('__')
        xmlData[child] = { ...xmlData[child], _attributes: { ...xmlData[child]._attributes, [attribute]: object[key] } }
      }
    } else if (typeof object[key] === 'object') {
      // If it is a nested object we recursively parse it
      xmlData[key] = objectSplit(object[key])
    } else {
      // basic element
      xmlData[key] = { _text: object[key] }
    }
  }
  return (xmlData)
}

function arrayFix(res, val) {
  // Arrays get converted to elements called 0,1,2...
  // We convert numeric names to given arrayKey to prevent that.
  if (/^\d+$/.test(val)) {
    val = res.arrayKey
  }
  return (val)
}

function sendMiddleware(app, req, res, next) {
  const oldSend = res.send
  res.send = function(body) {
    res.send = oldSend // set function back to avoid the 'double-send'
    if (req.query.crypt) {
      if (body && body.hasOwnProperty('return')) {
        //If object contains a return key, we convert it to single value body
        const xmlData = { _declaration: { _attributes: { version:"1.0", encoding:"ISO-8859-1" } }, root: { _text: body.return } }
        if (app.debug) console.log(xmljs.js2xml(xmlData, { compact: true, spaces: 4 }))
        return res.type('application/xml').send(xmljs.js2xml(xmlData, { compact: true, spaces: 0 }))
      } else if (typeof body === 'object') {
        // We have to convert current response to legacy XML schema
        const xmlData = { _declaration: { _attributes: { version:"1.0", encoding:"ISO-8859-1" } }, root: objectSplit(body) }
        if (app.debug) console.log(xmljs.js2xml(xmlData, { compact: true, spaces: 4, elementNameFn: (val) => arrayFix(res, val) }))
        return res.type('application/xml').send(xmljs.js2xml(xmlData, { compact: true, spaces: 0, elementNameFn: (val) => arrayFix(res, val) }))
      } else {
        // Empty response
        if (app.debug) console.log('empty response')
        return res.send()
      }
    } else {
      if (app.debug) console.log(body)
      return res.send(body)
    }
  }
  next()
}

function validationError(error, request, response, next) {
  // Check the error is a validation error
  if (error instanceof ValidationError) {
    response.status(400).send(error.validationErrors)
    next()
  } else {
    // Pass error on if not a validation error
    next(error)
  }
}

class App {

  constructor(debug, fillDB) {
    const self = this
    console.log('█████████████████████████████████████████████████████████████')
    console.log('█─▄▄▄─█─▄▄─█▄─▀█▀─▄█▄─██─▄█─▄▄▄▄█─▄─▄─█▄─▄▄▀█▄─▄█▄─█─▄█▄─▄▄─█')
    console.log('█─███▀█─██─██─█▄█─███─██─██▄▄▄▄─███─████─▄─▄██─███─▄▀███─▄█▀█')
    console.log('█▄▄▄▄▄▀▄▄▄▄▀▄▄▄▀▄▄▄▀▀▄▄▄▄▀▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄█')
    console.log(`Server v${config.serverVersion}  -  Game v${config.gameVersion}`.padStart(61))
    console.log('...')
    this.debug = debug
    this.fillDB = fillDB
    process.on('SIGINT', function() {
      console.log('Terminating server...');
      self.api.close()
      self.chatWorker.postMessage({ exit: true })
      process.exit(0)
    });
  }

  async loadConfig () {
    let userConfig = {}
    let dirname = __dirname
    if (process.pkg) {
      dirname = path.dirname(process.execPath)
    }
    try {
      userConfig = JSON.parse(fs.readFileSync(path.join(dirname, config.userConfigPath), 'utf-8'))
    } catch (e) {
      // If server has no config we create one
      if (e.code === 'ENOENT') {
        console.log('It looks like the server has no config.json file, creating one with default values...')
        fs.writeFileSync(path.join(dirname, config.userConfigPath), JSON.stringify(config.defaultUserConfig, null, 2))
        userConfig = config.defaultUserConfig
      }
    }
    const publicIP = await pubip.v4()
    this.config = { ...config, ...userConfig, publicIP: publicIP }
  }

  async initDB () {
    try {
      this.db = new Sequelize(this.config.database.database, this.config.database.user, this.config.database.password, {
        host: this.config.database.host,
        port: this.config.database.port,
        dialect: 'mariadb',
        dialectModule: mariadb,
        logging: this.debug
      })
      await this.db.authenticate()
      await this.db.define(Players.name, Players.define, Players.options)
      await this.db.define(Teams.name, Teams.define, Teams.options)
      await this.db.define(Maps.name, Maps.define, Maps.options)
      await this.db.define(Tournaments.name, Tournaments.define, Tournaments.options)
      await this.db.models.Players.sync() //Make sure player table exists for next request
      const playerCount = await this.db.models.Players.count()
      if (playerCount == 0 || this.fillDB) {
        if (this.fillDB) {
          console.warn('You started the server with the --fillDB switch which is DESTRUCTIVE.')
        } else if (playerCount == 0) {
          console.warn('It looks like the server database is empty. To function properly, ComuStrike needs base data.')
          console.warn('The next process will inject adequate data into your database.')
        } 
        console.warn('All your database is gonna be ERASED and replaced with default values')
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        const confirm = await new Promise(resolve => {
          rl.question('Are you sure you want to proceed ? (y/n): ', resolve)
        })
        if (confirm !== 'y') {
          console.log('Cancelled. exiting program...')
          process.exit(0)
        }
        await this.db.sync({ force: true })
        await defaultData.createPlayers(this)
        await defaultData.createTeams(this)
        await defaultData.createMaps(this)
        console.log('Database was filled successfully!')
      } else {
        await this.db.sync()
      }
    } catch (e) {
      console.error(`Database initialization failed: ${e}`)
      process.exit(1)
    }
  }

  initServerList () {
    // Initialize serverList
    this.serverList = new Map()
    if (this.debug) {
      this.serverList.set(0, {
        name: 'fakeserv',
        version: '157',
        host: 'localhost',
        owner: 0,
        map: 'tunisia',
        description: 'fake server',
        slots: 5,
        tournamentId: 0,
        private: 0,
        weapons: '*****************************',
        md5: '49fed900999d62fc6c950fa129384e72',
        connectedPeers: []
      })
    }
  }

  initRouter () {
    // Initialize router
    try {
      const { validate } = new Validator()
      this.validate = validate
      this.app = express()
      this.app.use(bodyParser.json())
      this.app.use((req, res, next) => sendMiddleware(this, req, res, next))
      this.app.use(validationError)
      // Player
      this.app.post('/player', validate(routes.createPlayer.schema), (req, res, next) => routes.createPlayer.handler(this, req, res, next))
      this.app.get('/player/:id', validate(routes.getPlayer.schema), (req, res, next) => routes.getPlayer.handler(this, req, res, next))
      this.app.get('/player/:id/id', validate(routes.getPlayerId.schema), (req, res, next) => routes.getPlayerId.handler(this, req, res, next))
      this.app.put('/player/:id/score', validate(routes.addScore.schema), (req, res, next) => routes.addScore.handler(this, req, res, next))
      // Server
      this.app.post('/server', validate(routes.createServer.schema), (req, res, next) => routes.createServer.handler(this, req, res, next))
      this.app.get('/servers', validate(routes.getServerList.schema), (req, res, next) => routes.getServerList.handler(this, req, res, next))
      this.app.get('/server/mp3', validate(routes.getMP3.schema), (req, res, next) => routes.getMP3.handler(this, req, res, next))
      this.app.delete('/server', validate(routes.deleteServer.schema), (req, res, next) => routes.deleteServer.handler(this, req, res, next))
      this.app.put('/server/:id/join', validate(routes.joinServer.schema), (req, res, next) => routes.joinServer.handler(this, req, res, next))
      this.app.put('/server/:id/quit', validate(routes.quitServer.schema), (req, res, next) => routes.quitServer.handler(this, req, res, next))
      // Map
      this.app.get('/maps', validate(routes.getMapList.schema), (req, res, next) => routes.getMapList.handler(this, req, res, next))
      // Tournament
      this.app.post('/tournament', validate(routes.createTournament.schema), (req, res, next) => routes.createTournament.handler(this, req, res, next))
      this.app.get('/tournament', validate(routes.getTournament.schema), (req, res, next) => routes.getTournament.handler(this, req, res, next))
      this.app.get('/tournament/:id/info', validate(routes.getTournament.schema), (req, res, next) => routes.getTournament.handler(this, req, res, next))
      // Object
      this.app.get('/object', validate(routes.getObject.schema), (req, res, next) => routes.getObject.handler(this, req, res, next))
      this.app.post('/object', validate(routes.placeObject.schema), (req, res, next) => routes.placeObject.handler(this, req, res, next))
      // Legacy
      this.app.get('/script/romustrike/xml_layer.php', validate(xmlLayer.schema), (req, res, next) => xmlLayer.handler(this, req, res, next))
      this.app.get('/romustrike/mp3/:music',(req, res, next) => routes.downloadMP3.handler(this, req, res, next))
      // Debug
      if (this.debug) {
        this.app.post('/cypher', (req, res, next) => { res.status(200).send(utils.cypher(this, req.body.msg)); })
      }
    } catch (e) {
      console.error(`Server error: ${e} => ${e.stack}`)
      process.exit(1)
    }
  }

  initChat() {
    this.chatWorker = new Worker("./Chat", { workerData: { config: this.config } });
  }

  async run () {
    await this.loadConfig()
    await this.initDB()
    this.initServerList()
    this.initRouter()
    this.initChat()
    this.api = this.app.listen(this.config.gamePort, () => {
      utils.logger('game', `Game Server listening on ${this.config.publicIP}:${this.config.gamePort}...`)
    })
  }
}
module.exports = App
