export const initialState = {
    isLogin: window.localStorage.token !== undefined,
    data: undefined,
    user: null,
    loading: true,
    error: null
}

const user = (state, action) => {
    if (state === undefined) {
        return initialState
    }
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload
            };

        case 'FETCH_USER_INFO_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: false
            };

        case 'FETCH_USER_INFO_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case 'FETCH_USER_INFO_LOADING':
            return {
                ...state,
                loading: true,
                error: false
            };

        default:
            return state;
    }
};


export default user;