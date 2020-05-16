import axios from 'axios';

const api = {
	proxy: "https://cors-anywhere.herokuapp.com/",
	// proxy: "",
	host: "http://116.203.213.27/api",

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
			console.log("obj[key]", obj[key]);

			fd.append(key, obj[key])
		})

		return fd
	},

	auth: {
		async getUserData() {
			let response = await axios.get(api.proxy + api.host + "/users/get", api.useAuth())
			return response.data
		},
		getUploadAvatarUrl() {
			return "/users/avatar/upload"
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

	errorHandler: (e, errors) => {
		if (!e.response) {
			console.log("Ошибка ынтырнета");
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