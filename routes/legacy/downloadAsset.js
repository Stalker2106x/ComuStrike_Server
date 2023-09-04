const Joi = require('joi')
const path = require('path')

const PathMapper = {
  map150: '../../maps',
  mp3: '../../media'
}

// NEW
module.exports = {
  description: 'Route to download binary assets from server',
  method: 'get',
  route: '/romustrike/:assetType/:asset',
  params: {
    body: Joi.object({
      assetType: Joi.string().valid('map150', 'mp3').required().description('The asset type of the asset to download'),
      asset: Joi.string().required().description('The asset name of the asset to download')
    })
  },
  responses: {
    200: Joi.binary().required().description('The binary asset requested'),
    500: Joi.object({
      error: Joi.string().required().description('A short description of the error that occured')
    })
  },
  handler: (app, req, res, next) => {
    if (!Object.prototype.hasOwnProperty.call(PathMapper, req.params.assetType)) {
      res.status(500).send('Invalid asset type')
    }
    res.status(200).download(path.join(__dirname, PathMapper[req.params.assetType], req.params.asset), (err) => { console.error(err) })
  }
}
