import { combineReducers } from 'redux'
import user from './user';
import chat from './chat';
import vipchat from './vipchat';
import scenes from './scenes';

export default combineReducers({
    user,
    chat,
    vipchat,
    scenes

})