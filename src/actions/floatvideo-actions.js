
const setVideoFrameVisible = () => {
    return {
        type: 'SET_VIDEOFRAME_VISIBLE',
    };
};

const setVideoFrameHidden = () => {
    return {
        type: 'SET_VIDEOFRAME_HIDDEN',
    };
};

const setVideoFixed = () => {
    return {
        type: 'SET_VIDEO_FIXED',
    };
};

const setVideoFloated = () => {
    return {
        type: 'SET_VIDEO_FLOATED',
    };
};

const setCurrentSceneUrl = (url) => {
    return {
        type: 'SET_CURRENT_SCENE_URL',
        payload: url
    };
};


export {
    setVideoFrameVisible,
    setVideoFrameHidden,
    setVideoFixed,
    setVideoFloated,
    setCurrentSceneUrl,

};