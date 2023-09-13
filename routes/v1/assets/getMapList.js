const Joi = require('joi')

const path = require('path')
const utils = require('../../../utils')

// get_map -> getMapList
module.exports = {
  description: 'Get all maps available on server',
  method: 'get',
  route: '/v1/maps',
  params: {
    body: null
  },
  responses: {
    200: Joi.array().items({
      NAME: Joi.string().required().description('The name of the map'),
      MAPPEUR: Joi.string().required().description('The username of the creator of the map'),
      WADMD5: Joi.string().required().description('The MD5 checksum of the WAD file of the map'),
      BSPMD5: Joi.string().required().description('The MD5 checksum of the BSP file of the map'),
      HOST: Joi.string().required().description('The host where the map is available to download')
    })
  },
  handler: async (app, req, res, next) => {
    try {
      await utils.authorizePlayer(app, req)
    } catch (e) {
      res.status(401).send({ error: `Authorization error: ${e}` })
      return next()
    }
    const dbMaps = await app.db.models.Maps.findAll()
    const maps = []
    for (const map of dbMaps) {
      maps.push({
        NAME: map.name,
        MAPPEUR: map.author,
        WADMD5: utils.fileMD5(path.join(__dirname, '../../../maps/', `${map.name}.wad`)),
        BSPMD5: utils.fileMD5(path.join(__dirname, '../../../maps/', `${map.name}.bsp`)),
        HOST: global.forceLocalhost ? '127.0.0.1' : app.config.publicIP
      })
    }
    res.arrayKey = 'element'
    res.status(200).send(maps)
    next()
  }
}
