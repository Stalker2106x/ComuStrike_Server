const Joi = require('joi')

const utils = require('../../../utils')

// delete_server -> deleteServer
module.exports = {
  description: 'Deletes a server from the master server list',
  method: 'delete',
  route: '/v1/servers/:serverId',
  params: {
    query: Joi.object({
      serverId: Joi.number().integer().required()
    }),
    body: Joi.object({
      CLE_SERVEUR: Joi.number().integer().required().description('The ID of the server to delete')
    })
  },
  responses: {
    200: null,
    500: Joi.object({
      error: Joi.string().required().description('A short description of the error that occured')
    })
  },
  handler: async (app, req, res, next) => {
    try {
      await utils.authorizePlayer(app, req)
    } catch (e) {
      res.status(401).send({ error: `Authorization error: ${e}` })
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
