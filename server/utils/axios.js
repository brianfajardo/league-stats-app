const axios = require('axios')
const { RIOT_API_KEY } = require('../../keys')

module.exports = region =>
  axios.create({
    baseURL: `https://${region}.api.riotgames.com/lol`,
    timeout: 1000,
    headers: { 'X-Riot-Token': RIOT_API_KEY }
  })
