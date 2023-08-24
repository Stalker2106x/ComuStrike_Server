// set_tournois -> createTournament
module.exports = {
    schema: {
      body: {
        type: 'object',
        required: ['LENUM', 'LEPASS', 'CLE_TOURNOIS', 'ROUND', 'SCORE1', 'SCORE2'],
        properties: {
          LENUM: { type: 'number' },
          LEPASS: { type: 'string' },
          CLE_TOURNOIS: { type: 'number' },
          ROUND: { type: 'number' },
          SCORE1: { type: 'number' },
          SCORE2: { type: 'number' }
        }
      }
    },
    handler: (app, req, res, next) => {
      next()
    }
  }