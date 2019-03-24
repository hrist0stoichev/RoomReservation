import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import students from './students';

export default combineReducers({ auth, alert, students });
