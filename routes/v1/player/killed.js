const Joi = require('joi')

const utils = require('../../../utils')

// se_faire_tuer -> killed
module.exports = {
  description: 'Sent when a kill occur in game',
  method: 'post',
  route: '/v1/players/:playerId/killed',
  params: {
    body: Joi.object({
      V: Joi.number().integer().required().description('The ID of the player that got killed'),
      P: Joi.string().required().description('The username of the player that did the kill'),
      T: Joi.number().integer().required().description('The ID of the player that did the kill'),
      PV: Joi.number().integer().required().description('Performance of the player that got killed'),
      PT: Joi.number().integer().required().description('Performance of the player that did the kill'),
      HS: Joi.number().integer().required().description('Equals to 1 if the kill was a headshot, else 0')
    })
  },
  handler: async (app, req, res, next) => {
    try {
      await utils.authorizePlayer(app, req)
    } catch (e) {
      res.status(401).send({ error: `Authorization error: ${e}` })
      return next()
    }
    await utils.updatePlayerScore(app, parseInt(req.body.V), { deaths: 1 })
    const killerData = { kills: 1 }
    if (parseInt(req.body.HS)) killerData.headshot = 1
    await utils.updatePlayerScore(app, parseInt(req.body.T), {
      kills: 1,
      ...(parseInt(req.body.HS) && { headshot: 1 })
    })
    res.status(200).send()
    next()
  }
}
