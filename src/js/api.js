import axios from "axios";

const api = {
	// proxy: "https://cors-anywhere.herokuapp.com/",
	proxy: "",

	origin: window.location.protocol + "//translation.soldoutconf.ru",
	host: window.location.protocol + "//translation.soldoutconf.ru/api",

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
			specialization, 
			phone,
			email,
			shareContact,
			soc,
			telegram,
			what_looking,
			what_offer,
			town
		) => {
			let response = await axios.put(
				api.proxy + api.host + "/v3/users",
				{
					first_name: name,
					last_name: lastName,
					company: company,
					position: position,
					specialization: specialization,
					phone: phone,
					email: email,
					social_site: soc,
					social_telegram: telegram,
					what_looking: what_looking,
					what_offer: what_offer,
					view_contact: shareContact - 0,
					town: town
				},
				api.useAuth()
			);

			return response.data;
		},
	},
	account: {
		async getUserData() {
			let response = await axios.get(
				api.proxy + api.host + "/users/get",
				api.useAuth()
			);
			return response.data;
		},
		async getUserDataById(user_id) {
			let response = await axios.get(
				api.proxy + api.host + "/users/public/get/" + user_id,
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
					api.proxy + api.host + "/personal/messages",
					api.useAuth()
				);
				return response.data;
			},
			async getMessages(user_id) {
				let response = await axios.get(
					api.proxy + api.host + "/personal/messages/from/" + user_id,
					api.useAuth()
				);
				return response.data;
			},
			async sendMessages(user_id, text) {
				let response = await axios.post(
					api.proxy + api.host + "/personal/messages",
					api.toFormData({
						user_id: user_id,
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
				let response = await axios.post(
					api.proxy + api.host + "/rooms/booking",
					api.toFormData({
						room_id: roomId,
					}),
					api.useAuth()
				);
				return response.data;
			},
		},
	},

	errorHandler: (e, errors) => {
		if (!errors.hasOwnProperty("404")) {
			errors['404'] = () => alert("something сломалось")
		}

		console.log("errors", errors);
		if (!e.response) {
			console.log("Ошибка Интернета");
		} else {
			Object.keys(errors).map(function (key) {
				let error = String(e.response.data.error || "");
				let status = String(e.response.status || "");
			
				if (error === key || status === key) {
					errors[key]();
				}
			});
		}
	},
};

export default api;
