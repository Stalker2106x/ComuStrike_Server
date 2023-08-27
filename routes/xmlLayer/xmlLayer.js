const utils = require('../../utils')
const routes = require('../index')

const LegacyToRESTMapper = {
  nouveaujoueur: routes.createPlayer,
  info_joueur: routes.getPlayer,
  get_id: routes.getPlayerId,
  score_plus: routes.addScore,
  set_tournois: routes.createTournament,
  get_mp3: routes.getMP3List,
  set_mp3: routes.setMP3,
  get_map: routes.getMapList,
  set_server: routes.createServer,
  get_server: routes.getServerList,
  delete_server: routes.deleteServer,
  joinserver: routes.joinServer,
  quitter_server: routes.quitServer,
  get_tournois: routes.getTournaments,
  info_tournois: routes.getTournament,
  set_objet: routes.placeObject,
  get_objet: routes.getObject
}

// xml_layer.php -> xmlLayer
module.exports = {
  schema: {
    query: {
      type: 'object',
      required: ['crypt'],
      properties: {
        crypt: {
          type: 'string',
          minLength: 3,
          maxLength: 1500
        }
      }
    }
  },
  handler: (app, req, res, next) => {
    if (global.debug) console.log(req.query.crypt)
    try {
      const requestData = utils.decypher(app, req.query.crypt).split(/[?&]+/)
      for (const entry of requestData) {
        const data = entry.split('=')
        req.body[data[0].toUpperCase()] = data[1]
      }
    } catch (e) {
      res.status(500).send('Invalid crypt payload')
      next()
      return
    }
    if (global.debug) utils.logPayload(req.body)
    if (!Object.prototype.hasOwnProperty.call(LegacyToRESTMapper, req.body.METHOD)) {
      res.status(500).send('Unknown method')
      next()
    } else {
      // Call appopriate REST method from mapper
      LegacyToRESTMapper[req.body.METHOD].handler(app, req, res, next)
    }
  }
}