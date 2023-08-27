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
  handler: (app, req, res, next) => {
    let player
    try {
      player = utils.authorizePlayer(app, { id: parseInt(req.body.LENUM), password: req.body.LEPASS })
    } catch (e) {
      res.status(500).send({ error: 'Invalid credentials' })
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
