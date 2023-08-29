const Joi = require('joi')

// get_mp3 -> getMP3
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.string().required(),
      LEPASS: Joi.string().required(),
      IDMP3: Joi.number().required()
    })
  },
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
