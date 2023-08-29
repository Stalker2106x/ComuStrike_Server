const Joi = require('joi')

// get_tournois -> getTournamentList
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.number().required(),
      LEPASS: Joi.string().required(),
      LESOFT: Joi.number().required()
    })
  },
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
