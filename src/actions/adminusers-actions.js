
const adminUsersRequested = () => {
	return {
		type: 'FETCH_ADMINUSERS_LOADING'
	}
};

const adminUsersError = (error) => {
	return {
		type: 'FETCH_ADMINUSERS_ERROR',
		payload: error
	}
};

const adminUsersLoaded = (users) => {
	return {
		type: 'FETCH_ADMINUSERS_SUCCESS',
		payload: users
	};
};

const adminUserBanRequested = (userId) => {
	return {
		type: 'FETCH_ADMIN_USER_BAN_LOADING',
		payload: userId

	};
};

const adminUserBanSuccess = (userId, banned) => {
	return {
		type: 'FETCH_ADMIN_USER_BAN_SUCCESS',
		payload: { userId, banned }
	};
};

const adminUserBanError = (error) => {
	return {
		type: 'FETCH_ADMIN_USER_BAN_ERROR',
		payload: error
	};
};
const fetchAdminUsers = (apiService, dispatch) => () => {

	dispatch(adminUsersRequested());
	apiService.getAdminUsers()
		.then((users) => {
			dispatch(adminUsersLoaded(users))
		})
		.catch((err) => dispatch(adminUsersError(err)));
};


const fetchAdminBan = (apiService, dispatch) => (userId, banned) => {
	dispatch(adminUserBanRequested(userId, banned));
	apiService.adminUserBanUser(userId, banned)
		.then(() => dispatch(adminUserBanSuccess(chatId)))
		.catch((error) => dispatch(adminUserBanError(error)));
};

export {
	fetchAdminUsers,
	fetchAdminBan,
};