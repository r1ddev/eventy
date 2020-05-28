export const initialState = {
	rooms: [],
	isLoaded: false,
}


const conversations = (state, action) => {
	if (state === undefined) {
		return initialState
	}
	switch (action.type) {
		case 'FETCH_GET_ROOMS_SUCCESS':
			return {
				...state,
				isLoaded: true,
				rooms: action.payload
			};

		case 'FETCH_GET_ROOMS_LOADING':
			return {
				...state,
				isLoaded: false
			};

		default:
			return state;
	}
};




export default conversations;