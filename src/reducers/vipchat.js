export const initialState = {
    messages: [],
    error: null,
    loading: true,
}

const vipchat = (state, action) => {
    if (state === undefined) {
        return initialState
    }
    switch (action.type) {
        case 'FETCH_GET_VIP_MESSAGES_SUCCESS':

            return {
                ...state,
                error: null,
                loading: false,
                messages: action.payload,
            };

        case 'FETCH_GET_VIP_MESSAGES_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case 'FETCH_GET_VIP_MESSAGES_LOADING':
            return {
                ...state,
                error: null,
                loading: true
            };

        case 'ADD_LOCAL_VIP_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };

        default:
            return state;
    }
};




export default vipchat;