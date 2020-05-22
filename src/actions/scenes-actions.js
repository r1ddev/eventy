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

const fetchScenes = (apiService, dispatch) => (chatId) => {
    dispatch(scenesRequested());
    apiService.getScenes()
        .then((data) => {

            data = data.streams.map((item, index) => {

                const chatId = [1, 2, 3, 4, 5, 6, 7, 8, 9]

                return {
                    ...item,
                    generalChatId: chatId[index * 3 + 0],
                    sponsorChatId: chatId[index * 3 + 1],
                    spikerChatId: chatId[index * 3 + 2],
                }
            })

            dispatch(scenesLoaded(data))
        })
        .catch((err) => dispatch(scenesError(err)));
};

export {
    fetchScenes,
};