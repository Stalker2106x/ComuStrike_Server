const Joi = require('joi')

const utils = require('../../../utils')

// get_id -> getPlayerId
module.exports = {
  description: 'Get player ID with a username',
  method: 'get',
  route: '/v1/playerId',
  params: {
    body: null
  },
  responses: {
    200: Joi.object({
      ID_PLAYER: Joi.string().required().description('ID of the player'),
    }),
    500: Joi.object({
      error: Joi.string().required().description('A short description of the error that occured')
    })
  },
  handler: async (app, req, res, next) => {
    let player
    try {
      player = await utils.authorizePlayer(app, req)
    } catch (e) {
      res.status(500).send({ error: `Authorization error: ${e}` })
      return
    }
    res.status(200).send({ ID_PLAYER: player.player_id })
    next()
  }
}
