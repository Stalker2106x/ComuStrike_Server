const nunjucks = require('nunjucks')
const fs = require('fs')
const path = require('path')

module.exports = {
    handler: (app, req, res, next) => {
        let dirname = __dirname
        if (process.pkg) {
          dirname = path.dirname(process.execPath)
        }
        const template = fs.readFileSync(path.join(dirname, '../../web', 'home.html'), 'utf-8')
        const css = fs.readFileSync(path.join(dirname, '../../web', 'web.css'), 'utf-8')
        const version = `Server v${app.config.serverVersion}  -  Game v${app.config.gameVersion}`
        const page = nunjucks.renderString(template, { css, serverList: app.serverList, version })
        res.set('Content-Type', 'text/html; charset=utf-8')
        res.send(Buffer.from(page))
    }
}