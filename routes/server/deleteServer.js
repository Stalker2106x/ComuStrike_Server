const Joi = require('joi')
const utils = require('../../utils')

// delete_server -> deleteServer
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.number().required(),
      CLE_SERVEUR: Joi.number().required(),
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
    const serverIndex = app.serverList.findIndex((serv) => serv.serverId === parseInt(req.body.CLE_SERVEUR))
    const server = app.serverList[serverIndex]
    if (!server) {
      res.status(500).send({ error: 'Invalid SERVERID' })
    } else {
      app.serverList.splice(serverIndex, 1)
      utils.logger('game', `Deleted server ${server.name} owned by ${server.owner}`)
      res.status(200).send()
    }
    next()
  }
}
