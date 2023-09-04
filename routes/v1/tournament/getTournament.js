const Joi = require('joi')

// info_tournois -> getTournament
module.exports = {
  description: 'Gets tournament data',
  method: 'get',
  route: '/v1/tournament/:tournamentId',
  params: {
    body: Joi.object({
      ROUND: Joi.number().integer().required(),
      CLE_TOURNOIS: Joi.number().integer().required()
    })
  },
  responses: {
    200: Joi.object({
      TEAM: Joi.string().required(),
      DETAIL: Joi.string().required(),
      EKIP: Joi.number().integer().required(),
      JOUEUR: Joi.number().integer().required(),
      PLAYER: Joi.number().integer().required(),
      CAMP: Joi.number().integer().required()
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
