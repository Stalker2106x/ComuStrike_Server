const Joi = require('joi')

module.exports = {
    validate: (schema, req) => {
        let validationResult = { query: null, body: null }
        if (schema.query) validationResult.query = schema.query.validate(req.query)
        if (schema.body) validationResult.body = schema.body.validate(req.body)
        return validationResult
    },
    middleware: (schema, req, res, next) => {
        let validationResult = module.exports.validate(schema, req)
        
        if ((validationResult.query == null || !Object.prototype.hasOwnProperty.call(validationResult.query, 'error'))
            && (validationResult.body == null || !Object.prototype.hasOwnProperty.call(validationResult.body, 'error'))) {
            next()
        } else {
            res.status(422).send(validationResult)
            next()
        }
    }
}