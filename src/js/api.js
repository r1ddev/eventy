import axios from 'axios';

const api = {
	// proxy: "https://cors-anywhere.herokuapp.com/",
	proxy: "",
	// origin: "https://onlineshow.marketingforum.com.ua",
	// host: "https://onlineshow.marketingforum.com.ua/api",

	origin: window.location.protocol + "//smit.events",
	host: window.location.protocol + "//smit.events/api",

	// origin: window.location.origin,
	// host: window.location.origin + "/api",

	useAuth: () => {
		return {
			headers: {
				Authorization: window.localStorage.token
			}
		}
	},
	toFormData: (obj) => {
		let fd = new FormData()

		Object.keys(obj).map(key => {
			fd.append(key, obj[key])
		})

		return fd
	},

	auth: {
		getUploadAvatarUrl() {
			return "/users/avatar/upload"
		},
		getAvatarLocation() {
			return api.origin + "/images/avatar/"
		},
		registration: async (name, lastName, company, position, phone, email, soc, whatSearch, whatOffer, shareContact, tags) => {
			let response = await axios.post(api.proxy + api.host + "/users/edit", api.toFormData({
				first_name: name,
				last_name: lastName,
				company: company,
				position: position,
				phone: phone,
				mail: email,
				social_site: soc,
				what_looking: whatSearch,
				what_offer: whatOffer,
				view_contact: (shareContact - 0),
				tags: tags
			}), api.useAuth())

			return response.data
		}
	},
	account: {
		async getUserData() {
			let response = await axios.get(api.proxy + api.host + "/users/get", api.useAuth())
			return response.data
		},
		async getUserDataById(user_id) {
			let response = await axios.get(api.proxy + api.host + "/users/public/get/" + user_id, api.useAuth())
			return response.data
		},
		async getNetworking() {
			let response = await axios.get(api.proxy + api.host + "/users/public/all", api.useAuth())
			return response.data
		},
		messages: {
			async getDialogs() {
				let response = await axios.get(api.proxy + api.host + "/personal/messages", api.useAuth())
				return response.data
			},
			async getMessages(user_id) {
				let response = await axios.get(api.proxy + api.host + "/personal/messages/from/" + user_id, api.useAuth())
				return response.data
			},
			async sendMessages(user_id, text) {
				let response = await axios.post(api.proxy + api.host + "/personal/messages", api.toFormData({
					user_id: user_id,
					text: text
				}), api.useAuth())
				return response.data
			},
		},
		conversations: {
			async getRooms() {
				let response = await axios.get(api.proxy + api.host + "/rooms/all", api.useAuth())
				return response.data
			},
			async updateRoomStatus(roomId) {
				let response = await axios.post(api.proxy + api.host + "/rooms/booking", api.toFormData({
					room_id: roomId,
				}), api.useAuth())
				return response.data
			}
		}
	},

	errorHandler: (e, errors) => {
		if (!e.response) {
			console.log("Ошибка Интернета");
		} else {
			Object.keys(errors).map(function (key) {
				e.response.data.error = String(e.response.data.error)

				if (e.response.data.error === key) {
					errors[key]()
				}
			})
		}
	}
}

export default api;