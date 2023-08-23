module.exports = {
  getObjectSchema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LAMAP'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        LAMAP: { type: 'string' }
      }
    }
  },
  getObject: (app, req, res, next) => {
    res.status(200).send({
      'P[x]': 0,
      'P[y]': 0,
      'P[z]': 0,
      'D[x]': 0,
      'D[y]': 0,
      'D[z]': 0,
      'U[x]': 0,
      'U[y]': 0,
      'U[z]': 0,
    })
    next()
  },
  placeObjectSchema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'P[x]', 'P[y]', 'P[z]', 'D[x]', 'D[y]', 'D[z]', 'U[x]', 'U[y]', 'U[z]', 'T', 'M'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        LAMAP: { type: 'string' },
        'P[x]': { type: 'number' },
        'P[y]': { type: 'number' },
        'P[z]': { type: 'number' },
        'D[x]': { type: 'number' },
        'D[y]': { type: 'number' },
        'D[z]': { type: 'number' },
        'U[x]': { type: 'number' },
        'U[y]': { type: 'number' },
        'U[z]': { type: 'number' },
        T: { type: 'number' },
        M: { type: 'string' }
      }
    }
  },
  placeObject: (app, req, res, next) => {
    next()
  }
}
