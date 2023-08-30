const Joi = require('joi')

const utils = require('../../utils')

// get_id -> getPlayerId
module.exports = {
  schema: {
    query: Joi.object({
      username: Joi.string().optional()
    }),
    body: Joi.object({
      LELOGIN: Joi.string().optional(), //leminLength: 3 },
      LEPASS: Joi.string().required(),
      LESOFT: Joi.number().required(),
      LAVERSION: Joi.string().required() //minLength: 3 }
    })
  },
  handler: async (app, req, res, next) => {
    let player
    try {
      player = await utils.authorizePlayer(app, { username: req.query.username || req.body.LELOGIN, password: req.body.LEPASS })
    } catch (e) {
      res.status(500).send({ error: 'Invalid credentials' })
      return
    }
    res.status(200).send({ ID_PLAYER: player.player_id })
    next()
  }
}
