// get_tournois -> getTournamentList
module.exports = {
    schema: {
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
    handler: (app, req, res, next) => {
      res.body = {
        tournois: {
          DESC: "crazy tournoi",
          MAP: "snip_beach",
          ROUND: 0,
          TIMEOUT: 0
        }
      }
      next()
    }
  }