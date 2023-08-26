module.exports = {
  serverVersion: '1.1.1',
  gameVersion: '157',
  userConfigPath: './config.json',
  defaultUserConfig: {
    maxPayloadSize: 1500,
    cypherKey: 66865,
    gamePort: 80,
    chatPort: 3159,
    chatDiscordWebhook: '',
    rateLimitWindow: 900000,
    rateLimitRequests: 100,
    logFile: 'server.log',
    chatHistoryFile: 'chat.log',
    database: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'rsinfra',
      database: 'rs'
    }
  }
}
