const path = require('path')

const PathMapper = {
  map150: '../../maps',
  mp3: '../../media'
}

// NEW
module.exports = {
  handler: (app, req, res, next) => {
    if (!Object.prototype.hasOwnProperty.call(PathMapper, req.params.assetType)) {
      res.status(500).send('Invalid asset type')
    }
    res.status(200).download(path.join(__dirname, PathMapper[req.params.assetType], req.params.asset), (err) => { console.error(err) })
  }
}
