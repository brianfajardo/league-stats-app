import axios from 'axios'
import { FETCH_STATS, ERROR } from '../constants/actionTypes'
import { SERVER_URL } from '../../../keys'

export const fetchStats = params => async dispatch => {
  try {
    const { data } = await axios.post(SERVER_URL, params)
    return dispatch({ type: FETCH_STATS, payload: data })
  } catch (err) {
    return dispatch({ type: ERROR, payload: err })
  }
}
