const utils = require('../utils')

module.exports = {
  createPlayerSchema: {
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
  createPlayer: async (app, req, res, next) => {
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
  },
  getPlayerSchema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LAMAC'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        LAMAC: { type: 'string' }
      }
    }
  },
  getPlayer: async (app, req, res, next) => {
    const player = await app.db.models.Players.findOne({
      where: {
        player_id: req.body.LENUM,
        password: utils.passwordHash(req.body.LEPASS)
      }
    })
    if (player == null) {
      res.status(500).send({ error: 'Invalid credentials' })
    } else {
      utils.logger(`Player [${player.player_id}] ${player.username} logged in`)
      res.status(200).send({
        NAME: player.username,
        ERROR: 0,
        MP3: "lofijazz",
        MP3__ID: 3,
        MODEL: player.model,
        IS_OP: player.role,
        VALIDE: player.active,
        MSG1: 'testmsg1',
        MSG2: 'testmsg2',
        MSG3: 'testmsg3',
        MSG4: 'testmsg4',
        SCORE: player.score,
        SCROLL: 'comustrike unofficial server - debug use only',
        STATS: 'x',
        PANEL: 'ComuStrike.V157',
        ROMUCHAT: 'DEBUG USE ONLY',
        ID_PLAYER: player.player_id,
        CONTROLE: 'checksum'
      })
    }
    next()
  },
  getPlayerIdSchema: {
    body: {
      type: 'object',
      required: ['LELOGIN', 'LEPASS', 'LESOFT'],
      properties: {
        LELOGIN: { type: 'string', minLength: 3},
        LEPASS: { type: 'string', minLength: 3},
        LESOFT: { type: 'number' }
      }
    }
  },
  getPlayerId: async (app, req, res, next) => {
    const player = await app.db.models.Players.findOne({
      where: {
        username: req.body.LELOGIN,
        password: utils.passwordHash(req.body.LEPASS)
      }
    })
    if (player == null) {
      res.status(500).send({ error: 'Invalid credentials' })
    } else {
      res.status(200).send({ ID_PLAYER: player.player_id })
    }
    next()
  },
  addScoreSchema: {
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
  addScore: (app, req, res, next) => {
    next()
  }
}
