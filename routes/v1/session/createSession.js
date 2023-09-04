const Joi = require('joi')

const utils = require('../../../utils')

module.exports = {
  description: 'Generate JWT for use by client',
  method: 'post',
  route: '/v1/session',
  params: {
    body: Joi.object({
      username: Joi.string().min(2).required().description('The username of the player to authenticate'),
      password: Joi.string().min(2).required().description('The password of the player to authenticate')
    })
  },
  responses: {
    200: Joi.object({
      token: Joi.string().required().description('The generated jwt token')
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
    const secret = {
      id: player.player_id,
      username: player.username
    }
    const generatedToken = {
      expires: Math.round(Date.now() / 1000) + app.config.sessionDuration,
      token: utils.sha256(JSON.stringify(secret) + app.cypherKey),
      secret
    }
    app.sessions.push(JSON.parse(JSON.stringify(generatedToken)))
    delete generatedToken.secret // Strip secret from token
    res.status(200).send(generatedToken)
    next()
  }
}
