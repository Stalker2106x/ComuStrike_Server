const Joi = require('joi')
const utils = require('../../utils')

// quit_server -> quitServer
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.number().required(),
      LESCORE: Joi.number().required(),
      LAPARTIE: Joi.number().required(),
      KILLER: Joi.number().required(),
      KILLED: Joi.number().required(),
      LAVERSION: Joi.string().required()
    })
  },
  handler: async (app, req, res, next) => {
    const player = await app.db.models.Players.findOne({ where: { player_id: parseInt(req.body.LENUM) } })
    if (!player) {
      res.status(500).send({ error: 'Invalid player ID' })
      next()
      return
    }
    const serverIdx = app.serverList.findIndex((serv) => serv.serverId === parseInt(req.body.LAPARTIE))
    if (serverIdx < 0) {
      res.status(500).send({ error: 'Invalid SERVERID' })
    } else {
      const server = app.serverList[serverIdx]
      server.connectedPeers.splice(server.connectedPeers.indexOf(parseInt(req.body.LENUM)), 1)
      utils.logger('game', `Player ${parseInt(req.body.LENUM)} left server [${server.serverId}] ${server.host}`)
      res.status(200).send()
    }
    next()
  }
}
