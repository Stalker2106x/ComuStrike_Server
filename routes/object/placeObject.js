// set_objet -> placeObject
module.exports = {
  schema: {
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
  handler: (app, req, res, next) => {
    next()
  }
}
