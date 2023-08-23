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
        ARMES: { type: 'number' },
        THIRD: { type: 'number' },
        GDMG: { type: 'number' },
        ANTILAG: { type: 'number' },
        LAVERSION: { type: 'string' }
      }
    }
  },
  createServer: (app, req, res, next) => {
    const serverId = app.serverList.size;
    app.serverList.set(serverId, {
      name: req.body.DESC,
      version: req.body.LAVERSION,
      host: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      owner: req.body.LENUM,
      level: req.body.LECOMMENT,
      description: req.body.DESC,
      slots: req.body.MAX_PLAYERS,
      tournamentId: req.body.CLE_TOURNOIS,
      private: req.body.PRIVEE === '0' ? true : false,
      weapons: req.body.ARMES,
      md5: req.body.MD5,
      connectedPeers: []
    })
    res.status(200).send({ return: serverId })
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
    res.status(200).send()
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
    let servers = []
    for (let [serverId, server] of app.serverList) {
      res.arrayKey = 'server'
      servers.push({
        NOM: server.name,
        VERSION: server.version,
        COMMENT: 'Unofficial server',
        MD5: server.md5,
        DESC: server.description,
        MAP: server.level,
        __IP: server.host,
        __SERVERID: serverId,
        __PLAYERID: server.owner
      })
    }
    res.status(200).send(servers)
    next()
  },
  getMP3Schema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'IDMP3'],
      properties: {
        LENUM: { type: 'string' },
        LEPASS: { type: 'string' },
        IDMP3: { type: 'number' }
      }
    }
  },
  getMP3: (app, req, res, next) => {
    res.status(200).send({
      element: {
        NAME: 'server',
        COMMENTAIRE: 'desc',
        HOST: 'localhost',
        ID: 0
      }
    })
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
    const server = app.serverList.get(parseInt(req.body.SERVERID))
    if (!server) {
      res.status(500).send({ error: 'Invalid SERVERID' })
    }
    server.connectedPeers.push(req.body.LENUM)
    res.status(200).send(0)
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
    const server = app.serverList.get(parseInt(req.body.LAPARTIE))
    server.connectedPeers.splice(server.connectedPeers.indexOf(parseInt(req.body.LENUM)), 1)
    res.status(200).send()
    next()
  },
  getMapListSchema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LESOFT', 'LEPASS'],
      properties: {
        LENUM: { type: 'number' },
        LESOFT: { type: 'number' },
        LEPASS: { type: 'string' }
      }
    }
  },
  getMapList: (app, req, res, next) => {
    res.arrayKey = 'element'
    res.status(200).send([
      { NAME: 'tunisia'},
      { NAME: 'dust2'},
      { NAME: 'RS' }
    ])
    next()
  }
}
