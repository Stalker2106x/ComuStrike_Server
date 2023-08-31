const Joi = require('joi')

// se_faire_tuer -> killed
module.exports = {
  description: 'Sent when a kill occur in game',
  method: 'post',
  route: '/v1/players/:playerId/killed',
  schema: {
    body: Joi.object({
      V: Joi.number().integer().required().description('The ID of the player that got killed'),
      P: Joi.string().required().description('The username of the player that got killed'),
      T: Joi.number().integer().required().description('The ID of the player that did the kill'),
      PV: Joi.number().integer().required().description('Unknown use'),
      PT: Joi.number().integer().required().description('Unknown use'),
      HS: Joi.number().integer().required().description('Equals to 1 if the kill was a headshot, else 0')
    })
  },
  handler: (app, req, res, next) => {
    res.status(200).send({
        IDGRADE: 0,
        NOMGRADE: 'test',
        NIVEAU: 1
    })
    next()
  }
}
