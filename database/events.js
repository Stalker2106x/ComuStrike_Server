module.exports = {
  ScoreEvent: `CREATE EVENT IF NOT EXISTS ScoreEvent
                ON SCHEDULE
                  EVERY 1 DAY
                  STARTS (CURRENT_DATE + INTERVAL 1 DAY + INTERVAL 4 HOUR)
                DO
                  DELETE FROM Scores WHERE date < CURRENT_DATE - INTERVAL 15 DAY;`
}