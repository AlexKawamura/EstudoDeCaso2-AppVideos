import { combineReducers } from 'redux';
import userReducers from './userReducer';

export default combineReducers({
  user: userReducers,
});
