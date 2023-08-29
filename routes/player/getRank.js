const Joi = require('joi')

// get_niveau_grade -> getRank
module.exports = {
  schema: {
    body: Joi.object({
      J: Joi.string().required(),
      LAVERSION: Joi.string().required()
    })
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
