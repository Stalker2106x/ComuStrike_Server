const Joi = require('joi')

// set_mp3 -> setMP3
module.exports = {
  description: 'Set mp3 to be played when client logs in',
  method: 'post',
  route: '/v1/players/:playerId/mp3',
  params: {
    query: Joi.object({
      playerId: Joi.number().integer().optional()
    }),
    body: Joi.object({
      IDMP3: Joi.number().integer().required().description('The ID of the mp3 to set to the player')
    })
  },
  responses: {
    200: null
  },
  handler: async (app, req, res, next) => {
    await app.db.models.Players.update({
      mp3: parseInt(req.body.IDMP3)
    }, {
      where: {
        player_id: parseInt(req.body.LENUM)
      }
    })
    res.status(200).send()
    next()
  }
}
