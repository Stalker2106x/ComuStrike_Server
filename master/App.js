const express = require('express')
const bodyParser = require('body-parser')
const json2xml = require('json2xml')
const { Validator, ValidationError } = require("express-json-validator-middleware")
const { Sequelize } = require('sequelize')

const config = require('./config')

const playerRoutes = require('./routes/player')
const serverRoutes = require('./routes/server')
const mapRoutes = require('./routes/map')
const tournamentRoutes = require('./routes/tournament')
const objectRoutes = require('./routes/object')
const miscRoutes = require('./routes/misc')
const legacyRoutes = require('./routes/legacy')

const cypher = require('./cypher')

const Players = require('./models/Players');
const Tournaments = require('./models/Tournaments');
const e = require('express')

function sender (req, res) {
  if (res.body == null) {
    res.status(200).send()
  } else if (req.query.crypt) {
    // We have to convert current response to legacy XML schema
    let xmlDoc = ''
    if (typeof res.body === 'object') {
      for (key of Object.keys(res.body)) {
        if (typeof res.body[key] === 'object') {
          const value = res.body[key].value
          delete res.body[key].value
          xmlDoc += json2xml({ [key]: value, attr: { ...res.body[key] } }, { attributes_key: 'attr' })
        } else {
          xmlDoc += json2xml({ [key]: res.body[key] })
        }
      }
    } else {
      xmlDoc += json2xml(res.body)
    }
    res.type('application/xml').send(`<?xml version="1.0" encoding="ISO-8859-1"?><root>${xmlDoc}</root>`)
  } else {
    res.status(200).json(res.body)
  }
}

class App {
  async initDB () {
    try {
      this.db = new Sequelize(config.database.database, config.database.user, config.database.password, {
        host: config.database.host,
        port: config.database.port,
        dialect: 'mariadb'
      })
      await this.db.authenticate()
      this.db.define(Players.name, Players.define, Players.options)
      this.db.define(Tournaments.name, Tournaments.define, Tournaments.options)
      await this.db.sync({ force: true })
    } catch (e) {
      console.error(`Database connection failed: ${e}`)
      process.exit(1)
    }
  }

  initServerList () {
    // Initialize serverList
    this.serverList = new Map()
  }

  initRouter () {
    // Initialize router
    try {
      const { validate } = new Validator()
      this.app = express()
      this.app.use(bodyParser.json())
      // Player
      this.app.post('/player', validate(playerRoutes.createPlayerSchema), (req, res, next) => playerRoutes.createPlayer(this, req, res, next))
      this.app.get('/player/:id', validate(playerRoutes.getPlayerSchema), (req, res, next) => playerRoutes.getPlayer(this, req, res, next))
      this.app.get('/player/:id/id', validate(playerRoutes.getPlayerIdSchema), (req, res, next) => playerRoutes.getPlayerId(this, req, res, next))
      this.app.put('/player/:id/score', validate(playerRoutes.addScoreSchema), (req, res, next) => playerRoutes.addScore(this, req, res, next))
      // Server
      this.app.post('/server', validate(serverRoutes.createServerSchema), (req, res, next) => serverRoutes.createServer(this, req, res, next))
      this.app.get('/server/:id', validate(serverRoutes.getServerSchema), (req, res, next) => serverRoutes.getServer(this, req, res, next))
      this.app.delete('/server', validate(serverRoutes.deleteServerSchema), (req, res, next) => serverRoutes.deleteServer(this, req, res, next))
      this.app.put('/server/:id/join', validate(serverRoutes.joinServerSchema), (req, res, next) => serverRoutes.joinServer(this, req, res, next))
      this.app.put('/server/:id/quit', validate(serverRoutes.quitServerSchema), (req, res, next) => serverRoutes.quitServer(this, req, res, next))
      // Map
      this.app.get('/map', validate(mapRoutes.getMapSchema), (req, res, next) => mapRoutes.getMap(this, req, res, next))
      // Tournament
      this.app.post('/tournament', validate(tournamentRoutes.createTournamentSchema), (req, res, next) => tournamentRoutes.createTournament(this, req, res, next))
      this.app.get('/tournament', validate(tournamentRoutes.getTournamentSchema), (req, res, next) => tournamentRoutes.getTournament(this, req, res, next))
      this.app.get('/tournament/:id/info', validate(tournamentRoutes.getTournamentSchema), (req, res, next) => tournamentRoutes.getTournament(this, req, res, next))
      // Object
      this.app.get('/object', validate(objectRoutes.getObjectSchema), (req, res, next) => objectRoutes.getObject(this, req, res, next))
      this.app.post('/object', validate(objectRoutes.placeObjectSchema), (req, res, next) => objectRoutes.placeObject(this, req, res, next))
      // Misc
      this.app.get('/mp3', validate(miscRoutes.getMP3Schema), (req, res, next) => miscRoutes.getMP3(this, req, res, next))
      this.app.post('/mp3', validate(miscRoutes.setMP3Schema), (req, res, next) => miscRoutes.setMP3(this, req, res, next))
      // Legacy
      this.app.get('/script/romustrike/xml_layer.php', validate(legacyRoutes.xmlLayerSchema), (req, res, next) => legacyRoutes.xmlLayer(this, req, res, next))
      // Debug
      this.app.post('/cypher', (req, res, next) => { console.log(req.body); res.status(200).send(cypher.cypher(req.body.msg)) })
      // Mws
      this.app.use((error, request, response, next) => {
        // Check the error is a validation error
        if (error instanceof ValidationError) {
          response.status(400).send(error.validationErrors)
          next()
        } else {
          // Pass error on if not a validation error
          next(error)
        }
      })
      this.app.use(sender)
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
      console.log(`Server listening on port ${config.port}...`)
    })
  }
}
module.exports = App
