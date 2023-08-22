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
  createPlayer: (app, req, res) => {

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
  getPlayer: (app, req, res) => {
    console.log(app.db)
    res.status(200).send({})
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
  getPlayerId: (app, req, res) => {

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
  addScore: (app, req, res) => {

  }
}
