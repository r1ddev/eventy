import axios from 'axios';

const api = {
	proxy: "https://cors-anywhere.herokuapp.com/",
	host: "https://asdasd.sdasd/",

	useAuth: () => {
		return {
			headers: {
				Authorization: 'Bearer ' + window.localStorage.token
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
		registration: async (name, lastName, company, position, phone, email, soc, whatSearch, whatOffer, shareContact) => {
			let response = await axios.post(api.proxy + api.host + "/users", api.toFormData({
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
			Object.keys(errors).map(function (key) {
				e.response.status = String(e.response.status)
				if (e.response.status === key) {
					errors[key]()
				}
			})
		}
	}
}

export default api;