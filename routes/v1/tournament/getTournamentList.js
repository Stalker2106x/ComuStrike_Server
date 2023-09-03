const Joi = require('joi')

// get_tournois -> getTournamentList
module.exports = {
  description: 'Gets all active tournaments',
  method: 'get',
  route: '/v1/tournaments',
  params: {
    body: Joi.object({
      LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
      LEPASS: Joi.string().optional().description('The password of the player sending the request'),
      LESOFT: Joi.number().integer().optional().description('The software used for sending the request')
    })
  },
  responses: {
    200: null
  },
  handler: (app, req, res, next) => {
    res.status(200).send({
      tournois: {
        DESC: 'crazy tournoi',
        MAP: 'snip_beach',
        ROUND: 0,
        TIMEOUT: 0
      }
    })
    next()
  }
}
