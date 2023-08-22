const express = require('express')
const { Validator } = require("express-json-validator-middleware")
const { Sequelize } = require('sequelize')

const config = require('./config')

const playerRoutes = require('./routes/player')
const serverRoutes = require('./routes/server')
const mapRoutes = require('./routes/map')
const tournamentRoutes = require('./routes/tournament')
const objectRoutes = require('./routes/object')
const miscRoutes = require('./routes/misc')
const legacyRoutes = require('./routes/legacy')

class App {
  async initDB () {
    try {
      this.db = new Sequelize(config.database.database, config.database.user, config.database.password, {
        host: config.database.host,
        port: config.database.port,
        dialect: 'mysql'
      })
      await this.db.authenticate()
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
      // Player
      this.app.post('/player', validate(playerRoutes.createPlayerSchema), (req, res) => playerRoutes.createPlayer(this, req, res))
      this.app.get('/player/:id', validate(playerRoutes.getPlayerSchema), (req, res) => playerRoutes.getPlayer(this, req, res))
      this.app.get('/player/:id/id', validate(playerRoutes.getPlayerIdSchema), (req, res) => playerRoutes.getPlayerId(this, req, res))
      this.app.put('player/:id/score', validate(playerRoutes.addScoreSchema), (req, res) => playerRoutes.addScore(this, req, res))
      // Server
      this.app.post('/server', validate(serverRoutes.createServerSchema), (req, res) => serverRoutes.createServer(this, req, res))
      this.app.get('/server/:id', validate(serverRoutes.getServerSchema), (req, res) => serverRoutes.getServer(this, req, res))
      this.app.delete('/server', validate(serverRoutes.deleteServerSchema), (req, res) => serverRoutes.deleteServer(this, req, res))
      this.app.put('/server/:id/join', validate(serverRoutes.joinServerSchema), (req, res) => serverRoutes.joinServer(this, req, res))
      this.app.put('/server/:id/quit', validate(serverRoutes.quitServerSchema), (req, res) => serverRoutes.quitServer(this, req, res))
      // Map
      this.app.get('/map', validate(mapRoutes.getMapSchema), (req, res) => mapRoutes.getMap(this, req, res))
      // Tournament
      this.app.post('/tournament', validate(tournamentRoutes.createTournamentSchema), (req, res) => tournamentRoutes.createTournament(this, req, res))
      this.app.get('/tournament', validate(tournamentRoutes.getTournamentSchema), (req, res) => tournamentRoutes.getTournament(this, req, res))
      this.app.get('/tournament/:id/info', validate(tournamentRoutes.getTournamentInfoSchema), (req, res) => tournamentRoutes.getTournamentInfo(this, req, res))
      // Object
      this.app.get('/object', validate(objectRoutes.getObjectSchema), (req, res) => objectRoutes.getObject(this, req, res))
      this.app.post('/object', validate(objectRoutes.placeObjectSchema), (req, res) => objectRoutes.placeObject(this, req, res))
      // Misc
      this.app.get('/mp3', validate(miscRoutes.getMP3Schema), (req, res) => miscRoutes.getMP3(this, req, res))
      this.app.post('/mp3', validate(miscRoutes.setMP3Schema), (req, res) => miscRoutes.setMP3(this, req, res))
      // Legacy
      this.app.get('xml_layer', validate( legacyRoutes.xmlLayerSchema), (req, res) => legacyRoutes.xmlLayer(this, req, res))
    } catch (e) {
      console.error(`Server error: ${e}, (req, res) => ${e.stack}`)
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
