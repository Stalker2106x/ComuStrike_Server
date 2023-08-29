const Joi = require('joi')

// get_objet -> getObject
module.exports = {
  schema: {
    body: Joi.object({
      LENUM: Joi.number(),
      LEPASS: Joi.string(),
      LAMAP: Joi.string()
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
