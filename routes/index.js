const getObject = require("./object/getObject")

module.exports = {
    // Misc
    downloadMP3: require('./misc/downloadMP3'),
    // Object
    getObject: require('./object/getObject'),
    placeObject: require('./object/placeObject'),
    // Player
    addScore: require('./player/addScore'),
    createPlayer: require('./player/createPlayer'),
    getPlayer: require('./player/getPlayer'),
    getPlayerId: require('./player/getPlayerId'),
    // Server
    createServer: require('./server/createServer'),
    deleteServer: require('./server/deleteServer'),
    getServerList: require('./server/getServerList'),
    getMapList: require('./server/getMapList'),
    getMP3: require('./server/getMP3'),
    joinServer: require('./server/joinServer'),
    quitServer: require('./server/quitServer'),
    // Tournament
    createTournament: require('./tournament/createTournament'),
    getTournament: require('./tournament/getTournament'),
    getTournamentList: require('./tournament/getTournamentList'),
}