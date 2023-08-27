const utils = require('../../utils')

// info_joueur -> getPlayer
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LAMAC'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        LAMAC: { type: 'string' }
      }
    }
  },
  handler: async (app, req, res, next) => {
    let player
    try {
      player = utils.authorizePlayer(app, { id: parseInt(req.body.LENUM), password: req.body.LEPASS })
    } catch (e) {
      res.status(500).send({ error: 'Invalid credentials' })
      next()
      return
    }
    const mp3 = await app.db.models.MP3.findOne({
      where: { mp3_id: player.mp3 }
    })
    utils.logger('game', `Player [${player.player_id}] ${player.username} logged in`)
    res.status(200).send({
      NAME: player.username,
      ERROR: 0,
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
      CONTROLE: 'checksum'
    })
    next()
  }
}
