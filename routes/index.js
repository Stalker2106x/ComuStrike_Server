module.exports = {
  // Web
  home: require('./web/home'),
  register: require('./web/register'),
  // Assets
  downloadAsset: require('./assets/downloadAsset'),
  getMapList: require('./assets/getMapList'),
  getMP3List: require('./assets/getMP3List'),
  // Object
  getObject: require('./object/getObject'),
  placeObject: require('./object/placeObject'),
  // Player
  addScore: require('./player/addScore'),
  setMP3: require('./player/setMP3'),
  createPlayer: require('./player/createPlayer'),
  getPlayer: require('./player/getPlayer'),
  getPlayerId: require('./player/getPlayerId'),
  // Server
  createServer: require('./server/createServer'),
  deleteServer: require('./server/deleteServer'),
  getServerList: require('./server/getServerList'),
  joinServer: require('./server/joinServer'),
  quitServer: require('./server/quitServer'),
  // Tournament
  createTournament: require('./tournament/createTournament'),
  getTournament: require('./tournament/getTournament'),
  getTournamentList: require('./tournament/getTournamentList')
}
