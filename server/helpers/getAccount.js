const createAxiosInstance = require('./createAxiosInstance')

module.exports = async (summonerName, region) => {
  // Create an axios instance set up to users' regional endpoint.
  const axios = createAxiosInstance(region)
  const summonerURL = `/summoner/v3/summoners/by-name/${summonerName}`

  // Request returns an object containing summoner profile and Riot accountId.
  const summonerObj = await axios.get(summonerURL).then(({ data }) => data)

  return summonerObj
}
