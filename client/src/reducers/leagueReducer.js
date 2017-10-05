import { FETCH_STATS, ERROR, LOADING } from '../constants/actionTypes'

const initialState = {
  error: null,
  recentMatches: null,
  summoner: null,
  loading: false
}

const leagueReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATS:
      return {
        ...state,
        recentMatches: action.payload.recentMatches,
        summoner: action.payload.summoner,
        loading: false
      }
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default leagueReducer
