
const hash = require('./hash')

module.exports = {
  authorizePlayer: async function (app, req) {
    let where = {}
    // Identify login
    if (req.headers['rs-player-id']) {
      where.player_id = req.headers['rs-player-id']
    } else if (req.body.LENUM) {
      where.player_id = req.body.LENUM
    } else if (req.headers['rs-player-login']) {
      where.username = req.headers['rs-player-login']
    } else if (req.body.LELOGIN) {
      where.username = req.body.LELOGIN
    } else {
      throw new Error('Missing id/login field in request, cannot authenticate')
    }
    // Identify password
    if (req.headers['rs-player-password']) {
      where.password = req.headers['rs-player-password']
    } else if (req.body.LEPASS) {
      where.password = hash.passwordHash(req.body.LEPASS, app.config.cypherKey)
    } else {
      throw new Error('Missing password field in request, cannot authenticate')
    }
    // Query
    const player = await app.db.models.Players.findOne({ where })
    if (!player) {
      throw new Error('Invalid credentials')
    }
    return (player)
  }
}
