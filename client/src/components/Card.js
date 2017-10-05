import React from 'react'

const Card = ({ match }) => (
  <div className="cards">
    <h2 id="header">
      {match.team.win === 'Win' ? 'Victory' : 'Defeat'}{' '}
      <p>
        KDA:
        {match.individual.kills}/{match.individual.deaths}/{match.individual.assists},
        Lane: {match.individual.lane}, Role: {match.individual.role}
      </p>
    </h2>
    <div className="stats">
      <div className="individual-stats">
        <p>
          <a
            href="https://boards.na.leagueoflegends.com/en/c/developer-corner/4Pv0FcII-vision-score-details"
            target="_blank"
            id="visionScore"
          >
            Vision score:{match.individual.visionScore}
          </a>
        </p>
        <p>Wards placed: {match.individual.wardsPlaced}</p>
        <p>Sightwards bought: {match.individual.sightWardsBoughtInGame}</p>
        <p>Visionwards bought: {match.individual.visionScore}</p>
        <p>
          Longest time alive:{' '}
          {Math.round(match.individual.longestTimeSpentLiving / 60)} mins
        </p>
      </div>
      <div className="team-stats">
        <p>First blood: {match.team.firstBlood ? 'Yes' : 'No'}</p>
        <p>First dragon: {match.team.firstDragon ? 'Yes' : 'No'}</p>
        <p>Dragon kills: {match.team.dragonKills}</p>
        <p>First baron: {match.team.firstBaron ? 'Yes' : 'No'}</p>
        <p>Baron kills: {match.team.baronKills}</p>
      </div>
    </div>
  </div>
)

export default Card
