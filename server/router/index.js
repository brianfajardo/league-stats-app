const axios = require('axios')
const { RIOT_API_KEY } = require('../../keys')

const router = app => {
  // Developer message
  app.get('/api', (req, res) => {
    res.send({ message: 'Greetings developer!' }).status(200)
  })

  // Fetch users' warding stats in the 20 most recent ranked matches.
  app.post('/api/wardstats', async (req, res) => {
    let stats // summoner, profile pic
    const { summonerName, region } = req.body
    const URL = `https://${region}.api.riotgames.com/lol`
    const summonerURL = `${URL}/summoner/v3/summoners/by-name/${summonerName}?api_key=${RIOT_API_KEY}`

    if (!summonerName || !region) {
      res
        .send({ error: 'Please provide a summoner name and region.' })
        .status(400)
    }

    // Retrieve accountId by summoner name.
    const summoner = await axios.get(summonerURL).then(({ data }) => data)

    // Retrieve matchlist for ranked games played on given accountId.
    const matchListsURL = `${URL}/match/v3/matchlists/by-account/${summoner.accountId}?endIndex=20&api_key=${RIOT_API_KEY}`
    const { matches } = await axios.get(matchListsURL).then(({ data }) => data)
    const gameIdArray = matches.map(({ gameId }) => gameId)
  })
}

module.exports = router
