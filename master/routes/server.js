module.exports = {
  createServerSchema: {
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
        ARMES: { type: 'number' }
      }
    }
  },
  createServer: (app, req, res, next) => {
    app.serverList.set(app.serverList.length, {
      name: req.body.DESC,
      comment: req.body.LECOMMENT,
      slots: req.body.MAX_PLAYERS,
      tournamentId: req.body.CLE_TOURNOIS,
      private: req.body.PRIVEE === '0' ? true : false,
      weapons: req.body.ARMES,
      connectedPeers: []
    })
    next()
  },
  deleteServerSchema: {
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
  deleteServer: (app, req, res, next) => {
    app.serverList.delete(req.body.serverId)
    res.body = null
    next()
  },
  getServerSchema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LESOFT', 'CLE_TOURNOIS', 'ROUND'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        LESOFT: { type: 'number' },
        CLE_TOURNOIS: { type: 'number' },
        ROUND: { type: 'number' }
      }
    }
  },
  getServer: (app, req, res, next) => {
    app.serverList.get(req.body.serverId)
    res.body = {
      server: {
        value: {
          NOM: 'toto',
          VERSION: '157',
          COMMENT: 'unofficial server',
          MD5: 'checksum',
          DESC: 'unofficial server',
          MAP: 'snip_beach'
        },
        IP: '127.0.0.1',
        SERVERID: 0,
        PLAYERID: 0
      }
    }
    next()
  },
  joinServerSchema: {
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
  joinServer: (app, req, res, next) => {
    const server = app.serverList.get(req.body.serverId)
    server.connectedPeers.push(req.body.peerId)
    res.body = 0
    next()
  },
  quitServerSchema: {
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
  quitServer: (app, req, res, next) => {
    const server = app.serverList.get(req.body.serverId)
    server.connectedPeers.remove(req.body.peerId)
    res.body = null
    next()
  }
}
