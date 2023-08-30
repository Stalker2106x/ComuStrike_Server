const Joi = require('joi')

const utils = require('../../utils')

// delete_server -> deleteServer
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.number().required(),
      LEPASS: Joi.string().required(),
      CLE_SERVEUR: Joi.number().required(),
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
    const serverIndex = app.serverList.findIndex((serv) => serv.serverId === parseInt(req.body.CLE_SERVEUR))
    const server = app.serverList[serverIndex]
    if (!server) {
      res.status(500).send({ error: 'Invalid SERVERID' })
      return next()
    }
    app.serverList.splice(serverIndex, 1)
    utils.logger('game', `Deleted server ${server.name} owned by ${server.owner}`)
    res.status(200).send()
    next()
  }
}
