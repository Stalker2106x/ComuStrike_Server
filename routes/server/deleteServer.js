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
        CLE_SERVEUR: { type: 'number' },
      }
    }
  },
  handler: (app, req, res, next) => {
    const server = app.serverList[app.serverList.findIndex((serv) => serv.owner === parseInt(req.body.LENUM))]
    if (!server) {
      res.status(500).send({ error: 'Invalid SERVERID' })
    } else {
      app.serverList.delete(parseInt(req.body.LENUM))
      utils.logger('game', `Server ${server.name} created by ${server.owner} terminated`)
      res.status(200).send()
    }
    next()
  }
}