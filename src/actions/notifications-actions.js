
const setVipMessagesNotifications = (notify) => {
	return {
		type: 'SET_NEW_VIP_MESSAGES',
		payload: notify
	};
};

const setMessagesNotifications = (notify) => {

	return {
		type: 'SET_NEW_MESSAGES',
		payload: notify
	};
};


const checkNotifications = (apiService, dispatch) => {

	apiService.getNotify()
		.then((data) => {
			// console.log(data)

			dispatch(setMessagesNotifications(data.new_message));
			dispatch(setVipMessagesNotifications(data.new_message_ass));

		})
		.catch((err) => { });
};

export {
	checkNotifications,
	setVipMessagesNotifications,
	setMessagesNotifications
};