import {
  SEARCH_SESSIONS_FAILURE,
  SEARCH_SESSIONS_REQUEST,
  SEARCH_SESSIONS_SUCCESS,
} from '../../app/actionTypes';
import axios from 'axios';
import qs from 'query-string';

export function fetchSessions(filters) {
  return async function (dispatch) {
    try {
      dispatch({ type: SEARCH_SESSIONS_REQUEST });
      const url = qs.stringifyUrl({
        url: process.env.REACT_APP_URL,
        query: filters,
      });
      const request = await axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_SECRET}`,
        },
      });
      return dispatch({
        type: SEARCH_SESSIONS_SUCCESS,
        payload: request.data,
      });
    } catch (err) {
      dispatch({
        type: SEARCH_SESSIONS_FAILURE,
        error: 'An error happened',
      });
    }
  };
}
