module.exports = {
  validate: (schema, req) => {
    const validationResult = {
      body: schema.body ? schema.body.validate(req.body) : null,
      query: schema.query ? schema.query.validate(req.query) : null
    }
    if ((validationResult.body && validationResult.body.error) || (validationResult.query && validationResult.query.error)) {
      console.error(validationResult)
      return validationResult
    }
    return null
  },
  middleware: (schema, req, res, next) => {
    const validationResult = module.exports.validate(schema, req)
    if (validationResult) {
      if (global.debug) console.error(validationResult)
      res.status(422).send(JSON.stringify(validationResult))
    }
    next()
  }
}
