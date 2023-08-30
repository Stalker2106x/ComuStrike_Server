const Joi = require('joi')

const utils = require('../../utils')

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
    let player
    try {
      player = await utils.authorizePlayer(app, { id: req.body.LENUM, password: req.body.LEPASS })
    } catch (e) {
      res.status(500).send({ error: 'Invalid credentials' })
      return next()
    }
    player.update({
      kills: parseInt(req.body.KILLER),
      deaths: parseInt(req.body.KILLER)
    })
    res.status(200).send()
    next()
  }
}
