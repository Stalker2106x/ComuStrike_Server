module.exports = {
  getMP3Schema: {
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
  getMP3: (app, req, res, next) => {
    res.body = {
      element: {
        value: {
          NAME: 'server',
          COMMENTAIRE: 'desc',
          HOST: 'x',
          ID: 0
        }
      }
    }
    next()
  },
  setMP3Schema: {
  },
  setMP3: (app, req, res, next) => {
    res.body = null
    next()
  }
}
