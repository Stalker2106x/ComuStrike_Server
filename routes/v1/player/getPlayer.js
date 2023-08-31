const Joi = require('joi')

const utils = require('../../../utils')

// info_joueur -> getPlayer
module.exports = {
  description: 'Get all player infos',
  method: 'get',
  route: '/v1/players/:playerId',
  schema: {
    query: Joi.object({
      playerId: Joi.string().optional()
    }),
    body: Joi.object({
      LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
      LEPASS: Joi.string().required().description('The password of the player sending the request'),
      LAMAC: Joi.string().required().description('MAC address of the client sending the request'),
      LAVERSION: Joi.string().required().description('The version of the software used for sending the request')
    })
  },
  handler: async (app, req, res, next) => {
    let player
    try {
      player = await utils.authorizePlayer(app, { id: req.query.playerId || req.body.LENUM, password: req.body.LEPASS })
    } catch (e) {
      res.status(500).send({ error: 'Invalid credentials' })
      return next()
    }
    const mp3 = await app.db.models.MP3.findOne({
      where: { mp3_id: player.mp3 }
    })
    utils.logger('game', `Player [${player.player_id}] ${player.username} logged in`)
    res.status(200).send({
      NAME: player.username,
      KEY: '???',
      MP3: mp3.name,
      MP3__ID: player.mp3,
      MODEL: player.model,
      IS_OP: player.role,
      VALIDE: player.active,
      MSG1: 'testmsg1',
      MSG2: 'testmsg2',
      MSG3: 'testmsg3',
      MSG4: 'testmsg4',
      SCORE: player.score,
      SCROLL: 'ComuStrike Unofficial Server - Enjoy RomuStrike in 2023... and more!',
      STATS: `Score: ${player.score}`,
      PANEL: `ComuStrike Unofficial Server v${app.config.serverVersion}`,
      ROMUCHAT: global.forceLocalhost ? '127.0.0.1' : app.config.publicIP,
      ID_PLAYER: player.player_id,
      CONTROLE: 'f7aaabf477ffbe41212e388962d7dff6'
    })
    next()
  }
}
