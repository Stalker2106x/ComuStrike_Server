const Joi = require('joi')

// get_id -> getPlayerId
module.exports = {
  schema: {
    body: Joi.object({
      LELOGIN: Joi.string().required(), //leminLength: 3 },
      LESOFT: Joi.number().required(),
      LAVERSION: Joi.string().required() //minLength: 3 }
    })
  },
  handler: async (app, req, res, next) => {
    const player = await app.db.models.Players.findOne({ where: { username: req.body.LELOGIN } })
    res.status(200).send({ ID_PLAYER: player.player_id })
    next()
  }
}
