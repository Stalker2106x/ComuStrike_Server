const Joi = require('joi')

// set_mp3 -> setMP3
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.string().required(),
      IDMP3: Joi.number().required(),
      LAVERSION: Joi.string().required()
    })
  },
  handler: async (app, req, res, next) => {
    await app.db.models.Players.update({
      mp3: parseInt(req.body.IDMP3)
    }, {
      where: {
        player_id: parseInt(req.body.LENUM)
      }
    })
    res.status(200).send()
    next()
  }
}
