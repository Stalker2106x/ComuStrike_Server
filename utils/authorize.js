
const hash = require('./hash')

module.exports = {
  authorizePlayer: async function (app, params) {
    const where = {
      password: hash.passwordHash(params.password, app.config.cypherKey)
    }
    if (params.id) where.player_id = params.id
    if (params.username) where.player_id = params.username
    const player = await app.db.models.Players.findOne({ where })
    if (!player) {
      throw new Error('Invalid credentials')
    }
    return (params)
  }
}
