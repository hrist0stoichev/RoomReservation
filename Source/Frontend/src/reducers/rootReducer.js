import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import students from './students';
import campaign from './campaign';
import rooms from './rooms';

export default combineReducers({ auth, alert, students, campaign, rooms });
