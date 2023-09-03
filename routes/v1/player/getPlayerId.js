const Joi = require('joi')

const utils = require('../../../utils')

// get_id -> getPlayerId
module.exports = {
  description: 'Get player ID with a username',
  method: 'get',
  route: '/v1/playerId',
  params: {
    body: Joi.object({
      LELOGIN: Joi.string().min(2).optional().description('The username of the player to get ID for'),
      LEPASS: Joi.string().optional().description('The password of the player to get ID for'),
      LESOFT: Joi.number().integer().optional().description('The software used for sending the request'),
      LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
    })
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
      res.status(500).send({ error: 'Invalid credentials' })
      return
    }
    res.status(200).send({ ID_PLAYER: player.player_id })
    next()
  }
}
