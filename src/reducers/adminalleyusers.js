export const initialState = {
    users: null,
    loading: true,
    error: null,
}

const adminalleyusers = (state, action) => {
    if (state === undefined) {
        return initialState
    }

    switch (action.type) {

        case 'FETCH_ADMINALLEYUSERS_SUCCESS':
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: false
            };

        case 'FETCH_ADMINALLEYUSERS_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case 'FETCH_ADMINALLEYUSERS_LOADING':
            return {
                ...state,
                loading: true,
                error: false
            };

        default:
            return state;
    }
};



export default adminalleyusers;