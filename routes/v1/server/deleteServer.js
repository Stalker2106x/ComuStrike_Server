const Joi = require('joi')

const utils = require('../../../utils')

// delete_server -> deleteServer
module.exports = {
  description: 'Deletes a server from the master server list',
  method: 'delete',
  route: '/v1/servers/:serverId',
  schema: Joi.object({
    query: Joi.object({
      serverId: Joi.number().integer().optional()
    }),
    body: Joi.object({
      LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
      LEPASS: Joi.string().required().description('The password of the player sending the request'),
      CLE_SERVEUR: Joi.number().integer().required().description('The ID of the server to delete'),
      LAVERSION: Joi.string().required().description('The version of the software used for sending the request')
    })
  }),
  handler: async (app, req, res, next) => {
    let player
    try {
      player = await utils.authorizePlayer(app, { id: req.body.LENUM, password: req.body.LEPASS })
    } catch (e) {
      res.status(500).send({ error: 'Invalid credentials' })
      return next()
    }
    const serverId = parseInt(req.query.serverId || req.body.CLE_SERVEUR)
    const serverIndex = app.serverList.findIndex((serv) => serv.serverId === serverId)
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
