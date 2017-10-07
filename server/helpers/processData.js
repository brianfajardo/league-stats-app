module.exports = (accountId, match) => {
  const participantId = parseInt(
    match.participantIdentities
      // filter the player by accountId from all participants of the match.
      .filter(({ player }) => player.accountId === accountId)
      // pluck the participantId from the player object.
      .map(({ participantId }) => participantId)
  )

  // Player participantId's 1-5 are part of team 1, while 6-10 are team 2.
  const teamIndex = participantId <= 5 ? 0 : 1
  const team = match.teams[teamIndex]

  const playerStats = match.participants
    .filter(player => player.stats.participantId === participantId)
    .map(player => ({
      championId: player.championId,
      kills: player.stats.kills,
      deaths: player.stats.deaths,
      assists: player.stats.assists,
      longestTimeSpentLiving: player.stats.longestTimeSpentLiving,
      visionScore: player.stats.visionScore,
      visionWardsBoughtInGame: player.stats.visionWardsBoughtInGame,
      sightWardsBoughtInGame: player.stats.sightWardsBoughtInGame,
      wardsPlaced: player.stats.wardsPlaced,
      role: player.timeline.role,
      lane: player.timeline.lane
    }))

  return {
    gameId: match.gameId,
    season: match.seasonId,
    team: {
      win: team.win,
      firstBlood: team.firstBlood,
      firstDragon: team.firstDragon,
      dragonKills: team.dragonKills,
      firstBaron: team.firstBaron,
      baronKills: team.baronKills
    },
    individual: playerStats[0]
  }
}
