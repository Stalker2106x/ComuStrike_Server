const { createHash } = require('crypto')
const fs = require('fs')

module.exports = {
  fileMD5 (path) {
    try {
      const fileData = fs.readFileSync(path)
      return createHash('md5').update(fileData).digest('hex')
    } catch (e) {
      console.error(`failed to compute MD5 hash for ${path}: ${e}`)
      return ''
    }
  },

  passwordHash (password, salt) {
    return createHash('sha256').update(password + salt).digest('hex')
  }
}