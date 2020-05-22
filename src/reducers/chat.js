export const initialState = {
    messages: [],
    lastApiMessageId: 0,
    error: null,
    loading: true,
    updateLoading: true
}

function updateMessage(messages, lastId, newmes) {
    return [
        ...messages.slice(0, messages.findIndex(m => m.messages_id === lastId) + 1),
        ...newmes
    ]
}

function lastMessagesId(array, defaultValue = 0) {
    if (array.length == 0) {
        return defaultValue
    }
    return array[array.length - 1].messages_id
}

const chat = (state, action) => {
    if (state === undefined) {
        return initialState
    }
    switch (action.type) {
        case 'FETCH_GET_MESSAGES_SUCCESS':

            return {
                ...state,
                error: null,
                loading: false,
                messages: action.payload,
                lastApiMessageId: lastMessagesId(action.payload, 0)
            };

        case 'FETCH_GET_MESSAGES_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case 'FETCH_GET_MESSAGES_LOADING':
            return {
                ...state,
                error: null,
                loading: true
            };

        case 'FETCH_UPDATE_MESSAGES_LOADING':
            return {
                ...state,
                error: null,
                updateLoading: true
            };

        case 'FETCH_UPDATE_MESSAGES_SUCCESS':

            let lastId = state.lastApiMessageId
            return {
                ...state,
                updateLoading: false,
                messages: updateMessage(state.messages, lastId, action.payload),
                lastApiMessageId: lastMessagesId(action.payload, lastId)
            };

        case 'ADD_LOCAL_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };

        default:
            return state;
    }
};




export default chat;