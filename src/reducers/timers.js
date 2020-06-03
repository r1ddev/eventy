export const initialState = {
    vipChatTime: 5000,
    sceneTime: 60000,
    bannerTime: 30000,
    notifyTime: 3000,
    updateTimer: 5000,
    updateMessageTimer: 20000,
    updateDialogsTimer: 20000,
    sceneChatTime: 5000,
    conversationsTimer: 6000
}


const timers = (state, action) => {
    if (state === undefined) {
        return initialState
    }
    switch (action.type) {
        case 'SET_TIMERS':

            return {
                ...state,
                vipChatTime: action.payload.vipChatTime,
                sceneTime: action.payload.sceneTime,
                bannerTime: action.payload.bannerTime,
                notifyTime: action.payload.notifyTime,
                updateTimer: action.payload.updateTimer,
                updateMessageTimer: action.payload.updateMessageTimer,
                sceneChatTime: action.payload.sceneTime
            };

        default:
            return state;
    }
};




export default timers;