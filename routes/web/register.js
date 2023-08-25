const nunjucks = require('nunjucks')
const fs = require('fs')
const path = require('path')

module.exports = {
    handler: (app, req, res, next) => {
        let dirname = __dirname
        if (process.pkg) {
          dirname = path.dirname(process.execPath)
        }
        const template = fs.readFileSync(path.join(dirname, '../../web', 'register.html'), 'utf-8')
        const css = fs.readFileSync(path.join(dirname, '../../web', 'web.css'), 'utf-8')
        const page = nunjucks.renderString(template, { css })
        res.set('Content-Type', 'text/html; charset=utf-8')
        res.send(Buffer.from(page))
    }
}