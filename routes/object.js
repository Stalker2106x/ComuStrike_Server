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
    res.arrayKey = 'OBJ'
    res.status(200).send([{
      ID: 0,
      X: 0,
      Y: 0,
      Z: 0,
      DX: 0,
      DY: 0,
      DZ: 0,
      HX: 0,
      HY: 0,
      HZ: 0,
      TYPE: 1
    }])
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
