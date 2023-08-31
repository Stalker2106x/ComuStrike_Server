const Joi = require('joi')

// get_niveau_grade -> getRank
module.exports = {
  description: 'Get the rank of a player',
  method: 'get',
  route: '/v1/players/:playerId/rank',
  params: {
    body: Joi.object({
      J: Joi.string().required().description('The ID of the player to get the rank of'),
      LAVERSION: Joi.string().required().description('The version of the software used for sending the request')
    })
  },
  handler: (app, req, res, next) => {
    res.status(200).send({
        IDGRADE: 0,
        NOMGRADE: 'test',
        NIVEAU: 1,
        LVLARME: 1
    })
    next()
  }
}
