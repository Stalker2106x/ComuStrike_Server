const Joi = require('joi')

// se_faire_tuer -> killed
module.exports = {
  schema: {
    body: Joi.object({
      V: Joi.number().required(), //victim ID
      P: Joi.string().required(), //victime NAME
      T: Joi.number().required(), //killer ID
      PV: Joi.number().required(), //?
      PT: Joi.number().required(), //??
      HS: Joi.number().required() //Is it a headshot ? 1 : 0
    })
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
