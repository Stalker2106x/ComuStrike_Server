const Joi = require('joi')

const utils = require('../../utils')

// join_server -> joinServer
module.exports = {
  schema: {
    query: Joi.object({
      serverId: Joi.number().optional()
    }),
    body: Joi.object({
      LENUM: Joi.number().required(),
      LEPASS: Joi.string().required(),
      LESOFT: Joi.number().required(),
      SERVERID: Joi.number().required(),
      LAVERSION: Joi.string().required()
    })
  },
  handler: async (app, req, res, next) => {
    let player
    try {
      player = await utils.authorizePlayer(app, { id: req.body.LENUM, password: req.body.LEPASS })
    } catch (e) {
      res.status(500).send({ error: 'Invalid credentials' })
      return next()
    }
    const serverId = parseInt( req.query.serverId || req.body.SERVERID)
    const server = app.serverList[app.serverList.findIndex((serv) => serv.serverId === serverId)]
    if (!server) {
      res.status(500).send({ error: 'Invalid SERVERID' })
      return next()
    }
    if (server.connectedPeers.indexOf(player.player_id) != -1) {
      res.status(500).send({ error: 'Player ID already on server' })
      next()
      return
    }
    server.connectedPeers.push(parseInt(req.body.LENUM))
    utils.logger('game', `Player ${parseInt(req.body.LENUM)} joined server [${server.serverId}] ${server.host}`)
    res.status(200).send({ return: server.serverId })
    next()
  }
}
