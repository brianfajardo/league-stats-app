const createAxiosInstance = require('../utils/axios')
const processData = require('../utils/processData')
const { RIOT_API_KEY } = require('../../keys')

const router = app => {
  // Developer message
  app.get('/api', (req, res) => {
    res.send({ message: 'Greetings developer!' }).status(200)
  })

  // Get wards and match stats of summoners' 15 most recent ranked matches.
  app.post('/api/wardstats', async (req, res) => {
    const { summonerName, region } = req.body
    const summonerURL = `/summoner/v3/summoners/by-name/${summonerName}`
    const regEx = /^[0-9\\p{L} _\\.]+$/

    if (!summonerName || !region) {
      res
        .send({ error: 'Please provide a summoner name and region.' })
        .status(400)
    } else if (regEx.test(summonerName)) {
      res.send({ error: 'Invalid summoner name.' }).status(400)
    }

    // Set up base URL to regional endpoint.
    const axios = createAxiosInstance(region)

    // Retrieve accountId by summoner name.
    const summoner = await axios.get(summonerURL).then(({ data }) => data)
    const { accountId } = summoner

    // Retrieve gameId's for 15 of the most recent ranked games played on given accountId.
    const matchListsURL = `/match/v3/matchlists/by-account/${accountId}?endIndex=15`
    const { matches } = await axios.get(matchListsURL).then(({ data }) => data)

    // Pick gameId's from matches array and create URL based on gameId.
    const matchesPromises = matches.map(({ gameId }) =>
      axios.get(`/match/v3/matches/${gameId}`).then(({ data }) => data)
    )

    // Retrieve match data of all gameIds.
    const matchData = await Promise.all(matchesPromises)

    // Process data from recent matches.
    const processedData = matchData.map(match => processData(accountId, match))

    res.send({ summoner, recentMatches: processedData }).status(200)
  })
}

module.exports = router
