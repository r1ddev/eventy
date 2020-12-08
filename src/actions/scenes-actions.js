const scenesRequested = () => {
    return {
        type: 'FETCH_SCENES_LOADING'
    }
};

const scenesError = (error) => {
    return {
        type: 'FETCH_SCENES_ERROR',
        payload: error
    }
};

const scenesLoaded = (messages) => {
    return {
        type: 'FETCH_SCENES_SUCCESS',
        payload: messages
    };
};

const fetchScenes = (apiService, dispatch) => () => {
    dispatch(scenesRequested());
    apiService.getScenes()
        .then((data) => {

            data = data.map((item, index) => {

                return {
                    ...item,
                    generalChatId: index * 3 + 1,
                    sponsorChatId: index * 3 + 2,
                    spikerChatId: index * 3 + 3,
                }
            })

            dispatch(scenesLoaded(data))
        })
        .catch((err) => dispatch(scenesError(err)));
};

export {
    fetchScenes,
};