const nunjucks = require('nunjucks')
const fs = require('fs')
const path = require('path')

module.exports = {
  handler: async (app, req, res, next) => {
    const template = await fs.readFileSync(path.join(__dirname, '../../web', 'register.html'), 'utf-8')
    const css = await fs.readFileSync(path.join(__dirname, '../../web', 'web.css'), 'utf-8')
    const registerScript = await fs.readFileSync(path.join(__dirname, '../../web/scripts', 'register.js'), 'utf-8')
    const page = nunjucks.configure({ autoescape: false }).renderString(template, { css, registerScript })
    res.set('Content-Type', 'text/html; charset=utf-8')
    res.send(Buffer.from(page))
  }
}
