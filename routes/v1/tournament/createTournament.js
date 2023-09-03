const Joi = require('joi')

// set_tournois -> createTournament
module.exports = {
  description: 'Creates a tournament',
  method: 'post',
  route: '/v1/tournaments',
  params: {
    body: Joi.object({
      LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
      LEPASS: Joi.string().optional().description('The password of the player sending the request'),
      CLE_TOURNOIS: Joi.number().integer().required(),
      ROUND: Joi.number().integer().required(),
      SCORE1: Joi.number().integer().required(),
      SCORE2: Joi.number().integer().required()
    })
  },
  responses: {
    200: null
  },
  handler: (app, req, res, next) => {
    res.status(200).send()
    next()
  }
}
