const cypherModule = require('./cypher')
const hashModule = require('./hash')
const loggerModule = require('./logger')
const xmlModule = require('./xml')
const authorizeModule = require('./authorize')

module.exports = {
  authorizeModule: authorizeModule.authorizePlayer,
  cypher: cypherModule.cypher,
  decypher: cypherModule.decypher,
  fileMD5: hashModule.fileMD5,
  passwordHash: hashModule.passwordHash,
  arrayFix: xmlModule.arrayFix,
  js2xmlPreformat: xmlModule.js2xmlPreformat,
  logPayload: loggerModule.logPayload,
  logger: loggerModule.logger
}