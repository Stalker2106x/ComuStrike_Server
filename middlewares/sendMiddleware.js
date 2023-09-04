const xmljs = require('xml-js')
const utils = require('../utils')

module.exports = (req, res, next) => {
  const oldSend = res.send
  res.send = function (body) {
    res.send = oldSend // set function back to avoid the 'double-send'
    if (req.headers.crypt) {
      if (body && Object.prototype.hasOwnProperty.call(body, 'return')) {
        // If object contains a return key, we convert it to single value body
        const xmlData = { _declaration: { _attributes: { version: '1.0', encoding: 'ISO-8859-1' } }, root: { _text: body.return } }
        if (global.debug) console.log('RES>' + xmljs.js2xml(xmlData, { compact: true, spaces: 4 }))
        res.type('application/xml').send(xmljs.js2xml(xmlData, { compact: true, spaces: 0 }))
      } else if (typeof body === 'object') {
        // We have to convert current response to legacy XML schema
        const xmlData = { _declaration: { _attributes: { version: '1.0', encoding: 'ISO-8859-1' } }, root: utils.js2xmlPreformat(body) }
        if (global.debug) console.log('RES>' + xmljs.js2xml(xmlData, { compact: true, spaces: 4, elementNameFn: (val) => utils.arrayFix(res, val) }))
        return res.type('application/xml').send(xmljs.js2xml(xmlData, { compact: true, spaces: 0, elementNameFn: (val) => utils.arrayFix(res, val) }))
      } else {
        // Empty response
        if (global.debug) console.log('RES>' + 'empty response')
        return res.send()
      }
    } else {
      if (global.debug && res.baseUrl === '/v1') console.log('RES>' + body)
      return res.send(body)
    }
  }
  next()
}
