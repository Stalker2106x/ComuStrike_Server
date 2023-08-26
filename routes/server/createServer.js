const utils = require('../../utils')

// set_server -> createServer
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LESOFT', 'LECOMMENT', 'MAX_PLAYERS', 'CFT', 'CLE_TOURNOIS', 'ROUND', 'MD5', 'DESC', 'PRIVEE', 'ARMES'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        LESOFT: { type: 'number' },
        LECOMMENT: { type: 'string' },
        MAX_PLAYERS: { type: 'number' },
        CFT: { type: 'number' },
        CLE_TOURNOIS: { type: 'number' },
        ROUND: { type: 'number' },
        MD5: { type: 'number' },
        DESC: { type: 'number' },
        PRIVEE: { type: 'number' },
        ARMES: { type: 'number' },
        THIRD: { type: 'number' },
        GDMG: { type: 'number' },
        ANTILAG: { type: 'number' },
        LAVERSION: { type: 'string' }
      }
    }
  },
  handler: (app, req, res, next) => {
    const serverId = app.serverList.length
    const server = {
      serverId,
      name: req.body.DESC,
      version: req.body.LAVERSION,
      host: (req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || '0.0.0.0').split(',')[0].trim(),
      owner: parseInt(req.body.LENUM),
      level: req.body.LECOMMENT,
      description: req.body.DESC,
      slots: parseInt(req.body.MAX_PLAYERS),
      tournamentId: parseInt(req.body.CLE_TOURNOIS),
      private: parseInt(req.body.PRIVEE) === 1,
      weapons: req.body.ARMES,
      md5: req.body.MD5,
      connectedPeers: []
    }
    app.serverList.push(server)
    utils.logger('game', `Server ${server.name} created by ${server.owner} on ${server.host}`)
    res.status(200).send({ return: serverId })
    next()
  }
}
