// get_mp3 -> getMP3
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'IDMP3'],
      properties: {
        LENUM: { type: 'string' },
        LEPASS: { type: 'string' },
        IDMP3: { type: 'number' }
      }
    }
  },
  handler: async (app, req, res, next) => {
    const mp3s = await app.db.models.MP3.findAll()
    res.status(200).send({
      element: {
        NAME: mp3s[0].name,
        COMMENTAIRE: mp3s[0].description,
        HOST: global.forceLocalhost ? '127.0.0.1' : app.config.publicIP,
        ID: mp3s[0].mp3_id
      }
    })
    next()
  }
}
