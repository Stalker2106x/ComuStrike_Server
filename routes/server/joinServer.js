const utils = require('../../utils')

// join_server -> joinServer
module.exports = {
    schema: {
    body: {
        type: 'object',
        required: ['LENUM', 'LEPASS', 'LESOFT', 'SERVERID'],
        properties: {
            LENUM: { type: 'number' },
            LEPASS: { type: 'string' },
            LESOFT: { type: 'number' },
            SERVERID: { type: 'number' }
        }
    }
  },
  handler: (app, req, res, next) => {
    const server = app.serverList[app.serverList.findIndex((serv) => serv.serverId === parseInt(req.body.SERVERID))]
    if (!server) {
      res.status(500).send({ error: 'Invalid SERVERID' })
    } else {
      server.connectedPeers.push(parseInt(req.body.LENUM))
      utils.logger('game', `Player ${parseInt(req.body.LENUM)} joined server [${server.serverId}] ${server.host}`)
      res.status(200).send({ return: parseInt(req.body.SERVERID) })
    }
    next()
  }
}