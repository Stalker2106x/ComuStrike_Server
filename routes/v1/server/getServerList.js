const Joi = require('joi')

const utils = require('../../../utils')

// get_server -> getServerList
module.exports = {
  method: 'get',
  route: '/v1/servers',
  schema: Joi.object({
    body: Joi.object({
      LENUM: Joi.number().integer().required().description('The ID of the player sending the request'),
      LEPASS: Joi.string().required().description('The password of the player sending the request'),
      LESOFT: Joi.number().integer().required().description('The software used for sending the request'),
      CLE_TOURNOIS: Joi.number().integer().required().description('Unknown use'),
      ROUND: Joi.number().integer().required().description('Unknown use'),
      LAVERSION: Joi.string().required().description('The version of the software used for sending the request')
    })
  }),
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
