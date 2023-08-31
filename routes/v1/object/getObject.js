const Joi = require('joi')

// get_objet -> getObject
module.exports = {
  description: 'Get all Objects',
  method: 'get',
  route: '/v1/objects',
  schema: {
    body: Joi.object({
      LENUM: Joi.string().required().description('The ID of the player sending the request'),
      LEPASS: Joi.string().required().description('The password of the player sending the request'),
      LAMAP: Joi.string().description('Unknown use')
    })
  },
  handler: (app, req, res, next) => {
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
  }
}
