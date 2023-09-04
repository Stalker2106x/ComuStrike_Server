const Joi = require('joi')

const utils = require('../../../utils')
const validation = require('../../../middlewares/validation')

const LegacyToRESTMapper = require('./legacyToRESTMapper')

// xml_layer.php -> xmlLayer
module.exports = {
  description: 'Legacy entrypoint to handle requests from game',
  method: 'get',
  route: '/script/romustrike/xml_layer.php',
  params: {
    query: Joi.object({
      crypt: Joi.string().min(3).required().description('Cyphered payload containing the method to call and the body of the request')
    })
  },
  responses: {
    200: Joi.object().required().description('JSON response of the appropriate method converted to XML'),
    500: Joi.object({
      error: Joi.string().required().description('A short description of the error that occured')
    })
  },
  handler: (app, req, res, next) => {
    if (global.debug) console.log(req.query.crypt)
    try {
      const requestData = utils.decypher(app, req.query.crypt).split(/[?&]+/)
      for (const entry of requestData) {
        const data = entry.split('=')
        req.body[data[0].toUpperCase()] = data[1]
      }
      req.headers.crypt = req.query.crypt
      delete req.query.crypt
    } catch (e) {
      console.error(e)
      res.status(500).send('Invalid crypt payload')
      next()
      return
    }
    if (global.debug) utils.logPayload(req.body)
    if (!Object.prototype.hasOwnProperty.call(LegacyToRESTMapper, req.body.METHOD)) {
      res.status(500).send('Unknown method')
      next()
    } else {
      // Call appopriate REST method from mapper
      const method = LegacyToRESTMapper[req.body.METHOD]
      delete req.body.METHOD // Field needs to be discarded to pass validation
      const validationResult = validation.validate(method.params, req)
      if (validationResult != null) {
        res.status(500).send(validationResult)
      } else {
        req.headers['rs-version'] = req.body.LAVERSION
        req.headers['rs-soft'] = req.body.LESOFT
        method.handler(app, req, res, next)
      }
    }
  }
}
