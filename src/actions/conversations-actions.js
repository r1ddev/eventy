const conversationsLoading = () => {
	return {
		type: 'FETCH_GET_ROOMS_LOADING'
	}
};

const conversationsLoaded = (rooms) => {
	return {
		type: 'FETCH_GET_ROOMS_SUCCESS',
		payload: rooms
	};
};

const conversationRoomsLoading = (dispatch) => () => {
	dispatch(conversationsLoading());
};

const conversationRoomsLoaded = (dispatch) => (data) => {
	dispatch(conversationsLoaded(data));
};



export {
	conversationRoomsLoading,
	conversationRoomsLoaded
};