import axios from 'axios';

const api = {
	proxy: "https://cors-anywhere.herokuapp.com/",
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
		registration: async (name, lastName, company, position, phone, email, soc, whatSearch, whatOffer, shareContact) => {
			let response = await axios.post(api.proxy + api.host + "/users/get", api.toFormData({
				name: name,
				lastName: lastName,
				company: company,
				position: position,
				phone: phone,
				email: email,
				soc: soc,
				whatSearch: whatSearch,
				whatOffer: whatOffer,
				shareContact: shareContact
			}), api.useAuth())

			return response.data
		}
	},

	errorHandler: (e, errors) => {
		if (!e.response) {
			console.log("Ошибка ынтырнета");
		} else {
			console.log(errors);
			console.log(e.response);

			Object.keys(errors).map(function (key) {
				e.response.data.error = String(e.response.data.error)
				console.log(e.response.data.error, key);

				if (e.response.data.error === key) {
					errors[key]()
				}
			})
		}
	}
}

export default api;