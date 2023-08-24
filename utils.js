const { createHash } = require('crypto')
const fs = require('fs')
const chalk = require('chalk')

function bufferXOR (a, b) {
  for (let i = 0; i < a.length; i++) {
    a[i] = a[i] ^ b[i % b.length]
  }
  return a
}

module.exports = {

    cypher: function (app, msg) {
      const msgBuf = Buffer.from(msg)
      const keyBuf = Buffer.allocUnsafe(4)
      keyBuf.writeInt32LE(app.config.cypherKey)
      const output = '1' + bufferXOR(msgBuf, keyBuf).toString('hex').toUpperCase()
      if (output.length > app.config.maxPayloadSize) throw new Error(`Payload exceeds maximum size of ${app.config.maxPayloadSize}`)
      return output
    },

    decypher: function (app, msg) {
      if (msg.length < 3) throw new Error('Payload must contain at least 3 characters')
      if (msg.length > app.config.maxPayloadSize) throw new Error(`Payload exceeds maximum size of ${app.config.maxPayloadSize}`)
      if (msg[0] !== '1') throw new Error('Payload does not start with 1')
      if (msg.length % 2 === 0) throw new Error('Payload character count is not odd')
      if (!msg.match(/[0-9A-F]/g)) throw new Error('Payload is not valid Hex String')
      const msgBuf = Buffer.from(msg.substr(1, msg.length - 1), 'hex')
      const keyBuf = Buffer.allocUnsafe(4)
      keyBuf.writeInt32LE(app.config.cypherKey)
      return bufferXOR(msgBuf, keyBuf).toString('utf8')
    },

    fileMD5(path) {
        try {
            const fileData = fs.readFileSync(path)
            return createHash("md5").update(fileData).digest("hex")
        } catch (e) {
            console.error(`failed to compute MD5 hash for ${path}: ${e}`)
            return ''
        }
    },

    passwordHash(password) {
      return createHash("sha256").update(password).digest("hex")
    },

    logPayload (body) {
        const copy = JSON.parse(JSON.stringify(body));
        delete copy.LEPASS
        console.log(copy)
    },

    padTwoDigits(num) {
        return num.toString().padStart(2, "0");
    },

    dateFormatter (date) {
        return (
          [
            date.getFullYear(),
            module.exports.padTwoDigits(date.getMonth() + 1),
            module.exports.padTwoDigits(date.getDate()),
          ].join('-') +
          ' ' +
          [
            module.exports.padTwoDigits(date.getHours()),
            module.exports.padTwoDigits(date.getMinutes()),
            module.exports.padTwoDigits(date.getSeconds()),
          ].join(':')
        );
    },

    logger(service, msg) {
        if (service === 'game') {
          console.log(`${module.exports.dateFormatter(new Date())} ${chalk.green('[GAME]')} ${chalk.green(msg)}`);
        } else if (service === 'chat') {
          console.log(`${module.exports.dateFormatter(new Date())} ${chalk.blue('[CHAT]')} ${chalk.blue(msg)}`);
        }
    }
}