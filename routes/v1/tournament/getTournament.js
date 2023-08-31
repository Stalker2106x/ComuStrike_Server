const Joi = require('joi')

// info_tournois -> getTournament
module.exports = {
  description: 'Gets tournament data',
  method: 'get',
  route: '/v1/tournament/:tournamentId',
  schema: {
    body: Joi.object({
      LENUM: Joi.number().integer().required().description('The ID of the player sending the request'),
      LEPASS: Joi.string().required().description('The password of the player sending the request'),
      LESOFT: Joi.number().integer().required().description('The software used for sending the request'),
      ROUND: Joi.number().integer().required(),
      CLE_TOURNOIS: Joi.number().integer().required()
    })
  },
  handler: (app, req, res, next) => {
    res.status(200).send({
      TEAM: 'jobar',
      DETAIL: 'test',
      EKIP: 1,
      JOUEUR: 0,
      PLAYER: 2,
      CAMP: 0
    })
    next()
  }
}
