const utils = require('../../utils')

// delete_server -> deleteServer
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LESOFT', 'CLE_TOURNOIS', 'ROUND'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        CLE_SERVEUR: { type: 'number' }
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
    const serverIndex = app.serverList.findIndex((serv) => serv.owner === parseInt(req.body.LENUM))
    const server = app.serverList[serverIndex]
    if (!server) {
      res.status(500).send({ error: 'Invalid SERVERID' })
    } else {
      app.serverList.splice(serverIndex, 1)
      utils.logger('game', `Deleted server ${server.name} created by ${server.owner}`)
      res.status(200).send()
    }
    next()
  }
}
