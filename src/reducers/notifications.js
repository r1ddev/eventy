export const initialState = {
	newMessages: false,
	newVipMessages: false
}


const notifications = (state, action) => {
	if (state === undefined) {
		return initialState
	}
	switch (action.type) {
		case 'SET_NEW_MESSAGES':
			return {
				...state,
				newMessages: action.payload
			};

		case 'SET_NEW_VIP_MESSAGES':
			return {
				...state,
				newVipMessages: action.payload
			};

		default:
			return state;
	}
};




export default notifications;