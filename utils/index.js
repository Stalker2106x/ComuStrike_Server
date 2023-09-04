const cypherModule = require('./cypher')
const hashModule = require('./hash')
const loggerModule = require('./logger')
const xmlModule = require('./xml')
const authorizeModule = require('./authorize')
const ipModule = require('./ip')
const openapiModule = require('./openapi')

module.exports = {
  // Authorize
  authorizePlayer: authorizeModule.authorizePlayer,
  authorizeToken: authorizeModule.authorizeToken,
  // Cypher
  cypher: cypherModule.cypher,
  decypher: cypherModule.decypher,
  // Hash
  fileMD5: hashModule.fileMD5,
  passwordHash: hashModule.passwordHash,
  sha256: hashModule.sha256,
  // XML
  arrayFix: xmlModule.arrayFix,
  js2xmlPreformat: xmlModule.js2xmlPreformat,
  // Logger
  logPayload: loggerModule.logPayload,
  logger: loggerModule.logger,
  // IP
  getIp: ipModule.getIp,
  // OpenAPI
  generateAPIdoc: openapiModule.generate
}