const utils = require('../../utils')

// add_score -> addScore
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LESCORE', 'LAPARTIE', 'KILLER', 'KILLED'],
      properties: {
        LENUM: { type: 'string' },
        LEPASS: { type: 'string' },
        LESCORE: { type: 'number' },
        LAPARTIE: { type: 'number' },
        KILLER: { type: 'number' },
        KILLED: { type: 'number' }
      }
    }
  },
  handler: async (app, req, res, next) => {
    const player = await app.db.models.Players.findOne({ where: { player_id: parseInt(req.body.LENUM) } })
    if (!player) {
      res.status(500).send({ error: 'Invalid player ID' })
      next()
      return
    }
    player.update({
      kills: parseInt(req.body.KILLER),
      deaths: parseInt(req.body.KILLER)
    })
    res.status(200).send()
    next()
  }
}
