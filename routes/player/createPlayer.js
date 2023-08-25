const { Op } = require('sequelize')
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
          LEVERSION: { type: 'string' },
          LEMAIL: { type: 'string' },
          LEPASS: { type: 'string' }
        }
      }
    },
    handler: async (app, req, res, next) => {
      if (req.body.LENOM.length < 3 || !/^[a-zA-Z0-9_]*$/.test(req.body.LENOM)) {
        res.status(500).send('Username must consist only of alphanumeric characters, and be at least 3 characters long')
        return
      }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.LEMAIL)) {
        res.status(500).send('Email must be valid')
        return
      }
      if (parseInt(req.body.LESOFT) !== 2) {
        res.status(500).send('LESOFT must be 2')
        return
      }
      const player = await app.db.models.Players.findOne({
        where: {
          [Op.or]: {
            username: req.body.LENOM,
            email: req.body.LEMAIL
          }
        }
      })
      if (player != null) {
        res.status(500).send('Username or email already exists')
        return
      } else {
        await app.db.models.Players.create({
          username: req.body.LENOM,
          email: req.body.LEMAIL,
          password: utils.passwordHash(req.body.LEPASS)
        })
        res.status(200).send('OK')
        next()
      }
    }
}