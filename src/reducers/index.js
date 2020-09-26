import { combineReducers } from 'redux'
import user from './user';
import chat from './chat';
import vipchat from './vipchat';
import scenes from './scenes';
import conversations from './conversations';
import notifications from './notifications';
import timers from './timers';
import floatvideo from './floatvideo';
import adminusers from './adminusers';
import page from './page';


export default combineReducers({
    user,
    chat,
    vipchat,
    scenes,
    conversations,
    notifications,
    timers,
    floatvideo,
    adminusers,
    page,
})