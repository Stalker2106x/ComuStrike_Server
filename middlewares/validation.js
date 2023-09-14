module.exports = {
  validate: (schema, req) => {
    const validationResult = {
      body: schema.body ? schema.body.validate(req.body) : null,
      query: schema.query ? schema.query.validate(req.query) : null
    }
    if ((validationResult.body && validationResult.body.error) || (validationResult.query && validationResult.query.error)) {
      if (validationResult.body && global.debug) console.error(validationResult.body.error)
      if (validationResult.query && global.debug) console.error(validationResult.query.error)
      return validationResult
    }
    return null
  },
  middleware: (schema, req, res, next) => {
    const validationResult = module.exports.validate(schema, req)
    if (validationResult) {
      res.status(422).setHeader('Content-Type', 'application/json').send(JSON.stringify({
        ...(validationResult.body && { bodyError: validationResult.body.error.details }),
        ...(validationResult.query && { queryError: validationResult.query.error.details })
      }))
      return;
    }
    next()
  }
}
