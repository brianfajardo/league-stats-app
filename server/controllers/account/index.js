const { getAccount } = require('../../helpers')

module.exports = {
  getSummonerProfile(req, res) {
    let account
    const { summonerName, region } = req.body
    const regEx = /^[0-9\\p{L} _\\.]+$/

    // Request parameter checks.
    if (!summonerName || !region) {
      res
        .send({ error: 'Please provide a summoner name and region.' })
        .status(400)
    } else if (regEx.test(summonerName)) {
      res.send({ error: 'Invalid summoner name.' }).status(400)
    }

    // Fetch account object from Riot API with helper.
    summonerObj = getAccount(summonerName, region)

    res.send(summonerObj).status(200)
  }
}
