const Joi = require('joi')

const utils = require('../../utils')

// get_server -> getServerList
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.number().required(),
      LEPASS: Joi.string().required(),
      LESOFT: Joi.number().required(),
      CLE_TOURNOIS: Joi.number().required(),
      ROUND: Joi.number().required(),
      LAVERSION: Joi.string().required()
    })
  },
  handler: async (app, req, res, next) => {
    let player
    try {
      player = await utils.authorizePlayer(app, { id: req.body.LENUM, password: req.body.LEPASS })
    } catch (e) {
      res.status(500).send({ error: 'Invalid credentials' })
      return next()
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
