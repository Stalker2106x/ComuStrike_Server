const Joi = require('joi')

const utils = require('../../../utils')

// info_joueur -> getPlayer
module.exports = {
  description: 'Get all player infos',
  method: 'get',
  route: '/v1/players/:playerId',
  params: {
    query: Joi.object({
      playerId: Joi.string().required().description('The ID of the player sending the request')
    })
  },
  responses: {
    200: Joi.object({
      NAME: Joi.string().required().description('Username of the player'),
      KEY: Joi.string().required().description('Unknown use'),
      MP3: Joi.string().required().description('MP3 to play when the user connects to the game'),
      MP3__ID: Joi.string().required().description('Unknown use'),
      MODEL: Joi.string().required().description('Model to use when the user connects to the game'),
      IS_OP: Joi.string().required().description('Tells if the player is an administrator (1) or not (0).'),
      VALIDE: Joi.string().required().description('Tells if the user account is active, and allowed to play'),
      MSG1: Joi.string().required().description('Unknown use'),
      MSG2: Joi.string().required().description('Unknown use'),
      MSG3: Joi.string().required().description('Unknown use'),
      MSG4: Joi.string().required().description('Unknown use'),
      SCORE: Joi.string().required().description('Total score of the user'),
      SCROLL: Joi.string().required().description('Text that will be written on the bottom scroll text of the game'),
      STATS: Joi.string().required().description('Text that will be written on left of the play home screen'),
      PANEL: Joi.string().required().description('Text that will be written on top of the game panel'),
      ROMUCHAT: Joi.string().required().description('Hostname to use to connect chat client'),
      ID_PLAYER: Joi.string().required().description('ID of the player'),
      CONTROLE: Joi.string().required().description('MD5 checksum of the player')
    }),
    401: Joi.object({
      error: Joi.string().required().description('A short description of the error that occured')
    })
  },
  handler: async (app, req, res, next) => {
    let player
    try {
      player = await utils.authorizePlayer(app, req)
    } catch (e) {
      res.status(401).send({ error: `Authorization error: ${e}` })
      return next()
    }
    const mp3 = await app.db.models.MP3.findOne({
      where: { id: player.mp3_id }
    })
    const scoreData = await utils.getPlayerScore(app, player.id)
    utils.logger('game', `Player [${player.id}] ${player.username} logged in`)
    res.status(200).send({
      NAME: player.username,
      KEY: '???',
      MP3: mp3.name,
      MP3__ID: mp3.id,
      MODEL: player.model,
      IS_OP: player.role,
      VALIDE: player.active,
      MSG1: 'testmsg1',
      MSG2: 'testmsg2',
      MSG3: 'testmsg3',
      MSG4: 'testmsg4',
      SCORE: scoreData.kills,
      SCROLL: 'ComuStrike Unofficial Server - Enjoy RomuStrike in 2023... and more!',
      STATS: `Score: ${scoreData.kills}`,
      PANEL: `ComuStrike Unofficial Server v${app.config.serverVersion}`,
      ROMUCHAT: global.forceLocalhost ? '127.0.0.1' : app.config.publicIP,
      ID_PLAYER: player.id,
      CONTROLE: 'f7aaabf477ffbe41212e388962d7dff6'
    })
    next()
  }
}
