const Joi = require('joi')

const utils = require('../../../utils')

// set_server -> createServer
module.exports = {
  description: 'Adds a server to the master server list',
  method: 'post',
  route: '/v1/servers',
  params: {
    body: Joi.object({
      LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
      LEPASS: Joi.string().optional().description('The password of the player sending the request'),
      LESOFT: Joi.number().integer().optional().description('The software used for sending the request'),
      LECOMMENT: Joi.string().required(),
      MAX_PLAYERS: Joi.number().integer().required(),
      CFT: Joi.number().integer().required(),
      CLE_TOURNOIS: Joi.number().integer().required(),
      ROUND: Joi.number().integer().required(),
      MD5: Joi.string().required(),
      DESC: Joi.string().allow('').required(),
      PRIVEE: Joi.number().integer().required(),
      ARMES: Joi.string().required(),
      THIRD: Joi.number().integer().required(),
      GDMG: Joi.number().integer().required(),
      ANTILAG: Joi.number().integer().required(),
      LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
    })
  },
  responses: {
    200: Joi.number().integer().required().description('ID of the created server'),
    500: Joi.object({
      error: Joi.string().required().description('A short description of the error that occured')
    })
  },
  handler: async (app, req, res, next) => {
    let player
    try {
      player = await utils.authorizePlayer(app, req)
    } catch (e) {
      res.status(500).send({ error: 'Invalid credentials' })
      return next()
    }
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
    res.status(200).send({ return: server.serverId })
    next()
  }
}
