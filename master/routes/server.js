module.exports = {
  createServerSchema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LESOFT', 'LECOMMENT', 'MAX_PLAYERS', 'CFT', 'CLE_TOURNOIS', 'ROUND', 'MD5', 'DESC', 'PRIVEE', 'ARMES'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        LESOFT: { type: 'number' },
        LECOMMENT: { type: 'string' },
        MAX_PLAYERS: { type: 'number' },
        CFT: { type: 'number' },
        CLE_TOURNOIS: { type: 'number' },
        ROUND: { type: 'number' },
        MD5: { type: 'number' },
        DESC: { type: 'number' },
        PRIVEE: { type: 'number' },
        ARMES: { type: 'number' }
      }
    }
  },
  createServer: (app, req, res) => {
    app.serverList.set(app.serverList.length, { name: 'hello', slots: 8, connectedPeers: [] })
  },
  deleteServer: (app, req, res) => {
    app.serverList.delete(req.body.serverId)
  },
  getServerSchema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LESOFT', 'CLE_TOURNOIS', 'ROUND'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        LESOFT: { type: 'number' },
        CLE_TOURNOIS: { type: 'number' },
        ROUND: { type: 'number' }
      }
    }
  },
  getServer: (app, req, res) => {
    app.serverList.get(req.body.serverId)
  },
  joinServer: (app, req, res) => {
    const server = app.serverList.get(req.body.serverId)
    server.connectedPeers.push(req.body.peerId)
  },
  quitServer: (app, req, res) => {
    const server = app.serverList.get(req.body.serverId)
    server.connectedPeers.remove(req.body.peerId)
  }
}
