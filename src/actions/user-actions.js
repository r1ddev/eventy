const setData = (data) => {
	return {
		type: 'SET_DATA',
		payload: data
	}
};

const setUserData = (userData, dispatch) => {
	dispatch(setData(userData));
};

export {
	setUserData
};