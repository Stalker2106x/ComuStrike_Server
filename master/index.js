const express = require('express')
const knex = require('knex')

const config = require('./config')

const playerRoutes = require('./routes/player')
const serverRoutes = require('./routes/server')
const mapRoutes = require('./routes/map')
const tournamentRoutes = require('./routes/tournament')
const objectRoutes = require('./routes/object')
const miscRoutes = require('./routes/misc')
const legacyRoute = require('./routes/legacy')

class App {
  constructor () {
    // Initialize DB
    try {
      this.db = knex({
        client: 'mysql',
        useNullAsDefault: true,
        connection: config.database
      })
    } catch (e) {
      console.error(`Database connection failed: ${e}`)
    }
    try {
      const router = express.Router()
      // Player
      router.post('/player', playerRoutes.createPlayer)
      router.get('/player/:id', playerRoutes.getPlayer)
      router.get('/player/:id/id', playerRoutes.getPlayerId)
      router.put('player/:id/score', playerRoutes.addScore)
      // Server
      router.post('/server', serverRoutes.createServer)
      router.get('/server/:id', serverRoutes.getServer)
      router.delete('/server', serverRoutes.deleteServer)
      router.put('/server/:id/join', serverRoutes.joinServer)
      router.put('/server/:id/quit', serverRoutes.quitServer)
      // Map
      router.get('/map', mapRoutes.getMap)
      // Tournament
      router.post('/tournament', tournamentRoutes.createTournament)
      router.get('/tournament', tournamentRoutes.getTournament)
      router.get('/tournament/:id/info', tournamentRoutes.getTournamentInfo)
      // Object
      router.get('/object', objectRoutes.getObject)
      router.post('/object', objectRoutes.placeObject)
      // Misc
      router.get('/mp3', miscRoutes.getMP3)
      router.post('/mp3', miscRoutes.setMP3)
      // Legacy
      router.get('xml_layer', legacyRoute)
    } catch (e) {
      console.error(`Server error: ${e}`)
    }
  }
}
// eslint-disable-next-line no-unused-vars
const app = App()
