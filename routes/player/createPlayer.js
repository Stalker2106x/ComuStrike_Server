const utils = require('../../utils')

// nouveaujoueur -> createPlayer
module.exports = {
    schema: {
      body: {
        type: 'object',
        required: ['LENUM', 'LESOFT', 'LENOM', 'LEVERSION', 'LEMAIL', 'LEPASS'],
        properties: {
          LENUM: { type: 'number' },
          LESOFT: { type: 'number' },
          LENOM: { type: 'string' },
          LEVERSION: { type: 'number' },
          LEMAIL: { type: 'string' },
          LEPASS: { type: 'string' }
        }
      }
    },
    handler: async (app, req, res, next) => {
      const player = await app.db.models.Players.findOne({
        where: {
          username: req.body.LENOM
        }
      })
      if (player != null) {
        res.status(500).send('Forbidden')
      } else {
        await app.db.models.Players.create({
          username: req.body.LENOM,
          email: req.body.LEMAIL,
          password: utils.passwordHash(req.body.LEPASS)
        })
        res.status(200).send('OK')
      }
      next()
    }
}