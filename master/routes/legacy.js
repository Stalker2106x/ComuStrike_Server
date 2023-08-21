const cypher = require('./cypher')
const json2xml = require('json2xml')

const playerRoutes = require('./routes/player')
const serverRoutes = require('./routes/server')
const mapRoutes = require('./routes/map')
const tournamentRoutes = require('./routes/tournament')
const objectRoutes = require('./routes/object')
const miscRoutes = require('./routes/misc')
const legacyRoutes = require('./routes/legacy')

const LegacyToRESTMapper = {
  nouveaujoueur: playerRoutes.createPlayer,
  get_map: mapRoutes.getMap,
  delete_server: serverRoutes.deleteServer,
  quitter_server: serverRoutes.quitServer,
  set_tournois: tournamentRoutes.createTournament,
  score_plus: playerRoutes.addScore,
  set_mp3: miscRoutes.setMP3,
  set_server: serverRoutes.createServer,
  get_server: serverRoutes.getServer,
  get_id: serverRoutes.getPlayerId,
  info_joueur: playerRoutes.getPlayer,
  joinserver: serverRoutes.joinServer,
  get_tournois: tournamentRoutes.getTournament,
  info_tournois: tournamentRoutes.getTournamentInfo,
  set_objet: objectRoutes.placeObject,
  get_objet: objectRoutes.getObject
}

module.exports = (req, res, next) {
  try {
    const requestData = cypher.decypher(req.query.crypt).split(/[?&]+/)
    req.body = { ...requestData }
    // Call appopriate REST method from mapper
    LegacyToRESTMapper[requestData.method](req, res)
    // We have to convert current response to legacy XML schema
    res.type('application/xml').send(`<?xml version="1.0" encoding="ISO-8859-1"?><root>${json2xml(res.body)}</root>`)
  } catch (e) {
    res.status(500).send('Internal server error')
  }
}