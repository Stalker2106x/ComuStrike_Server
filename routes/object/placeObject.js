const Joi = require('joi')
// set_objet -> placeObject
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.number(),
      LEPASS: Joi.string(),
      LAMAP: Joi.string(),
      'P[x]': Joi.number(),
      'P[y]': Joi.number(),
      'P[z]': Joi.number(),
      'D[x]': Joi.number(),
      'D[y]': Joi.number(),
      'D[z]': Joi.number(),
      'U[x]': Joi.number(),
      'U[y]': Joi.number(),
      'U[z]': Joi.number(),
      T: Joi.number(),
      M: Joi.string()
    })
  },
  handler: (app, req, res, next) => {
    next()
  }
}
