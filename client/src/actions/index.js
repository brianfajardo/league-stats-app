import axios from 'axios'
import { FETCH_STATS, ERROR, LOADING } from '../constants/actionTypes'
import { SERVER_URL } from ''

export const fetchStats = params => async dispatch => {
  dispatch({ type: LOADING })
  try {
    console.log('POST request to:', SERVER_URL)
    console.log('JSON to be sent:', params)
    const { data } = await axios.post(SERVER_URL, params)
    return dispatch({ type: FETCH_STATS, payload: data })
  } catch (err) {
    return dispatch({ type: ERROR, payload: err })
  }
}
