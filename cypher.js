const config = require('./config')

function bufferXOR (a, b) {
  for (let i = 0; i < a.length; i++) {
    a[i] = a[i] ^ b[i % b.length]
  }
  return a
}

module.exports = {
  cypher: function (msg) {
    const msgBuf = Buffer.from(msg)
    const keyBuf = Buffer.allocUnsafe(4)
    keyBuf.writeInt32LE(config.cypherKey)
    const output = '1' + bufferXOR(msgBuf, keyBuf).toString('hex').toUpperCase()
    if (output.length > config.maxSize) throw new Error(`Payload exceeds maximum size of ${config.maxSize}`)
    return output
  },
  decypher: function (msg) {
    if (msg.length < 3) throw new Error('Payload must contain at least 3 characters')
    if (msg.length > config.maxSize) throw new Error(`Payload exceeds maximum size of ${config.maxSize}`)
    if (msg[0] !== '1') throw new Error('Payload does not start with 1')
    if (msg.length % 2 === 0) throw new Error('Payload character count is not odd')
    if (!msg.match(/[0-9A-F]/g)) throw new Error('Payload is not valid Hex String')
    const msgBuf = Buffer.from(msg.substr(1, msg.length - 1), 'hex')
    const keyBuf = Buffer.allocUnsafe(4)
    keyBuf.writeInt32LE(config.cypherKey)
    return bufferXOR(msgBuf, keyBuf).toString('utf8')
  }
}
