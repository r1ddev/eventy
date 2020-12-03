const alleyRoomsRequested = () => {
    return {
        type: 'FETCH_ROOMS_ALLEY_LOADING'
    }
};

const alleyRoomsError = (error) => {
    return {
        type: 'FFETCH_ROOMS_ALLEY_FAILURE',
        payload: error
    }
};

const alleyRoomsLoaded = (rooms, user) => {
    return {
        type: 'FETCH_ROOMS_ALLEY_SUCCESS',
        payload: {rooms,user}
    };
};

const openRooms=(id) => {
    return {
        type: 'OPEN_ROOMS_ALLEYS',
        payload: id
    }
};

const fetchAlleyRooms = (apiService, dispatch) => () => {
    
    dispatch(alleyRoomsRequested());
    apiService.getConversationsAlley()
        .then((data) => {
            

            let rooms = data.rooms.map((item, index) => {

                return {
                    ...item,
                    open: false,
                }
            })

            dispatch(alleyRoomsLoaded(rooms, data.user))
        })
        .catch((err) => dispatch(alleyRoomsError(err)));
};

export {
    fetchAlleyRooms,
    openRooms,
};