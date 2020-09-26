const setPage = (data) => {
	return {
		type: 'SET_PAGE',
		payload: data
	};
};


const setPageFetch = (apiService, dispatch) => (page) => {
	dispatch(setPage(page));
};



export {
	setPageFetch,
};