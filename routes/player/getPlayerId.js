const utils = require('../../utils')

// get_id -> getPlayerId
module.exports = {
    schema: {
        body: {
        type: 'object',
        required: ['LELOGIN', 'LEPASS', 'LESOFT'],
        properties: {
            LELOGIN: { type: 'string', minLength: 3},
            LEPASS: { type: 'string', minLength: 3},
            LESOFT: { type: 'number' }
        }
        }
    },
    handler: async (app, req, res, next) => {
        const player = await app.db.models.Players.findOne({
        where: {
            username: req.body.LELOGIN,
            password: utils.passwordHash(req.body.LEPASS)
        }
        })
        if (player == null) {
        res.status(500).send({ error: 'Invalid credentials' })
        } else {
        res.status(200).send({ ID_PLAYER: player.player_id })
        }
        next()
    }
}