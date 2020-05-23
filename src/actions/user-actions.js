
//-------------------------------
const setData = (data) => {
	return {
		type: 'SET_DATA',
		payload: data
	}
};
//---------------------------------

const userRequested = () => {
	return {
		type: 'FETCH_USER_INFO_LOADING'
	}
};

const userError = (error) => {
	return {
		type: 'FETCH_USER_INFO_ERROR',
		payload: error
	}
};

const userLoaded = (user) => {
	return {
		type: 'FETCH_USER_INFO_SUCCESS',
		payload: user
	};
};


const setUserData = (userData, dispatch) => {
	dispatch(setData(userData));
};



const fetchUser = (apiService, dispatch) => () => {
	dispatch(userRequested());
	apiService.getUser()
		.then((data) => {
			dispatch(userLoaded(data))
		})
		.catch((err) => dispatch(userError(err)));
};

export {
	setUserData,
	fetchUser
};