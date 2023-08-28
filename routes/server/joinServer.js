const utils = require('../../utils')

// join_server -> joinServer
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LESOFT', 'SERVERID', 'LAVERSION'],
      properties: {
        LENUM: { type: 'number' },
        LESOFT: { type: 'number' },
        SERVERID: { type: 'number' },
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
    const server = app.serverList[app.serverList.findIndex((serv) => serv.serverId === parseInt(req.body.SERVERID))]
    if (!server) {
      res.status(500).send({ error: 'Invalid SERVERID' })
    } else {
      if (server.connectedPeers.indexOf(player.player_id) != -1) {
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
}
