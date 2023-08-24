const utils = require('../utils')

module.exports = {
    async createTeams (app) {
        await app.db.models.Teams.create({
            name: 'RS Staff'
        })
    },
    async createPlayers (app) {
        await app.db.models.Players.create({
            username: 'admin',
            email: 'admin@romustrike.fr',
            password: utils.passwordHash('admin'),
            team_id: await app.db.models.Teams.findOne({ where: { name: 'RS Staff' } }).team_id
        }),
        await app.db.models.Players.create({
            username: 'user',
            email: 'user@romustrike.fr',
            password: utils.passwordHash('user')
        })
    },
    async createMaps (app) {
        await app.db.models.Maps.create({ name: 'awp_city3', author: 'JLB' })
        await app.db.models.Maps.create({ name: 'Awp_city4', author: 'JLB' })
        await app.db.models.Maps.create({ name: 'bahu', author: 'Thixomag' })
        await app.db.models.Maps.create({ name: 'Base_D02', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'calumpit', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'Castle_Rock2', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'chinatown', author: 'Jake' })
        await app.db.models.Maps.create({ name: 'crash', author: '.Bacchus. et TDC' })
        await app.db.models.Maps.create({ name: 'CTF_Depot', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'Decharge', author: 'Deliorha481' })
        await app.db.models.Maps.create({ name: 'Egypt', author: 'Laboss' })
        await app.db.models.Maps.create({ name: 'forest_bunker', author: 'OVNI89' })
        await app.db.models.Maps.create({ name: 'Furusato', author: 'Jake' })
        await app.db.models.Maps.create({ name: 'hangar', author: 'Ares' })
        await app.db.models.Maps.create({ name: 'LaGrange', author: '?????' })
        await app.db.models.Maps.create({ name: 'living_room', author: 'OVNI89' })
        await app.db.models.Maps.create({ name: 'Lost_Ark2', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'medievale', author: 'Ares' })
        await app.db.models.Maps.create({ name: 'metro', author: 'TDC' })
        await app.db.models.Maps.create({ name: 'normandie', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'nov5mber', author: '?????' })
        await app.db.models.Maps.create({ name: 'old_city', author: 'JLB' })
        await app.db.models.Maps.create({ name: 'paintball', author: 'Stevo' })
        await app.db.models.Maps.create({ name: 'paradise', author: '7LightMan' })
        await app.db.models.Maps.create({ name: 'quadrat', author: 'Yaplus' })
        await app.db.models.Maps.create({ name: 'RS_Assault', author: '7LightMan' })
        await app.db.models.Maps.create({ name: 'RS_Aztec', author: '7LightMan' })
        await app.db.models.Maps.create({ name: 'RS_Dust', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'RS_Inferno', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'RS_Tours', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'Rue', author: 'JLB' })
        await app.db.models.Maps.create({ name: 'seagate', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'SGC', author: 'Electron' })
        await app.db.models.Maps.create({ name: 'snip_beach', author: 'OVNI89' })
        await app.db.models.Maps.create({ name: 'snip_castle5', author: 'Jake' })
        await app.db.models.Maps.create({ name: 'sniper_snow2', author: 'OVNI89' })
        await app.db.models.Maps.create({ name: 'StarSnip', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'station_orbitale', author: 'Jake' })
        await app.db.models.Maps.create({ name: 'Sucrerie', author: '?????' })
        await app.db.models.Maps.create({ name: 'Thermes', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'trenchwar', author: 'Bonovox' })
        await app.db.models.Maps.create({ name: 'tunisia', author: 'TDC' })
        await app.db.models.Maps.create({ name: 'Valaperil', author: 'Yamamoto' })
        await app.db.models.Maps.create({ name: 'Z51', author: 'Bonovox' })
    }
}