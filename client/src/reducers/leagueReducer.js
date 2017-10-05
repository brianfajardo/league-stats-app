import { FETCH_STATS, ERROR } from '../constants/actionTypes'

const initialState = {
  error: null,
  recentMatches: null,
  summoner: null
}

const leagueReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATS:
      return {
        ...state,
        recentMatches: action.payload.recentMatches,
        summoner: action.payload.summoner
      }
    case ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default leagueReducer
