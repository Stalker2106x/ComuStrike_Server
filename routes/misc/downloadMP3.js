const path = require('path')
// NEW
module.exports = {
    handler: (app, req, res, next) => {
        res.status(200).download(path.join(__dirname, '../../media', `${req.params.music}`), (err) => { console.error(err) })
    }
}