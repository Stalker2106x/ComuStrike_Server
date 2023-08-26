// set_mp3 -> setMP3
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['LENUM', 'IDMP3', 'LAVERSION'],
      properties: {
        LENUM: { type: 'string' },
        IDMP3: { type: 'number' },
        LAVERSION: { type: 'string' }
      }
    }
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
