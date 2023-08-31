const Joi = require('joi')
const { Op } = require('sequelize')

const utils = require('../../../utils')

// nouveaujoueur -> createPlayer
module.exports = {
  description: 'Create a new player on server',
  method: 'post',
  route: '/v1/players',
  schema: {
    body: Joi.object({
      LENUM: Joi.number().integer().required().description('The ID of the player sending the request'),
      LESOFT: Joi.number().integer().required().description('The software used for sending the request'),
      LENOM: Joi.string().required().description('The username to use for creation'),
      LAVERSION: Joi.string().required().description('The version of the software used for sending the request'),
      LEMAIL: Joi.string().required().description('The email to use for creation'),
      LEPASS: Joi.string().required().description('The password to use for creation')
    })
  },
  handler: async (app, req, res, next) => {
    if ((req.body.LENOM.length < 2 && req.body.LENOM.length > 15) || !/^[a-zA-Z0-9._^$]*$/.test(req.body.LENOM)) {
      res.status(500).send('Username must consist only of alphanumeric characters, and be between 2 and 15 characters long')
      return
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.LEMAIL)) {
      res.status(500).send('Email must be valid')
      return
    }
    if (parseInt(req.body.LESOFT) !== 2) {
      res.status(500).send('LESOFT must be 2')
      return
    }
    if (req.body.LEPASS.length < 2 || req.body.LEPASS.length > 10) {
      res.status(500).send('Password length should be between 2 and 10')
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
    } else {
      await app.db.models.Players.create({
        username: req.body.LENOM,
        email: req.body.LEMAIL,
        password: utils.passwordHash(req.body.LEPASS, app.config.cypherKey)
      })
      res.status(200).send('OK')
      next()
    }
  }
}
