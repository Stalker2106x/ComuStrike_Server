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
  createPlayer: (app, req, res, next) => {
    const newPlayer = app.db.Players.create({
      username: req.body.LENOM,
      password: req.body.LEPASS
    })
    res.body = {}
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
  getPlayer: (app, req, res, next) => {
    res.body = {
      NAME: "test",
      ERROR: 0,
      MP3: { value: "lofijazz", ID: 3 },
      MODEL: "kakashi",
      IS_OP: 0,
      VALIDE: 1,
      MSG1: 'testmsg1',
      MSG2: 'testmsg2',
      MSG3: 'testmsg3',
      MSG4: 'testmsg4',
      SCORE: 0,
      SCROLL: 'comustrike unofficial server - debug use only',
      STATS: 'x',
      PANEL: 'ComuStrike.V157',
      ROMUCHAT: 'DEBUG USE ONLY',
      ID_PLAYER: 1,
      CONTROLE: '55ASD'
    }
    next()
  },
  getPlayerIdSchema: {
    body: {
      type: 'object',
      required: ['LELOGIN', 'LEPASS', 'LESOFT'],
      properties: {
        LELOGIN: { type: 'string' },
        LEPASS: { type: 'string' },
        LESOFT: { type: 'number' }
      }
    }
  },
  getPlayerId: (app, req, res, next) => {
    res.body = {
      ID_PLAYER: 1
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
