const setTimers = (data) => {
	return {
		type: 'SET_TIMERS',
		payload: data
	};
};


const fetchTimers = (apiService, dispatch) => {

	apiService.getTimers()
		.then((data) => {
			dispatch(setTimers(data));
		})
		.catch((err) => { });
};

export {
	fetchTimers,
};