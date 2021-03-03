
const adminUsersRequested = () => {
	return {
		type: 'FETCH_ADMINALLEYUSERS_LOADING'
	}
};

const adminUsersError = (error) => {
	return {
		type: 'FETCH_ADMINALLEYUSERS_ERROR',
		payload: error
	}
};

const adminUsersLoaded = (users) => {
	return {
		type: 'FETCH_ADMINALLEYUSERS_SUCCESS',
		payload: users
	};
};

const fetchAdminAlleyUsers = (apiService, dispatch) => () => {

	dispatch(adminUsersRequested());
	apiService.getAlleyUsers()
		.then((users) => {
			dispatch(adminUsersLoaded(users))
		})
		.catch((err) => dispatch(adminUsersError(err)));
};

;

export {
	fetchAdminAlleyUsers,
};