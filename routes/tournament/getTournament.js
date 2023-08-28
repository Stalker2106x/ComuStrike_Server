// info_tournois -> getTournament
module.exports = {
  schema: {
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
  handler: (app, req, res, next) => {
    res.status(200).send({
      TEAM: 'jobar',
      DETAIL: 'test',
      EKIP: 1,
      JOUEUR: 0,
      PLAYER: 2,
      CAMP: 0
    })
    next()
  }
}
