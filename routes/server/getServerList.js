// get_server -> getServerList
module.exports = {
    schema: {
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
    handler: (app, req, res, next) => {
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
    }
  }
  