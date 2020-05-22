import {
  SEARCH_SESSIONS_FAILURE,
  SEARCH_SESSIONS_REQUEST,
  SEARCH_SESSIONS_SUCCESS,
} from '../../app/actionTypes';
import { createSelector } from 'reselect';

const initialState = {
  isLoading: false,
  error: null,
  active: [],
  completed: [],
};

export const sessions = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SESSIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SEARCH_SESSIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        active: action.payload.meters.active_meters_sessions,
        completed: action.payload.meters.done_meters_session,
      };
    case SEARCH_SESSIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

//Below 2 selectors only act as pure accessors and do not do any "computation".
//So no need to use createSelector from reselect
export const completedSelector = (state) => state.sessions.completed;
export const activeSelector = (state) => state.sessions.active;

//createSelector takes one or more input selectors and passes the result of each input selector to the next one.
//It also determines if the value returned by an input selector has changed between calls (using ===)
//More: https://github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc
//This basically allows us to select completed sessions from the store
//and THEN compute the total amount paid by summing all the records' amount_paid field.
export const totalPaidSelector = createSelector(
  completedSelector,
  (completed) =>
    completed.reduce(
      (acc, session) => acc + parseFloat(session.amount_paid),
      0.0,
    ),
);
