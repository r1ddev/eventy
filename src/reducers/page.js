export const initialState = {
    page: null
}


const page = (state, action) => {
    if (state === undefined) {
        return initialState
    }
    switch (action.type) {
        case 'SET_PAGE':

            return {
                ...state,
                page: action.payload,
            };

        default:
            return state;
    }
};




export default page;