const Joi = require('joi')
const utils = require('../../utils')

// info_joueur -> getPlayer
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.number().required(),
      LAMAC: Joi.string().required(),
      LAVERSION: Joi.string().required()
    })
  },
  handler: async (app, req, res, next) => {
    const player = await app.db.models.Players.findOne({ where: { player_id: parseInt(req.body.LENUM) } })
    if (!player) {
      res.status(500).send({ error: 'Invalid player ID' })
      next()
      return
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
