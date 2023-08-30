const readline = require('readline')
const express = require('express')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const { Worker } = require('worker_threads')
const { Sequelize } = require('sequelize')
const mariadb = require('mariadb')

const config = require('./config')
const utils = require('./utils')
const routes = require('./routes')
const xmlLayer = require('./routes/xmlLayer/xmlLayer')

const validate = require('./middlewares/validation').middleware
const sendMiddleware = require('./middlewares/sendMiddleware')

const defaultData = require('./models/defaultData')

const Players = require('./models/Players')
const MP3 = require('./models/MP3')
const Teams = require('./models/Teams')
const Maps = require('./models/Maps')
const Tournaments = require('./models/Tournaments')

class App {
  constructor (debug, fillDB, forceLocalhost) {
    const self = this
    console.log('█████████████████████████████████████████████████████████████')
    console.log('█─▄▄▄─█─▄▄─█▄─▀█▀─▄█▄─██─▄█─▄▄▄▄█─▄─▄─█▄─▄▄▀█▄─▄█▄─█─▄█▄─▄▄─█')
    console.log('█─███▀█─██─██─█▄█─███─██─██▄▄▄▄─███─████─▄─▄██─███─▄▀███─▄█▀█')
    console.log('█▄▄▄▄▄▀▄▄▄▄▀▄▄▄▀▄▄▄▀▀▄▄▄▄▀▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄█')
    console.log(`Server v${config.serverVersion}  -  Game v${config.gameVersion}`.padStart(61))
    console.log('...')
    if (debug) global.debug = true
    if (forceLocalhost) global.forceLocalhost = true
    this.fillDB = fillDB
    process.on('SIGINT', function () {
      console.log('Terminating server...')
      self.api.close()
      self.chatWorker.postMessage({ exit: true })
      process.exit(0)
    })
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
    const publicIP = await utils.getIp()
    this.config = { ...config, ...userConfig, publicIP }
    // Set globals for logger
    if (this.config.logFile && this.config.logFile !== '') global.logFile = this.config.logFile
  }

  async initDB () {
    try {
      this.db = new Sequelize(this.config.database.database, this.config.database.user, this.config.database.password, {
        host: this.config.database.host,
        port: this.config.database.port,
        dialect: 'mariadb',
        dialectModule: mariadb,
        logging: global.debug
      })
      await this.db.authenticate()
      await this.db.define(Players.name, Players.define, Players.options)
      await this.db.define(MP3.name, MP3.define, MP3.options)
      await this.db.define(Teams.name, Teams.define, Teams.options)
      await this.db.define(Maps.name, Maps.define, Maps.options)
      await this.db.define(Tournaments.name, Tournaments.define, Tournaments.options)
      await this.db.models.Players.sync() // Make sure player table exists for next request
      const playerCount = await this.db.models.Players.count()
      if (playerCount === 0 || this.fillDB) {
        if (this.fillDB) {
          console.warn('You started the server with the --fillDB switch which is DESTRUCTIVE.')
        } else if (playerCount === 0) {
          console.warn('It looks like the server database is empty. To function properly, ComuStrike needs base data.')
          console.warn('The next process will inject adequate data into your database.')
        }
        console.warn('All your database is gonna be ERASED and replaced with default values')
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        })
        const confirm = await new Promise(resolve => {
          rl.question('Are you sure you want to proceed ? (y/n): ', resolve)
        })
        if (confirm !== 'y') {
          console.log('Cancelled. exiting program...')
          process.exit(0)
        }
        await this.db.sync({ force: true })
        await defaultData.createPlayers(this)
        await defaultData.createMP3(this)
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
    this.serverList = []
    if (global.debug) {
      this.serverList.push({
        serverId: 0,
        name: 'Fake server DEBUG USE ONLY',
        version: '157',
        host: 'localhost',
        owner: 0,
        level: 'tunisia',
        description: 'Non-existing server',
        slots: 5,
        tournamentId: 0,
        private: true,
        weapons: '*****************************',
        md5: '49fed900999d62fc6c950fa129384e72',
        connectedPeers: []
      })
    }
  }

  initRouter () {
    // Initialize router
    try {
      this.app = express()
      this.app.use(cors())
      this.app.use(bodyParser.json())

      // Defaults is 100 request in 15 minutes frame
      this.app.use(rateLimit({
        windowMs: this.config.rateLimitWindow,
        max: this.config.rateLimitRequests,
        standardHeaders: true,
        legacyHeaders: false
      }))

      this.app.use(sendMiddleware)
      // Player
      this.app.post('/v1/players', (req, res, next) => { validate(routes.createPlayer.schema, req, res, next) }, (req, res, next) => routes.createPlayer.handler(this, req, res, next))
      this.app.post('/v1/players/:playerId/mp3', (req, res, next) => { validate(routes.setMP3.schema, req, res, next) }, (req, res, next) => routes.setMP3.handler(this, req, res, next))
      this.app.get('/v1/players/:playerId', (req, res, next) => { validate(routes.getPlayer.schema, req, res, next) }, (req, res, next) => routes.getPlayer.handler(this, req, res, next))
      this.app.get('/v1/players/:username/id', (req, res, next) => { validate(routes.getPlayerId.schema, req, res, next) }, (req, res, next) => routes.getPlayerId.handler(this, req, res, next))
      // Server
      this.app.post('/v1/servers', (req, res, next) => { validate(routes.createServer.schema, req, res, next) }, (req, res, next) => routes.createServer.handler(this, req, res, next))
      this.app.get('/v1/servers', (req, res, next) => { validate(routes.getServerList.schema, req, res, next) }, (req, res, next) => routes.getServerList.handler(this, req, res, next))
      this.app.delete('/v1/servers/:serverId', (req, res, next) => { validate(routes.deleteServer.schema, req, res, next) }, (req, res, next) => routes.deleteServer.handler(this, req, res, next))
      this.app.put('/v1/servers/:serverId/join', (req, res, next) => { validate(routes.joinServer.schema, req, res, next) }, (req, res, next) => routes.joinServer.handler(this, req, res, next))
      this.app.put('/v1/servers/:serverId/quit', (req, res, next) => { validate(routes.quitServer.schema, req, res, next) }, (req, res, next) => routes.quitServer.handler(this, req, res, next))
      // Assets
      this.app.get('/v1/mp3', (req, res, next) => { validate(routes.getMP3List.schema, req, res, next) }, (req, res, next) => routes.getMP3List.handler(this, req, res, next))
      this.app.get('/v1/maps', (req, res, next) => { validate(routes.getMapList.schema, req, res, next) }, (req, res, next) => routes.getMapList.handler(this, req, res, next))
      this.app.get('/romustrike/:assetType/:music', (req, res, next) => routes.downloadAsset.handler(this, req, res, next))
      // Tournament
      this.app.post('/v1/tournaments', (req, res, next) => { validate(routes.createTournament.schema, req, res, next) }, (req, res, next) => routes.createTournament.handler(this, req, res, next))
      this.app.get('/v1/tournaments', (req, res, next) => { validate(routes.getTournament.schema, req, res, next) }, (req, res, next) => routes.getTournament.handler(this, req, res, next))
      this.app.get('/v1/tournaments/:tournamentId/info', (req, res, next) => { validate(routes.getTournament.schema, req, res, next) }, (req, res, next) => routes.getTournament.handler(this, req, res, next))
      // Object
      this.app.get('/v1/objects', (req, res, next) => { validate(routes.getObject.schema, req, res, next) }, (req, res, next) => routes.getObject.handler(this, req, res, next))
      this.app.post('/v1/objects', (req, res, next) => { validate(routes.placeObject.schema, req, res, next) }, (req, res, next) => routes.placeObject.handler(this, req, res, next))
      // Web
      this.app.get('/', (req, res, next) => { routes.home.handler(this, req, res) })
      this.app.get('/register', (req, res, next) => { routes.register.handler(this, req, res) })
      // Legacy
      this.app.get('/script/romustrike/xml_layer.php', (req, res, next) => { validate(routes.placeObject.schema, req, res, next) }, (req, res, next) => xmlLayer.handler(this, req, res, next))
      // Debug
      if (global.debug) {
        this.app.post('/cypher', (req, res, next) => { res.status(200).send(utils.cypher(this, req.body.msg)) })
      }
    } catch (e) {
      console.error(`Server error: ${e} => ${e.stack}`)
      process.exit(1)
    }
  }

  initChat () {
    this.chatWorker = new Worker(path.join(__dirname, 'Chat.js'), { workerData: { config: this.config } })
  }

  async run () {
    await this.loadConfig()
    await this.initDB()
    this.initServerList()
    this.initRouter()
    this.initChat()
    this.api = this.app.listen(this.config.gamePort, '0.0.0.0', () => {
      utils.logger('game', `Game Server listening on ${this.config.publicIP}:${this.config.gamePort}...`)
    })
  }
}
module.exports = App
