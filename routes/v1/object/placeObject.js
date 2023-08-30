const Joi = require('joi')
// set_objet -> placeObject
module.exports = {
  description: 'Place object',
  method: 'post',
  route: '/v1/objects',
  schema: Joi.object({
    body: Joi.object({
      LENUM: Joi.string().required().description('The ID of the player sending the request'),
      LEPASS: Joi.string().required().description('The password of the player sending the request'),
      LAMAP: Joi.string().description('Unknown use'),
      'P[x]': Joi.number().integer().description('Unknown use'),
      'P[y]': Joi.number().integer().description('Unknown use'),
      'P[z]': Joi.number().integer().description('Unknown use'),
      'D[x]': Joi.number().integer().description('Unknown use'),
      'D[y]': Joi.number().integer().description('Unknown use'),
      'D[z]': Joi.number().integer().description('Unknown use'),
      'U[x]': Joi.number().integer().description('Unknown use'),
      'U[y]': Joi.number().integer().description('Unknown use'),
      'U[z]': Joi.number().integer().description('Unknown use'),
      T: Joi.number().integer().description('Unknown use'),
      M: Joi.string().description('Unknown use')
    })
  }),
  handler: (app, req, res, next) => {
    next()
  }
}
