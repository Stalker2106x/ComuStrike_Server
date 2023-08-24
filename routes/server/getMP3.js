// get_mp3 -> getMP3
module.exports = {
    schema: {
      body: {
        type: 'object',
        required: ['LENUM', 'LEPASS', 'IDMP3'],
        properties: {
          LENUM: { type: 'string' },
          LEPASS: { type: 'string' },
          IDMP3: { type: 'number' }
        }
      }
    },
    handler: (app, req, res, next) => {
      res.status(200).send({
        element: {
          NAME: 'lofijazz',
          COMMENTAIRE: 'Enjoy lofijazz from 150!',
          HOST: app.debug ? '127.0.0.1' : app.config.publicIP,
          ID: 0
        }
      })
      next()
    }
  }