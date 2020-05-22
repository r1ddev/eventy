export const initialState = {
    isLogin: window.localStorage.token !== undefined,
    data: undefined
}

const user = (state, action) => {
    if (state === undefined) {
        return initialState
    }
    switch (action.type) {
        case 'SET_DATA':
            console.log("SET_DATA");

            return {
                ...state,
                data: action.payload
            };

        default:
            return state;
    }
};


export default user;