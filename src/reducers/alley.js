export const initialState = {
	rooms: null,
	user:null,
	maxReserveCount: null,
	loading: false,
	error: false,
}

function openroom(rooms, roomId) {

	let uproomId = rooms.findIndex(m => m.id === roomId);
	let roomOpen = rooms[uproomId].open; 
	rooms[uproomId].open = !roomOpen;

    return rooms; 
}



const alley = (state, action) => {
	if (state === undefined) {
		return initialState
	}
	switch (action.type) {
		case 'FETCH_ROOMS_ALLEY_SUCCESS':
			return {
				...state,
				loading: false,
				error: false,
				rooms: action.payload.rooms,
				user: action.payload.user,
				maxReserveCount: action.payload.maxReserveCount,
			};

		case 'FETCH_ROOMS_ALLEY_LOADING':
			return {
				...state,
				error: false,
				loading: true,
			};

		case 'FETCH_ROOMS_ALLEY_FAILURE':
		return {
			...state,
			error: action.payload,
			loading: false,

		};

		case 'OPEN_ROOMS_ALLEYS':
			console.log(action.payload);
		return {
			...state,
			rooms: openroom(state.rooms, action.payload),
		};

		default:
			return state;
	}
};




export default alley;