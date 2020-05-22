export const initialState = {
    scenes: [],
    error: null,
    loading: true
}

const scenes = (state, action) => {
    if (state === undefined) {
        return initialState
    }

    switch (action.type) {
        case 'FETCH_SCENES_SUCCESS':
            return {
                ...state,
                error: null,
                loading: false,
                scenes: action.payload
            };

        case 'FETCH_SCENES_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case 'FETCH_SCENES_LOADING':
            return {
                ...state,
                error: null,
                loading: true
            };

        default:
            return state;
    }
};

export default scenes;