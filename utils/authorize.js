
const hash = require('./hash')

module.exports = {
  authorizePlayer: async function (app, req) {
    const where = {}
    if (req.headers.authorization) {
      const session = module.exports.authorizeToken(app, req.headers.authorization.replace('Bearer ', ''))
      where.id = session.secret.id
    } else {
      // Identify login
      if (req.body.LENUM) {
        where.id = req.body.LENUM
      } else if (req.body.username || req.body.LELOGIN) {
        where.username = req.body.username || req.body.LELOGIN
      } else {
        throw new Error('Missing id or login field in request, cannot authenticate')
      }
      // Identify password
      if (req.body.password || req.body.LEPASS) {
        where.password = req.body.password || hash.passwordHash(req.body.LEPASS, app.config.cypherKey)
      } else {
        throw new Error('Missing password field in request, cannot authenticate')
      }
    }
    // Query
    const player = await app.db.models.Players.findOne({ where })
    if (!player) {
      throw new Error('Invalid credentials')
    }
    return (player)
  },

  authorizeToken: function (app, token) {
    const session = app.sessions.find((session) => session.token === token)
    if (!session) {
      throw new Error('Invalid JWT Token')
    } else if (session.expires < Math.round(Date.now() / 1000)) {
      throw new Error('Expired JWT Token')
    }
    session.expires = Math.round(Date.now() / 1000) + app.config.sessionDuration // Renew expiry
    return (session)
  }
}
