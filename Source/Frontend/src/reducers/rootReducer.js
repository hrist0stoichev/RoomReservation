import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import students from './students';
import campaign from './campaign';
import rooms from './rooms';
import invitations from './invitations';
import apartments from './apartments';

export default combineReducers({ auth, alert, students, campaign, rooms, invitations, apartments });
