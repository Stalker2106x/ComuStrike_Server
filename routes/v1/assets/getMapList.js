const Joi = require('joi')

const path = require('path')
const utils = require('../../../utils')

// get_map -> getMapList
module.exports = {
  description: 'Get all maps available on server',
  method: 'get',
  route: '/v1/maps',
  schema: Joi.object({
    body: Joi.object({
      LENUM: Joi.number().integer().required().description('The ID of the player sending the request'),
      LESOFT: Joi.number().integer().required().description('The software used for sending the request'),
      LEPASS: Joi.string().required().description('The password of the player sending the request')
    })
  }),
  handler: async (app, req, res, next) => {
    const dbMaps = await app.db.models.Maps.findAll()
    const maps = []
    for (const map of dbMaps) {
      maps.push({
        NAME: map.name,
        MAPPEUR: map.author,
        WADMD5: utils.fileMD5(path.join(__dirname, '../../maps/', `${map.name}.wad`)),
        BSPMD5: utils.fileMD5(path.join(__dirname, '../../maps/', `${map.name}.bsp`)),
        HOST: global.forceLocalhost ? '127.0.0.1' : app.config.publicIP
      })
    }
    res.arrayKey = 'element'
    res.status(200).send(maps)
    next()
  }
}
