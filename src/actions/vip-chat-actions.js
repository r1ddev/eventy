const chatRequested = () => {
    console.log('FETCH_GET_VIP_MESSAGES_LOADING')
    return {
        type: 'FETCH_GET_VIP_MESSAGES_LOADING'
    }
};

const chatLoaded = (messages) => {
    console.log('FETCH_GET_VIP_MESSAGES_SUCCESS')

    return {
        type: 'FETCH_GET_VIP_MESSAGES_SUCCESS',
        payload: messages
    };
};

const chatError = (error) => {
    return {
        type: 'FETCH_GET_VIP_MESSAGES_FAILURE',
        payload: error
    };
};

const addMessage = (message) => {
    return {
        type: 'ADD_LOCAL_VIP_MESSAGE',
        payload: message
    };
};


const fetchMessages = (apiService, dispatch) => (userId) => {
    dispatch(chatRequested());
    apiService.getVipMessages(userId)
        .then((data) => {
            data.messages = data.messages.map(message => {

                return { ...message, message: message.text }
            })
            dispatch(chatLoaded(data.messages))
        })
        .catch((err) => dispatch(chatError(err)));
};

const fetchAddMessage = (apiService, dispatch) => (userId, message) => {
    dispatch(addMessage(message));
    apiService.postVipMessage(userId, message.message)
        .then((data) => { })
        .catch((err) => dispatch(chatError(err)));
};

export {
    fetchMessages,
    fetchAddMessage
};