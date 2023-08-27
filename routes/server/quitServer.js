const utils = require('../../utils')

// quit_server -> quitServer
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LESCORE', 'LAPARTIE', 'KILLER', 'KILLED'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        LESCORE: { type: 'number' },
        LAPARTIE: { type: 'number' },
        KILLER: { type: 'number' },
        KILLED: { type: 'number' }
      }
    }
  },
  handler: (app, req, res, next) => {
    try {
      utils.authorizePlayer(app, { id: parseInt(req.body.LENUM), password: req.body.LEPASS })
    } catch (e) {
      res.status(500).send({ error: 'Invalid credentials' })
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
