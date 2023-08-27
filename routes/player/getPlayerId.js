const utils = require('../../utils')

// get_id -> getPlayerId
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['LELOGIN', 'LEPASS', 'LESOFT'],
      properties: {
        LELOGIN: { type: 'string', minLength: 3 },
        LEPASS: { type: 'string', minLength: 3 },
        LESOFT: { type: 'number' }
      }
    }
  },
  handler: async (app, req, res, next) => {
    let player
    try {
      player = utils.authorizePlayer(app, { username: parseInt(req.body.LELOGIN), password: req.body.LEPASS })
    } catch (e) {
      res.status(500).send({ error: 'Invalid credentials' })
      next()
      return
    }
    res.status(200).send({ ID_PLAYER: player.player_id })
    next()
  }
}
