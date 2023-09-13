const Joi = require('joi')

const routes = require('../../index')

module.exports = {
  nouveaujoueur: {
    handler: routes.createPlayer.handler,
    params: {
      body: Joi.object({
        LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
        LESOFT: Joi.number().integer().optional().description('The software used for sending the request'),
        LENOM: Joi.string().required().pattern(/^[a-zA-Z0-9._^$]*$/).description('The username to use for creation'),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request'),
        LEMAIL: Joi.string().required().pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).description('The email to use for creation'),
        LEPASS: Joi.string().optional().description('The password to use for creation')
      })
    }
  },
  info_joueur: {
    handler: (app, req, res, next) => {
      req.query.playerId = req.body.LENUM
      routes.getPlayer.handler(app, req, res, next)
    },
    params: {
      body: Joi.object({
        LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player sending the request'),
        LAMAC: Joi.string().required().description('MAC address of the client sending the request'),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
      })
    }
  },
  get_niveau_grade: {
    handler: routes.getRank.handler,
    params: {
      body: Joi.object({
        J: Joi.string().required().description('The ID of the player to get the rank of'),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
      })
    }
  },
  se_faire_tuer: {
    handler: (app, req, res, next) => {
      req.query.LENUM = req.body.V
      routes.killed.handler(app, req, res, next)
    },
    params: {
      body: Joi.object({
        V: Joi.number().integer().required().description('The ID of the player that got killed'),
        P: Joi.string().required().description('The username of the player that got killed'),
        T: Joi.number().integer().required().description('The ID of the player that did the kill'),
        PV: Joi.number().integer().required().description('Unknown use'),
        PT: Joi.number().integer().required().description('Unknown use'),
        HS: Joi.number().integer().required().description('Equals to 1 if the kill was a headshot, else 0'),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player to get ID for')
      })
    }
  },
  get_id: {
    handler: routes.getPlayerId.handler,
    params: {
      body: Joi.object({
        LELOGIN: Joi.string().min(2).optional().description('The username of the player to get ID for'),
        LEPASS: Joi.string().optional().description('The password of the player to get ID for'),
        LESOFT: Joi.number().integer().optional().description('The software used for sending the request'),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
      })
    }
  },
  set_tournois: {
    handler: routes.createTournament.handler
  },
  get_mp3: {
    handler: routes.getMP3List.handler,
    params: {
      body: Joi.object({
        LENUM: Joi.string().required().description('The ID of the player sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player sending the request'),
        LESOFT: Joi.number().integer().optional().description('The software used for sending the request'),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
      })
    }
  },
  set_mp3: {
    handler: routes.setMP3.handler
  },
  get_map: {
    handler: routes.getMapList.handler,
    params: {
      body: Joi.object({
        LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
        LESOFT: Joi.number().integer().optional().description('The software used for sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player sending the request'),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
      })
    }
  },
  set_server: {
    handler: routes.createServer.handler,
    params: {
      body: Joi.object({
        LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player sending the request'),
        LESOFT: Joi.number().integer().optional().description('The software used for sending the request'),
        LECOMMENT: Joi.string().required(),
        MAX_PLAYERS: Joi.number().integer().required(),
        CFT: Joi.number().integer().required(),
        CLE_TOURNOIS: Joi.number().integer().required(),
        ROUND: Joi.number().integer().required(),
        MD5: Joi.string().required(),
        DESC: Joi.string().allow('').required(),
        PRIVEE: Joi.number().integer().required(),
        ARMES: Joi.string().required(),
        THIRD: Joi.number().integer().required(),
        GDMG: Joi.number().integer().required(),
        ANTILAG: Joi.number().integer().required(),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
      })
    }
  },
  get_server: {
    handler: routes.getServerList.handler,
    params: {
      body: Joi.object({
        LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player sending the request'),
        LESOFT: Joi.number().integer().optional().description('The software used for sending the request'),
        CLE_TOURNOIS: Joi.number().integer().default(0).optional().description('Unknown use'),
        ROUND: Joi.number().integer().default(0).optional().description('Unknown use'),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
      })
    }
  },
  delete_server: {
    handler: (app, req, res, next) => {
      req.query.serverId = req.body.CLE_SERVEUR
      routes.deleteServer.handler(app, req, res, next)
    },
    params: {
      body: Joi.object({
        LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player sending the request'),
        CLE_SERVEUR: Joi.number().integer().required().description('The ID of the server to delete'),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
      })
    }
  },
  joinserver: {
    handler: (app, req, res, next) => {
      req.query.serverId = req.body.SERVERID
      routes.joinServer.handler(app, req, res, next)
    },
    params: {
      body: Joi.object({
        LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player sending the request'),
        LESOFT: Joi.number().integer().optional().description('The software used for sending the request'),
        SERVERID: Joi.number().integer().required().description('The ID of the server to join'),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
      })
    }
  },
  quitter_server: {
    handler: (app, req, res, next) => {
      req.query.serverId = req.body.LAPARTIE
      routes.quitServer.handler(app, req, res, next)
    },
    params: {
      query: Joi.object({
        serverId: Joi.number().integer().optional()
      }),
      body: Joi.object({
        LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player sending the request'),
        LESCORE: Joi.number().integer().required().description('The score the user had just before disconnecting'),
        LAPARTIE: Joi.number().integer().required().description('The ID of the server to quit'),
        KILLER: Joi.number().integer().required().description('The amount of kills the player disconnecting did'),
        KILLED: Joi.number().integer().required().description('The amount of deaths the player disconnecting had'),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request')
      })
    }
  },
  get_tournois: {
    handler: routes.getTournamentList.handler,
    params: {
      body: Joi.object({
        LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player sending the request'),
        LESOFT: Joi.number().integer().optional().description('The software used for sending the request')
      })
    }
  },
  info_tournois: {
    handler: routes.getTournament.handler,
    params: {
      body: Joi.object({
        LENUM: Joi.number().integer().optional().description('The ID of the player sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player sending the request'),
        LESOFT: Joi.number().integer().optional().description('The software used for sending the request'),
        ROUND: Joi.number().integer().required(),
        CLE_TOURNOIS: Joi.number().integer().required()
      })
    }
  },
  set_objet: {
    handler: routes.placeObject.handler,
    params: {
      body: Joi.object({
        LENUM: Joi.string().required().description('The ID of the player sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player sending the request'),
        LAMAP: Joi.string().description('Unknown use'),
        'P[x]': Joi.number().integer().description('Unknown use'),
        'P[y]': Joi.number().integer().description('Unknown use'),
        'P[z]': Joi.number().integer().description('Unknown use'),
        'D[x]': Joi.number().integer().description('Unknown use'),
        'D[y]': Joi.number().integer().description('Unknown use'),
        'D[z]': Joi.number().integer().description('Unknown use'),
        'U[x]': Joi.number().integer().description('Unknown use'),
        'U[y]': Joi.number().integer().description('Unknown use'),
        'U[z]': Joi.number().integer().description('Unknown use'),
        T: Joi.number().integer().description('Unknown use'),
        M: Joi.string().description('Unknown use')
      })
    }
  },
  get_objet: {
    handler: routes.getObject.handler,
    params: {
      body: Joi.object({
        LENUM: Joi.string().required().description('The ID of the player sending the request'),
        LEPASS: Joi.string().optional().description('The password of the player sending the request'),
        LAVERSION: Joi.string().optional().description('The version of the software used for sending the request'),
        LAMAP: Joi.string().description('Unknown use')
      })
    }
  }
}
