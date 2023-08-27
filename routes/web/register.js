const nunjucks = require('nunjucks')
const fs = require('fs')
const path = require('path')
const { register } = require('..')

module.exports = {
  handler: (app, req, res, next) => {
    const template = fs.readFileSync(path.join(__dirname, '../../web', 'register.html'), 'utf-8')
    const css = fs.readFileSync(path.join(__dirname, '../../web', 'web.css'), 'utf-8')
    const registerScript = fs.readFileSync(path.join(__dirname, '../../web/scripts', 'register.js'), 'utf-8')
    const page = nunjucks.renderString(template, { css }, registerScript)
    res.set('Content-Type', 'text/html; charset=utf-8')
    res.send(Buffer.from(page))
  }
}
