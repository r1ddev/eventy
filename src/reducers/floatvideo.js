export const initialState = {
    frameIsVisible: false,
    frameIsFloating: false,
    currentSceneUrl: null,
}

const floatvideo = (state, action) => {
    if (state === undefined) {
        return initialState
    }

    switch (action.type) {
        case 'SET_VIDEOFRAME_VISIBLE':
            // console.log('REDUCER')
            return {
                ...state,
                frameIsVisible: true
            };

        case 'SET_VIDEOFRAME_HIDDEN':
            return {
                ...state,
                frameIsVisible: false
            };
        case 'SET_VIDEO_FIXED':
            return {
                ...state,
                frameIsFloating: false
            };
        case 'SET_VIDEO_FLOATED':
            return {
                ...state,
                frameIsFloating: true,
            };
        case 'SET_CURRENT_SCENE_URL':
            return {
                ...state,
                currentSceneUrl: action.payload,
            };
        default:
            return state;
    }
};

export default floatvideo; 