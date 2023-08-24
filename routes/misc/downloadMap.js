const path = require('path')
// NEW
module.exports = {
    handler: (app, req, res, next) => {
        let dirname = __dirname
        if (process.pkg) {
          dirname = path.dirname(process.execPath)
        }
        res.status(200).download(path.join(dirname, '../../maps', `${req.params.level}`), (err) => { console.error(err) })
    }
}