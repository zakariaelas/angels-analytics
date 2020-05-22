import {
  SEARCH_SESSIONS_FAILURE,
  SEARCH_SESSIONS_REQUEST,
  SEARCH_SESSIONS_SUCCESS,
} from '../../app/actionTypes';
import axios from 'axios';
import qs from 'query-string';
import { config } from '../../config';

export function fetchSessions(filters) {
  return async function (dispatch) {
    try {
      dispatch({ type: SEARCH_SESSIONS_REQUEST });
      const url = qs.stringifyUrl({
        url: config.url,
        query: filters,
      });
      const request = await axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Basic ${config.credentials}`,
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
