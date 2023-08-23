const { createHash } = require('crypto')
const fs = require('fs')

module.exports = {

    fileMD5(path) {
        try {
            const fileData = fs.readFileSync(path);
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

    logger(msg) {
        console.log(`${module.exports.dateFormatter(new Date())} - ${msg}`);
    }
}