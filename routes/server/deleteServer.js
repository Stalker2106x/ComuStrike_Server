const utils = require('../../utils')

// delete_server -> deleteServer
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['LENUM', 'CLE_SERVEUR', 'LAVERSION'],
      properties: {
        LENUM: { type: 'number' },
        CLE_SERVEUR: { type: 'number' },
        LAVERSION: { type: 'string' }
      }
    }
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
