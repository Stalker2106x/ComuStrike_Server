const utils = require('./utils')

module.exports = {
    async createPlayers (app) {
        await app.db.models.Players.create({
            username: 'admin',
            email: 'admin@romustrike.fr',
            password: utils.passwordHash('admin')
        }),
        await app.db.models.Players.create({
            username: 'user',
            email: 'user@romustrike.fr',
            password: utils.passwordHash('user')
        })
    },
    async createMaps (app) {
        await app.db.models.Maps.create({ name: 'awp_city3', author: 'someone' })
        await app.db.models.Maps.create({ name: 'Awp_city4', author: 'someone' })
        await app.db.models.Maps.create({ name: 'bahu', author: 'someone' })
        await app.db.models.Maps.create({ name: 'Base_D02', author: 'someone' })
        await app.db.models.Maps.create({ name: 'calumpit', author: 'someone' })
        await app.db.models.Maps.create({ name: 'Castle_Rock2', author: 'someone' })
        await app.db.models.Maps.create({ name: 'chinatown', author: 'someone' })
        await app.db.models.Maps.create({ name: 'crash', author: 'someone' })
        await app.db.models.Maps.create({ name: 'CTF_Depot', author: 'someone' })
        await app.db.models.Maps.create({ name: 'Decharge', author: 'someone' })
        await app.db.models.Maps.create({ name: 'Egypt', author: 'someone' })
        await app.db.models.Maps.create({ name: 'forest_bunker', author: 'someone' })
        await app.db.models.Maps.create({ name: 'Furusato', author: 'someone' })
        await app.db.models.Maps.create({ name: 'hangar', author: 'someone' })
        await app.db.models.Maps.create({ name: 'LaGrange', author: 'someone' })
        await app.db.models.Maps.create({ name: 'living_room', author: 'someone' })
        await app.db.models.Maps.create({ name: 'medievale', author: 'someone' })
        await app.db.models.Maps.create({ name: 'metro', author: 'someone' })
        await app.db.models.Maps.create({ name: 'normandie', author: 'someone' })
        await app.db.models.Maps.create({ name: 'nov5mber', author: 'someone' })
        await app.db.models.Maps.create({ name: 'old_city', author: 'someone' })
        await app.db.models.Maps.create({ name: 'paintball', author: 'someone' })
        await app.db.models.Maps.create({ name: 'paradise', author: 'someone' })
        await app.db.models.Maps.create({ name: 'quadrat', author: 'someone' })
        await app.db.models.Maps.create({ name: 'RS_Assault', author: 'someone' })
        await app.db.models.Maps.create({ name: 'RS_Aztec', author: 'someone' })
        await app.db.models.Maps.create({ name: 'RS_Dust', author: 'someone' })
        await app.db.models.Maps.create({ name: 'RS_Inferno', author: 'someone' })
        await app.db.models.Maps.create({ name: 'RS_Tours', author: 'someone' })
        await app.db.models.Maps.create({ name: 'Rue', author: 'someone' })
        await app.db.models.Maps.create({ name: 'seagate', author: 'someone' })
        await app.db.models.Maps.create({ name: 'SGC', author: 'someone' })
        await app.db.models.Maps.create({ name: 'snip_beach', author: 'someone' })
        await app.db.models.Maps.create({ name: 'snip_castle5', author: 'someone' })
        await app.db.models.Maps.create({ name: 'sniper_snow2', author: 'someone' })
        await app.db.models.Maps.create({ name: 'StarSnip', author: 'someone' })
        await app.db.models.Maps.create({ name: 'station_orbitale', author: 'someone' })
        await app.db.models.Maps.create({ name: 'Sucrerie', author: 'someone' })
        await app.db.models.Maps.create({ name: 'Thermes', author: 'someone' })
        await app.db.models.Maps.create({ name: 'trenchwar', author: 'someone' })
        await app.db.models.Maps.create({ name: 'tunisia', author: 'someone' })
        await app.db.models.Maps.create({ name: 'Valaperil', author: 'someone' })
        await app.db.models.Maps.create({ name: 'Z51', author: 'someone' })
    }
}