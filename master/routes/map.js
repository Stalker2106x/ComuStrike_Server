module.exports = {
  getMapSchema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LESOFT', 'LEPASS'],
      properties: {
        LENUM: { type: 'number' },
        LESOFT: { type: 'number' },
        LEPASS: { type: 'string' }
      }
    }
  },
  getMap: (app, req, res, next) => {
    body = {
      MAP: 'toto'
    }
    next()
  }
}
