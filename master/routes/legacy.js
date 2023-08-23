const cypher = require('../cypher')
const json2xml = require('json2xml')

const config = require('../config')
const utils = require('../utils')

const playerRoutes = require('./player')
const serverRoutes = require('./server')
const tournamentRoutes = require('./tournament')
const objectRoutes = require('./object')

const LegacyToRESTMapper = {
  nouveaujoueur: playerRoutes.createPlayer,
  info_joueur: playerRoutes.getPlayer,
  get_id: playerRoutes.getPlayerId,
  score_plus: playerRoutes.addScore,
  set_tournois: tournamentRoutes.createTournament,
  get_mp3: serverRoutes.getMP3,
  get_map: serverRoutes.getMapList,
  set_server: serverRoutes.createServer,
  get_server: serverRoutes.getServerList,
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
    query: {
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
      if (app.debug) console.log(req.query.crypt)
      const requestData = cypher.decypher(req.query.crypt).split(/[?&]+/)
      for (entry of requestData) {
        const data = entry.split('=')
        req.body[data[0].toUpperCase()] = data[1]
      }
      if (app.debug) utils.logPayload(req.body)
      // Call appopriate REST method from mapper
      LegacyToRESTMapper[req.body.METHOD](app, req, res, next)
    } catch (e) {
      console.error(e)
      res.status(500).send('Internal server error')
    }
  }
}
