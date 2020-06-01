import { combineReducers } from 'redux'
import user from './user';
import chat from './chat';
import vipchat from './vipchat';
import scenes from './scenes';
import conversations from './conversations';
import notifications from './notifications'

export default combineReducers({
    user,
    chat,
    vipchat,
    scenes,
    conversations,
    notifications
})