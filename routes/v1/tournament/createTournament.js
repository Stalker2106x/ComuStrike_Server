const Joi = require('joi')

// set_tournois -> createTournament
module.exports = {
  description: 'Creates a tournament',
  method: 'post',
  route: '/v1/tournaments',
  schema: Joi.object({
    body: Joi.object({
      LENUM: Joi.number().integer().required().description('The ID of the player sending the request'),
      LEPASS: Joi.string().required().description('The password of the player sending the request'),
      CLE_TOURNOIS: Joi.number().integer().required(),
      ROUND: Joi.number().integer().required(),
      SCORE1: Joi.number().integer().required(),
      SCORE2: Joi.number().integer().required()
    })
  }),
  handler: (app, req, res, next) => {
    next()
  }
}
