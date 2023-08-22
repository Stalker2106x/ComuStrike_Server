module.exports = {
  createTournamentSchema: {
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
  createTournament: (app, req, res) => {

  },
  getTournamentsSchema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LESOFT'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        LESOFT: { type: 'number' }
      }
    }
  },
  getTournaments: (app, req, res) => {

  },
  getTournamentSchema: {
    body: {
      type: 'object',
      required: ['LENUM', 'LEPASS', 'LESOFT', 'ROUND', 'CLE_TOURNOIS'],
      properties: {
        LENUM: { type: 'number' },
        LEPASS: { type: 'string' },
        LESOFT: { type: 'number' },
        ROUND: { type: 'number' },
        CLE_TOURNOIS: { type: 'number' }
      }
    }
  },
  getTournament: (app, req, res) => {

  }
}
