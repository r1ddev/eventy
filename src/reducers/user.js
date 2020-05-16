export const initialState = {
    isLogin: window.localStorage.token !== undefined
}

const user = (state, action) => {
    if (state === undefined) {
        return initialState
    }

    switch (action.type) {
        case 'GO':
            return {
                ...state,
            };

        default:
            return state;
    }
};


export default user;