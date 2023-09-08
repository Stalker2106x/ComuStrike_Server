
function sumObjects (...objs) {
  return objs.reduce((a, b) => {
    for (const k in b) {
      if (Object.prototype.hasOwnProperty.call(b, k)) {
        a[k] = (a[k] || 0) + b[k]
      }
    }
    return a
  }, {})
}

module.exports = {
  getPlayerScore: async function (app, playerId) {
    const scoreData = {
      kills: 0,
      deaths: 0,
      headshots: 0
    }
    const scores = await app.db.models.Scores.findAll({
      where: {
        player_id: playerId
      }
    })
    for (const score of scores) {
      sumObjects(scoreData, {
        kills: score.kills,
        deaths: score.deaths,
        headshots: score.headshots
      })
    }
    return scoreData
  },
  updatePlayerScore: function (app, playerId, scoreData) {
    const dayScore = app.db.models.Scores.findOne({
      where: {
        player_id: playerId,
        date: new Date()
      }
    })
    if (!dayScore) {
      app.db.models.Scores.create({
        ...scoreData,
        date: new Date(),
        player_id: playerId
      })
    } else {
      const sumData = sumObjects(scoreData, {
        kills: dayScore.kills,
        deaths: dayScore.deaths,
        headshots: dayScore.headshots
      })
      dayScore.update(sumData)
    }
  }
}
