const chatRequested = () => {
    return {
        type: 'FETCH_GET_MESSAGES_LOADING'
    }
};

const chatLoaded = (messages) => {
    return {
        type: 'FETCH_GET_MESSAGES_SUCCESS',
        payload: messages
    };
};

const chatError = (error) => {
    return {
        type: 'FETCH_GET_MESSAGES_ERROR',
        payload: error
    };
};


const chatUpdated = (messages) => {
    return {
        type: 'FETCH_UPDATE_MESSAGES_SUCCESS',
        payload: messages
    };
};

const addMessage = (message) => {
    return {
        type: 'ADD_LOCAL_MESSAGE',
        payload: message
    };
};


const fetchMessages = (apiService, dispatch) => (chatId) => {
    console.log(chatId, 'ffffff')
    dispatch(chatRequested());
    apiService.getMessages(chatId)
        .then((data) => dispatch(chatLoaded(data.messages)))
        .catch((err) => dispatch(chatError(err)));
};

const updateMessages = (apiService, dispatch) => (chatId, id) => {
    apiService.updateMessages(chatId, id)
        .then((data) => dispatch(chatUpdated(data.messages)))
        .catch((err) => dispatch(chatError(err)));
};

const fetchAddMessage = (apiService, dispatch) => (chatId, message) => {
    dispatch(addMessage(message));
    apiService.postMessage(chatId, message.message)
        .then((data) => { })
        .catch((err) => dispatch(chatError(err)));
};

export {
    fetchMessages,
    updateMessages,
    fetchAddMessage
};