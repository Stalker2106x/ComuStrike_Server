const Joi = require('joi')

module.exports = {
    validate: (schema, req) => {
        return schema.validate(req)
    },
    middleware: (schema, req, res, next) => {
        let validationResult = module.exports.validate(schema, req)
        
        if ((validationResult == null || !Object.prototype.hasOwnProperty.call(validationResult, 'error'))) {
            next()
        } else {
            res.status(422).send(validationResult)
            next()
        }
    }
}