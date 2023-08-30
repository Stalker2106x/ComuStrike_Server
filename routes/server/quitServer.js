const Joi = require('joi')

const utils = require('../../utils')

// quit_server -> quitServer
module.exports = {
  schema: {
    query: Joi.object({
      serverId: Joi.number().optional()
    }),
    body: Joi.object({
      LENUM: Joi.number().required(),
      LEPASS: Joi.string().required(),
      LESCORE: Joi.number().required(),
      LAPARTIE: Joi.number().required(),
      KILLER: Joi.number().required(),
      KILLED: Joi.number().required(),
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
