const Joi = require('joi')

// info_tournois -> getTournament
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.number().required(),
      LEPASS: Joi.string().required(),
      LESOFT: Joi.number().required(),
      ROUND: Joi.number().required(),
      CLE_TOURNOIS: Joi.number().required()
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
