const createAxiosInstance = require('./createAxiosInstance')

module.exports = async (accountId, region) => {
  const returnMatchesQuantity = 15
  const axios = createAxiosInstance(region)

  // Matches queried to Riot API to return 15 most recent ranked matches.
  const matchListsURL = `/match/v3/matchlists/by-account/${accountId}?endIndex=${returnMatchesQuantity}`

  // NOTE: edge-case exists where summoner has not played any recent
  // ranked games. Resolved in an unhandled promise rejection.
  const { matches } = await axios.get(matchListsURL).then(({ data }) => data)

  return matches
}
