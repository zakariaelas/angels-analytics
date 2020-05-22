import { combineReducers } from 'redux';
import { sessions } from '../../domain/Sessions/SessionsReducer';

//Only one reducer so far, but of course more reducers are added with time.
const rootReducer = combineReducers({
  sessions,
});

export default rootReducer;
