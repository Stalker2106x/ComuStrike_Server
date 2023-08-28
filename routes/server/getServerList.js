const utils = require('../../utils')

// get_server -> getServerList
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LESOFT', 'CLE_TOURNOIS', 'ROUND'],
      properties: {
        LENUM: { type: 'number' },
        LESOFT: { type: 'number' },
        CLE_TOURNOIS: { type: 'number' },
        ROUND: { type: 'number' },
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
    const servers = []
    for (const server of app.serverList) {
      servers.push({
        NOM: server.name,
        VERSION: server.version,
        COMMENT: `Comustrike v${app.config.serverVersion} server`,
        MD5: server.md5,
        DESC: server.description,
        MAP: server.level,
        __IP: server.host,
        __SERVERID: server.serverId,
        __PLAYERID: server.owner
      })
    }
    res.arrayKey = 'server'
    res.status(200).send(servers)
    next()
  }
}
