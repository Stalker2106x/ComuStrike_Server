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
          NAME: 'server',
          COMMENTAIRE: 'desc',
          HOST: 'localhost',
          ID: 0
        }
      })
      next()
    }
  }