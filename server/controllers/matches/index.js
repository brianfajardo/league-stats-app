const {
  getAccount,
  getMatches,
  createAxiosInstance,
  processData
} = require('../../helpers')

module.exports = {
  getLatestRankedMatches(req, res) {
    const { summonerName, region } = req.body

    const summonerObj = getAccount(summonerName, region)
    const { accountId } = summonerObj

    if (!accountId) {
      res.send({ error: 'Summoner not found!' }).status(400)
    }

    // Returns summoners' 15 most recent played ranked matches.
    // NOTE: edge-case exists where summoner has not played any
    // recent ranked games.
    const matches = getMatches(accountId, region)

    if (!matches) {
      res
        .send({ error: 'Summoner has not played any recent ranked matches!' })
        .status(400)
    }

    res.send(matches).status(200)
  },

  async getWardstatsOfMatches(req, res) {
    const { summonerName, region } = req.body
    const axios = createAxiosInstance(region)

    const summoner = await getAccount(summonerName, region)
    const { accountId } = summoner

    if (!accountId) {
      res.send({ error: 'Summoner not found!' }).status(400)
    }

    // Returns summoners' 15 most recent played ranked matches.
    // NOTE: edge-case exists where summoner has not played any
    // recent ranked games.
    const matches = await getMatches(accountId, region)

    if (!matches) {
      res
        .send({ error: 'Summoner has not played any recent ranked matches!' })
        .status(400)
    }

    // Pick gameId's from matches array and create URL based on gameId.
    const matchesPromises = matches.map(({ gameId }) =>
      axios.get(`/match/v3/matches/${gameId}`).then(({ data }) => data)
    )

    // Retrieve match data of all gameIds.
    const matchData = await Promise.all(matchesPromises)

    // Process data from recent matches.
    const processedData = matchData.map(match => processData(accountId, match))

    res.send({ summoner, recentMatches: processedData }).status(200)
  }
}
