const chalk = require('chalk')
const fs = require('fs')

function dateToTimestamp (date) {
  return (
    [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0')
    ].join('-') +
        ' ' +
        [
          date.getHours().toString().padStart(2, '0'),
          date.getMinutes().toString().padStart(2, '0'),
          date.getSeconds().toString().padStart(2, '0')
        ].join(':')
  )
}

module.exports = {
  logPayload (body) {
    const copy = JSON.parse(JSON.stringify(body))
    copy.LEPASS = '***'
    console.log(copy)
  },
  logger (service, msg) {
    if (service === 'game') {
      if (global.logFile) {
        fs.appendFileSync(global.logFile, `${dateToTimestamp(new Date())} '[GAME]' ${msg}\n`)
      }
      console.log(`${dateToTimestamp(new Date())} ${chalk.green('[GAME]')} ${chalk.green(msg)}`)
    } else if (service === 'chat') {
      if (global.chatHistoryFile) {
        fs.appendFileSync(global.chatHistoryFile, `${dateToTimestamp(new Date())} '[CHAT]' ${msg}\n`)
      }
      console.log(`${dateToTimestamp(new Date())} ${chalk.blue('[CHAT]')} ${chalk.blue(msg)}`)
    } else {
      throw new Error(`Unknown service: ${service}`)
    }
  }
}
