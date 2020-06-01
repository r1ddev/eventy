
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

	apiService.getPersonalMessages()
		.then((data) => {
			let newMessages = false;
			let newVipMessages = false;

			data.dialogs.map((item) => {
				console.log(item.user_id, item.read)
				if (!item.read) {
					if (item.user_id === 9) {
						newVipMessages = true
					}
					else {
						newMessages = true;
					}
				}
			})

			dispatch(setMessagesNotifications(newMessages));
			dispatch(setVipMessagesNotifications(newVipMessages));

		})
		.catch((err) => { });
};

export {
	checkNotifications,
	setVipMessagesNotifications,
	setMessagesNotifications
};