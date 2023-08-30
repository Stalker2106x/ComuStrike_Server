const Joi = require('joi')

// get_tournois -> getTournamentList
module.exports = {
  description: 'Gets all active tournaments',
  method: 'get',
  route: '/v1/tournaments',
  schema: Joi.object({
    body: Joi.object({
      LENUM: Joi.number().integer().required().description('The ID of the player sending the request'),
      LEPASS: Joi.string().required().description('The password of the player sending the request'),
      LESOFT: Joi.number().integer().required().description('The software used for sending the request')
    })
  }),
  handler: (app, req, res, next) => {
    res.body = {
      tournois: {
        DESC: 'crazy tournoi',
        MAP: 'snip_beach',
        ROUND: 0,
        TIMEOUT: 0
      }
    }
    next()
  }
}
