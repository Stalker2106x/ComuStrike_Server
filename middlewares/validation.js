module.exports = {
    validate: (schema, req) => {
        return {
            body: schema.body ? schema.body.validate(req.body) : null,
            query: schema.query ? schema.query.validate(req.query) : null
        }
    },
    middleware: (schema, req, res, next) => {
        let validationResult = module.exports.validate(schema, req)
        
        if (validationResult.body && validationResult.body.error || validationResult.query && validationResult.query.error) {
            console.error(validationResult)
            res.status(422).send('valid error')
            next()
        }
        next()
    }
}