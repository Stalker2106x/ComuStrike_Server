const Joi = require('joi')

// add_score -> addScore
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.string().required(),
      LEPASS: Joi.string().required(),
      LESCORE: Joi.number().required(),
      LAPARTIE: Joi.number().required(),
      KILLER: Joi.number().required(),
      KILLED: Joi.number().required()
    })
  },
  handler: async (app, req, res, next) => {
    const player = await app.db.models.Players.findOne({ where: { player_id: parseInt(req.body.LENUM) } })
    if (!player) {
      res.status(500).send({ error: 'Invalid player ID' })
      next()
      return
    }
    player.update({
      kills: parseInt(req.body.KILLER),
      deaths: parseInt(req.body.KILLER)
    })
    res.status(200).send()
    next()
  }
}
