const net = require('net')
const xmljs = require('xml-js')
const { workerData, parentPort } = require('node:worker_threads');

const utils = require('./utils')

function textFix (xml) {
  for (const [key, value] of Object.entries(xml)) {
    if (value.hasOwnProperty('_text')) {
      xml[key] = value._text
    } else {
      xml[key] = textFix(value)
    }
  }
  return (xml)
}

class Chat {

  constructor() {
    const self = this
    this.clients = []
    this.config = workerData.config

    parentPort.on("message", async (value) => {
      if (value.exit) {
        for (const client of this.clients) {
          await client.socket.destroy()
        }
        this.server.close(function () {
          self.server.unref()
        });
        process.exit(0)
      }
    })
  }

  broadcast(payload, rawData) {
    if (this.config.chatDiscordWebhook && this.config.chatDiscordWebhook !== '') {
      fetch(this.config.chatDiscordWebhook, {
        method: "POST",
        body: JSON.stringify({ username: payload.racine.pseudo, content: payload.racine.msg }),
      })
    }
    for (const client of this.clients) {
      client.socket.write(rawData+'\0')
    }
  }

  run () {
    const self = this
    // Create a server instance, and chain the listen function to it
    // The function passed to net.createServer() becomes the event handler for the 'connection' event
    // The sock object the callback function receives UNIQUE for each connection
    this.server = net.createServer(function(socket) {
      // We have a connection - a socket object is assigned to the connection automatically
      utils.logger('chat', `Client ${socket.remoteAddress} connected, assigned port ${socket.remotePort}`)
      self.clients.push({ socket, ip: socket.remoteAddress, port: socket.remotePort })

      // Add a 'data' event handler to this instance of socket
      socket.on('data', function(rawData) {
        const payload = textFix(xmljs.xml2js(rawData.toString().replace('\0', ''), { compact: true }))
        if (!payload.hasOwnProperty('who')) {
          utils.logger('chat', `${payload.racine.pseudo}: ${payload.racine.msg}`)
          self.broadcast(payload, rawData)
        }
      });

      // Add a 'close' event handler to this instance of socket
      socket.on('close', function(data) {
        utils.logger('chat', `Client ${socket.remoteAddress} disconnected, with port ${socket.remotePort}`)
        self.clients.splice(self.clients.findIndex((client) => client.socket == socket), 1)
      });

      socket.on('error', function(err) {
        utils.logger('chat', `Client ${socket.remoteAddress} unexpectedly closed, with error ${err}`)
        self.clients.splice(self.clients.findIndex((client) => client.socket == socket), 1)
      })
    }).listen(this.config.chatPort, '127.0.0.1')

    utils.logger('chat', `Chat Server listening on ${this.config.publicIP}:${this.config.chatPort}...`)
  }
}
const chatServer = new Chat()
chatServer.run()