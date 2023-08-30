const Joi = require('joi')

const utils = require('../../utils')

// set_server -> createServer
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.number().required(),
      LEPASS: Joi.string().required(),
      LESOFT: Joi.number().required(),
      LECOMMENT: Joi.string().required(),
      MAX_PLAYERS: Joi.number().required(),
      CFT: Joi.number().required(),
      CLE_TOURNOIS: Joi.number().required(),
      ROUND: Joi.number().required(),
      MD5: Joi.number().required(),
      DESC: Joi.number().required(),
      PRIVEE: Joi.number().required(),
      ARMES: Joi.number().required(),
      THIRD: Joi.number().required(),
      GDMG: Joi.number().required(),
      ANTILAG: Joi.number().required(),
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
