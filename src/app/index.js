import { combineReducers } from 'redux';
import { sessions } from '../domain/Sessions/SessionsReducer';

const rootReducer = combineReducers({
  sessions,
});

export default rootReducer;
