const Joi = require('joi')

// get_mp3 -> getMP3
module.exports = {
  description: 'Get all MP3s available on server',
  method: 'get',
  route: '/v1/mp3s',
  params: {
    body: Joi.object({
      LENUM: Joi.string().required().description('The ID of the player sending the request'),
      LEPASS: Joi.string().optional().description('The password of the player sending the request'),
      LESOFT: Joi.number().integer().optional().description('The software used for sending the request'),
      LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
    })
  },
  responses: {
    200: Joi.array().items({
      ID: Joi.number().required().description('The ID of the mp3'),
      NAME: Joi.string().required().description('The name of the mp3'),
      COMMENTAIRE: Joi.string().required().description('A comment that will be printed to in-game chat when playing this mp3'),
      HOST: Joi.string().required().description('The host where the mp3 is available to download')
    })
  },
  handler: async (app, req, res, next) => {
    try {
      await utils.authorizePlayer(app, req)
    } catch (e) {
      res.status(500).send({ error: 'Invalid credentials' })
      return next()
    }
    const dbMp3s = await app.db.models.MP3.findAll()
    const mp3s = []
    for (const mp3 of dbMp3s) {
      mp3s.push({
        ID: mp3.mp3_id,
        NAME: mp3.name,
        COMMENTAIRE: mp3.description,
        HOST: global.forceLocalhost ? '127.0.0.1' : app.config.publicIP
      })
    }
    res.arrayKey = 'element'
    res.status(200).send(mp3s)
    next()
  }
}
