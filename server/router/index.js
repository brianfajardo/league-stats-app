const { accountController, matchesController } = require('../controllers')

module.exports = app => {
  // Developer message
  app.get('/api', (req, res) => {
    res.send({ message: 'Greetings developer!' }).status(200)
  })

  // Account services
  app.post('/api/account', accountController.getSummonerProfile)

  // Match services
  app.post('/api/matches', matchesController.getLatestRankedMatches)
  app.post('/api/matches/wardstats', matchesController.getWardstatsOfMatches)
}
