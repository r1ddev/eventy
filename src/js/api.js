import axios from "axios";

const api = {
	// proxy: "https://cors-anywhere.herokuapp.com/",
	proxy: "",
	// origin: "https://onlineshow.marketingforum.com.ua",
	// host: "https://onlineshow.marketingforum.com.ua/api",

	origin: window.location.protocol + "//demo.smit.events",
	host: window.location.protocol + "//api.smit.events/api",

	// origin: window.location.origin,
	// host: window.location.origin + "/api",

	useAuth: () => {
		return {
			headers: {
				Authorization: window.localStorage.token,
			},
		};
	},
	toFormData: (obj) => {
		let fd = new FormData();

		Object.keys(obj).map((key) => {
			fd.append(key, obj[key]);
		});

		return fd;
	},

	auth: {
		getUploadAvatarUrl() {
			return "/users/avatar/upload";
		},
		getAvatarLocation() {
			return api.origin + "/images/avatar/";
		},
		editProfile: async (
			name,
			lastName,
			company,
			position,
			phone,
			email,
			shareContact,
			soc,
			what_looking,
			what_offer
		) => {
			let response = await axios.put(
				api.proxy + api.host + "/v3/users",
				{
					first_name: name,
					last_name: lastName,
					company: company,
					position: position,
					phone: phone,
					email: email,
					social_site: soc,
					what_looking: what_looking,
					what_offer: what_offer,
					view_contact: shareContact - 0,
				},
				api.useAuth()
			);

			return response.data;
		},
	},
	account: {
		async getUserData() {
			let response = await axios.get(
				api.proxy + api.host + "/v3/users/me",
				api.useAuth()
			);
			return response.data;
		},
		async getUserDataById(userId) {
			let response = await axios.get(
				api.proxy + api.host + "/users/public/get/" + userId,
				api.useAuth()
			);
			return response.data;
		},
		async getNetworking() {
			let response = await axios.get(
				api.proxy + api.host + "/users/public/all",
				api.useAuth()
			);
			return response.data;
		},
		messages: {
			async getDialogs() {
				let response = await axios.get(
					api.proxy + api.host + "/v3/dialogs",
					api.useAuth()
				);
				return response.data;
			},
			async getMessages(userId) {
				let response = await axios.get(
					api.proxy + api.host + "/personal/messages/from/" + userId,
					api.useAuth()
				);
				return response.data;
			},
			async sendMessages(userId, text) {
				let response = await axios.post(
					api.proxy + api.host + "/personal/messages",
					api.toFormData({
						user_id: userId,
						text: text,
					}),
					api.useAuth()
				);
				return response.data;
			},
		},
		conversations: {
			async getRooms() {
				let response = await axios.get(
					api.proxy + api.host + "/rooms/all",
					api.useAuth()
				);
				return response.data;
			},
			async updateRoomStatus(roomId) {
				let response = await axios.put(
					api.proxy + api.host + `/v3/conversations/${roomId}/busy`, {},
					api.useAuth()
				);
				return response.data;
			},
		},
		rules: {
			conversations: {
				async kickUser (roomId, userId) {
					return new Promise((resolve, reject) => {
						axios.post(
							`${api.proxy}${api.host}/v3/conversations/${roomId}/rules`,
							{ userId, access: false },
							api.useAuth()
						).then(res => {
							resolve(res.data)
						}).catch(e => {
							reject(e)
						})
					})
					
				}
			}
			
		}
	},

	errorHandler: (e, errors) => {
		if (!errors.hasOwnProperty("404")) {
			errors['404'] = () => alert("something сломалось")
		}

		if (!e.response) {
			console.log("Ошибка Интернета");
		} else {
			Object.keys(errors).map(function (key) {
				let error = String(e.response.data.error)
				let errorCode = String(e.response.status)

				if (error === key || errorCode === key) {
					errors[key]();
				}
			});
		}
	},
};

export default api;
