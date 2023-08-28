const utils = require('../../utils')

// se_faire_tuer -> killed
module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['V', 'P', 'T', 'PV', 'PT', 'HS', 'LAVERSION'],
      properties: {
        V: { type: 'number' }, //victim ID
        P: { type: 'string' }, //victime NAME
        T: { type: 'number' }, //killer ID
        PV: { type: 'number' }, //?
        PT: { type: 'number' }, //??
        HS: { type: 'number' } //Is it a headshot ? 1 : 0
      }
    }
  },
  handler: (app, req, res, next) => {
    res.status(200).send({
        IDGRADE: 0,
        NOMGRADE: 'test',
        NIVEAU: 1
    })
    next()
  }
}
