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
    next()
  },
  placeObjectSchema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'Px', 'Py', 'Pz', 'Dx', 'Dy', 'Dz', 'Ux', 'Uy', 'Uz', 'T', 'M'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        LAMAP: { type: 'string' },
        Px: { type: 'number' },
        Py: { type: 'number' },
        Pz: { type: 'number' },
        Dx: { type: 'number' },
        Dy: { type: 'number' },
        Dz: { type: 'number' },
        Ux: { type: 'number' },
        Uy: { type: 'number' },
        Uz: { type: 'number' },
        T: { type: 'number' },
        M: { type: 'string' }
      }
    }
  },
  placeObject: (app, req, res, next) => {
    next()
  }
}
