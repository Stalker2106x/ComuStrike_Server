const utils = require('../../utils')

// get_niveau_grade -> getRank
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['J', 'LAVERSION'],
      properties: {
        J: { type: 'string' },
        LAVERSION: { type: 'string' }
      }
    }
  },
  handler: (app, req, res, next) => {
    res.status(200).send({
        IDGRADE: 0,
        NOMGRADE: 'test',
        NIVEAU: 1,
        LVLARME: 1
    })
    next()
  }
}
