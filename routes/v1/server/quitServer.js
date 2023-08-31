const Joi = require('joi')

const utils = require('../../../utils')

// quit_server -> quitServer
module.exports = {
  description: 'Register a client disconnection from a server',
  method: 'post',
  route: '/v1/servers/:serverId/quit',
  schema: {
    query: Joi.object({
      serverId: Joi.number().integer().optional()
    }),
    body: Joi.object({
      LENUM: Joi.number().integer().required().description('The ID of the player sending the request'),
      LEPASS: Joi.string().required().description('The password of the player sending the request'),
      LESCORE: Joi.number().integer().required().description('The score the user had just before disconnecting'),
      LAPARTIE: Joi.number().integer().required().description('The ID of the server to quit'),
      KILLER: Joi.number().integer().required().description('The amount of kills the player disconnecting did'),
      KILLED: Joi.number().integer().required().description('The amount of deaths the player disconnecting had'),
      LAVERSION: Joi.string().required().description('The version of the software used for sending the request')
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
    const serverIdx = app.serverList.findIndex((serv) => serv.serverId === parseInt(req.body.LAPARTIE))
    if (serverIdx < 0) {
      res.status(500).send({ error: 'Invalid SERVERID' })
      return next()
    }
    const server = app.serverList[serverIdx]
    server.connectedPeers.splice(server.connectedPeers.indexOf(parseInt(req.body.LENUM)), 1)
    utils.logger('game', `Player ${parseInt(req.body.LENUM)} left server [${server.serverId}] ${server.host}`)
    res.status(200).send()
    next()
  }
}
