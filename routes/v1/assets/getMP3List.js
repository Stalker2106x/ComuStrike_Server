const Joi = require('joi')

// get_mp3 -> getMP3
module.exports = {
  description: 'Get all MP3s available on server',
  method: 'get',
  route: '/v1/mp3s',
  schema: Joi.object({
    body: Joi.object({
      LENUM: Joi.string().required().description('The ID of the player sending the request'),
      LEPASS: Joi.string().required().description('The password of the player sending the request'),
      IDMP3: Joi.number().integer().required().description('Unknown use')
    })
  }),
  handler: async (app, req, res, next) => {
    const dbMp3s = await app.db.models.MP3.findAll()
    const mp3s = []
    for (const mp3 of dbMp3s) {
      mp3s.push({
        NAME: mp3.name,
        COMMENTAIRE: mp3.description,
        HOST: global.forceLocalhost ? '127.0.0.1' : app.config.publicIP,
        ID: mp3.mp3_id
      })
    }
    res.arrayKey = 'element'
    res.status(200).send(mp3s)
    next()
  }
}
