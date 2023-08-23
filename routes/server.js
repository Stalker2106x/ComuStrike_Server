const path = require('path')

const utils = require('../utils')

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
    const server = {
      serverId,
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
    }
    app.serverList.set(serverId, server)
    utils.logger(`Server ${server.name} created by ${server.owner} on ${server.host}`)
    res.status(200).send({ return: serverId })
    next()
  },
  getServerListSchema: {
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
  getServerList: (app, req, res, next) => {
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
    } else {
      server.connectedPeers.push(parseInt(req.body.LENUM))
      utils.logger(`Player ${parseInt(req.body.LENUM)} joined server [${server.serverId}] ${server.host}`)
      res.status(200).send({ return: parseInt(req.body.SERVERID) })
    }
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
    utils.logger(`Player ${parseInt(req.body.LENUM)} left server [${server.serverId}] ${server.host}`)
    res.status(200).send()
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
    const server = null
    for (const [serverId, srv] of app.serverList) {
      if (srv.owner === parseInt(req.body.LENUM)) {
        server = srv
        break;
      }
    }
    if (!server) {
      res.status(500).send({ error: 'Invalid SERVERID' })
    } else {
      app.serverList.delete(parseInt(req.body.LENUM))
      utils.logger(`Server ${server.name} created by ${server.owner} terminated`)
      res.status(200).send()
    }
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
  getMapList: async (app, req, res, next) => {
    const dbMaps = await app.db.models.Maps.findAll()
    let maps = []
    for (const map of dbMaps) {
      maps.push({
        NAME: map.name,
        MAPPEUR: map.author,
        WADMD5: utils.fileMD5(path.join(__dirname, '../maps/', `${map.name}.wad`)),
        BSPMD5: utils.fileMD5(path.join(__dirname, '../maps/', `${map.name}.bsp`)),
        HOST: 'localhost',
      })
    }
    res.arrayKey = 'element'
    res.status(200).send(maps)
    next()
  }
}
