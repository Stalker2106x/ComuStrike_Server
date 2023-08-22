const cypher = require('../cypher')
const json2xml = require('json2xml')

const config = require('../config')

const playerRoutes = require('./player')
const serverRoutes = require('./server')
const mapRoutes = require('./map')
const tournamentRoutes = require('./tournament')
const objectRoutes = require('./object')
const miscRoutes = require('./misc')

const LegacyToRESTMapper = {
  nouveaujoueur: playerRoutes.createPlayer,
  info_joueur: playerRoutes.getPlayer,
  get_id: serverRoutes.getPlayerId,
  score_plus: playerRoutes.addScore,
  set_tournois: tournamentRoutes.createTournament,
  set_mp3: miscRoutes.setMP3,
  get_map: mapRoutes.getMap,
  set_server: serverRoutes.createServer,
  get_server: serverRoutes.getServer,
  delete_server: serverRoutes.deleteServer,
  joinserver: serverRoutes.joinServer,
  quitter_server: serverRoutes.quitServer,
  get_tournois: tournamentRoutes.getTournaments,
  info_tournois: tournamentRoutes.getTournament,
  set_objet: objectRoutes.placeObject,
  get_objet: objectRoutes.getObject
}

module.exports = {
  xmlLayerSchema: {
    body: {
      type: 'object',
      required: ['crypt'],
      properties: {
        crypt: {
          type: 'string',
          minLength: 3,
          maxLength: config.maxLength
        }
      }
    }
  },
  xmlLayer: (app, req, res, next) => {
    try {
      const requestData = cypher.decypher(req.query.crypt).split(/[?&]+/)
      req.body = { ...requestData }
      // Call appopriate REST method from mapper
      LegacyToRESTMapper[requestData.method](app, req, res)
      // We have to convert current response to legacy XML schema
      res.type('application/xml').send(`<?xml version="1.0" encoding="ISO-8859-1"?><root>${json2xml(res.body)}</root>`)
    } catch (e) {
      res.status(500).send('Internal server error')
    }
  }
}
