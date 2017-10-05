import { combineReducers } from 'redux'
import leagueReducer from './leagueReducer'

const rootReducer = combineReducers({
  league: leagueReducer
})

export default rootReducer
