const Joi = require('joi')

const utils = require('../../../utils')

// join_server -> joinServer
module.exports = {
  description: 'Register a client connection to a server',
  method: 'post',
  route: '/v1/servers/:serverId/join',
  params: {
    query: Joi.object({
      serverId: Joi.number().integer().required()
    }),
    body: null
  },
  responses: {
    200: Joi.number().integer().required().description('ID of the joined server'),
    500: Joi.object({
      error: Joi.string().required().description('A short description of the error that occured')
    })
  },
  handler: async (app, req, res, next) => {
    let player
    try {
      player = await utils.authorizePlayer(app, req)
    } catch (e) {
      res.status(500).send({ error: `Authorization error: ${e}` })
      return next()
    }
    const serverId = parseInt(req.query.serverId || req.body.SERVERID)
    const server = app.serverList[app.serverList.findIndex((serv) => serv.serverId === serverId)]
    if (!server) {
      res.status(500).send({ error: 'Invalid SERVERID' })
      return next()
    }
    if (server.connectedPeers.indexOf(player.player_id) !== -1) {
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
