const Joi = require('joi')

// set_tournois -> createTournament
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.number().required(),
      LEPASS: Joi.string().required(),
      CLE_TOURNOIS: Joi.number().required(),
      ROUND: Joi.number().required(),
      SCORE1: Joi.number().required(),
      SCORE2: Joi.number().required()
    })
  },
  handler: (app, req, res, next) => {
    next()
  }
}
