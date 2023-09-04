const Joi = require('joi')

const utils = require('../../../utils')

// quit_server -> quitServer
module.exports = {
  description: 'Register a client disconnection from a server',
  method: 'post',
  route: '/v1/servers/:serverId/quit',
  params: {
    query: Joi.object({
      serverId: Joi.number().integer().optional()
    }),
    body: Joi.object({
      LESCORE: Joi.number().integer().required().description('The score the user had just before disconnecting'),
      KILLER: Joi.number().integer().required().description('The amount of kills the player disconnecting did'),
      KILLED: Joi.number().integer().required().description('The amount of deaths the player disconnecting had')
    })
  },
  responses: {
    200: null,
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
    const serverIdx = app.serverList.findIndex((serv) => serv.serverId === parseInt(req.body.LAPARTIE))
    if (serverIdx < 0) {
      res.status(500).send({ error: 'Invalid SERVERID' })
      return next()
    }
    player.update({})
    const server = app.serverList[serverIdx]
    server.connectedPeers.splice(server.connectedPeers.indexOf(parseInt(req.body.LENUM)), 1)
    utils.logger('game', `Player ${parseInt(req.body.LENUM)} left server [${server.serverId}] ${server.host}`)
    res.status(200).send()
    next()
  }
}
