
// get_tournois -> getTournamentList
module.exports = {
  description: 'Gets all active tournaments',
  method: 'get',
  route: '/v1/tournaments',
  params: {
    body: null
  },
  responses: {
    200: null
  },
  handler: (app, req, res, next) => {
    res.status(200).send({
      tournois: {
        DESC: 'crazy tournoi',
        MAP: 'snip_beach',
        ROUND: 0,
        TIMEOUT: 0
      }
    })
    next()
  }
}
