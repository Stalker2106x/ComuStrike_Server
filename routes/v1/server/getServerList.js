const Joi = require('joi')

const utils = require('../../../utils')

// get_server -> getServerList
module.exports = {
  description: 'Get all servers from the master server list',
  method: 'get',
  route: '/v1/servers',
  params: {
    body: Joi.object({
      CLE_TOURNOIS: Joi.number().integer().default(0).optional().description('Unknown use'),
      ROUND: Joi.number().integer().default(0).optional().description('Unknown use')
    })
  },
  responses: {
    200: Joi.array().items({
      NOM: Joi.string().required().description('Name of the server'),
      VERSION: Joi.string().required().description('Version of the game'),
      COMMENT: Joi.string().required().description('Unknown use'),
      MD5: Joi.string().required().description('MD5 checksum of the server provided by client'),
      DESC: Joi.string().required().description('Unknown use'),
      MAP: Joi.string().required().description('Map running on the server'),
      __IP: Joi.string().required().description('IP address of the server host'),
      __SERVERID: Joi.string().required().description('ID of the server'),
      __PLAYERID: Joi.string().required().description('ID of the owner of the server')
    }),
    500: Joi.object({
      error: Joi.string().required().description('A short description of the error that occured')
    })
  },
  handler: async (app, req, res, next) => {
    try {
      await utils.authorizePlayer(app, req)
    } catch (e) {
      res.status(500).send({ error: `Authorization error: ${e}` })
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
