const readline = require('readline');
const express = require('express')
const bodyParser = require('body-parser')
const xmljs = require('xml-js')
const { Validator, ValidationError } = require("express-json-validator-middleware")
const { Sequelize } = require('sequelize')
const mariadb = require('mariadb')

const config = require('./config')
const utils = require('./utils')

const playerRoutes = require('./routes/player')
const serverRoutes = require('./routes/server')
const tournamentRoutes = require('./routes/tournament')
const objectRoutes = require('./routes/object')
const legacyRoutes = require('./routes/legacy')

const cypher = require('./cypher')
const defaultData = require('./defaultData')

const Players = require('./models/Players')
const Maps = require('./models/Maps')
const Tournaments = require('./models/Tournaments')
const e = require('express')

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
    console.log('█████████████████████████████████████████████████████████████')
    console.log('█─▄▄▄─█─▄▄─█▄─▀█▀─▄█▄─██─▄█─▄▄▄▄█─▄─▄─█▄─▄▄▀█▄─▄█▄─█─▄█▄─▄▄─█')
    console.log('█─███▀█─██─██─█▄█─███─██─██▄▄▄▄─███─████─▄─▄██─███─▄▀███─▄█▀█')
    console.log('█▄▄▄▄▄▀▄▄▄▄▀▄▄▄▀▄▄▄▀▀▄▄▄▄▀▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄█')
    console.log(`Server v${config.serverVersion}  -  Game v${config.gameVersion}`.padStart(61))
    this.debug = debug
    this.fillDB = fillDB
  }

  async initDB () {
    try {
      this.db = new Sequelize(config.database.database, config.database.user, config.database.password, {
        host: config.database.host,
        port: config.database.port,
        dialect: 'mariadb',
        dialectModule: mariadb,
        logging: this.debug
      })
      await this.db.authenticate()
      this.db.define(Players.name, Players.define, Players.options)
      this.db.define(Maps.name, Maps.define, Maps.options)
      this.db.define(Tournaments.name, Tournaments.define, Tournaments.options)
      if (this.fillDB) {
        console.warn('You passed the switch --fillDB, all your database is gonna be erased and replaced with default values')
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        const confirm = await new Promise(resolve => {
          rl.question('Are you sure you want to proceed ? (y/n): ', resolve)
        })
        if (confirm !== 'y') {
          console.log('Cancelled. exiting program...')
          process.exit(1)
        }
        await this.db.sync({ force: true })
        await defaultData.createPlayers(this)
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
      this.app = express()
      this.app.use(bodyParser.json())
      this.app.use((req, res, next) => sendMiddleware(this, req, res, next))
      this.app.use(validationError)
      // Player
      this.app.post('/player', validate(playerRoutes.createPlayerSchema), (req, res, next) => playerRoutes.createPlayer(this, req, res, next))
      this.app.get('/player/:id', validate(playerRoutes.getPlayerSchema), (req, res, next) => playerRoutes.getPlayer(this, req, res, next))
      this.app.get('/player/:id/id', validate(playerRoutes.getPlayerIdSchema), (req, res, next) => playerRoutes.getPlayerId(this, req, res, next))
      this.app.put('/player/:id/score', validate(playerRoutes.addScoreSchema), (req, res, next) => playerRoutes.addScore(this, req, res, next))
      // Server
      this.app.post('/server', validate(serverRoutes.createServerSchema), (req, res, next) => serverRoutes.createServer(this, req, res, next))
      this.app.get('/servers', validate(serverRoutes.getServerListSchema), (req, res, next) => serverRoutes.getServerList(this, req, res, next))
      this.app.get('/server/mp3', validate(serverRoutes.getMP3Schema), (req, res, next) => serverRoutes.getMP3(this, req, res, next))
      this.app.delete('/server', validate(serverRoutes.deleteServerSchema), (req, res, next) => serverRoutes.deleteServer(this, req, res, next))
      this.app.put('/server/:id/join', validate(serverRoutes.joinServerSchema), (req, res, next) => serverRoutes.joinServer(this, req, res, next))
      this.app.put('/server/:id/quit', validate(serverRoutes.quitServerSchema), (req, res, next) => serverRoutes.quitServer(this, req, res, next))
      // Map
      this.app.get('/maps', validate(serverRoutes.getMapListSchema), (req, res, next) => serverRoutes.getMapList(this, req, res, next))
      // Tournament
      this.app.post('/tournament', validate(tournamentRoutes.createTournamentSchema), (req, res, next) => tournamentRoutes.createTournament(this, req, res, next))
      this.app.get('/tournament', validate(tournamentRoutes.getTournamentSchema), (req, res, next) => tournamentRoutes.getTournament(this, req, res, next))
      this.app.get('/tournament/:id/info', validate(tournamentRoutes.getTournamentSchema), (req, res, next) => tournamentRoutes.getTournament(this, req, res, next))
      // Object
      this.app.get('/object', validate(objectRoutes.getObjectSchema), (req, res, next) => objectRoutes.getObject(this, req, res, next))
      this.app.post('/object', validate(objectRoutes.placeObjectSchema), (req, res, next) => objectRoutes.placeObject(this, req, res, next))
      // Legacy
      this.app.get('/script/romustrike/xml_layer.php', validate(legacyRoutes.xmlLayerSchema), (req, res, next) => legacyRoutes.xmlLayer(this, req, res, next))
      // Debug
      if (this.debug) {
        this.app.post('/cypher', (req, res, next) => { res.status(200).send(cypher.cypher(req.body.msg)); })
      }
    } catch (e) {
      console.error(`Server error: ${e} => ${e.stack}`)
      process.exit(1)
    }
  }

  async run () {
    await this.initDB()
    this.initServerList()
    this.initRouter()
    this.app.listen(config.port, () => {
      utils.logger(`Server listening on port ${config.port}...`)
    })
  }
}
module.exports = App
