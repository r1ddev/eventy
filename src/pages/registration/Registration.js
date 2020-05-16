import React from "react";
import AvatarUploader from "react-avatar-uploader";
import Select from "react-select";
import LoadingOverlay from 'react-loading-overlay';

import "./registration.scss";
import api from "../../js/api";

const defaultTags = [
	{
		value: "creator",
		label: "Креатор",
	},
	{
		value: "necreator",
		label: "Не креатор",
	},
]

class Registration extends React.Component {
	state = {
		avatar: "",
		name: "",
		lastName: "",
		company: "",
		position: "",
		phone: "",
		email: "",
		soc: "",
		whatSearch: "",
		whatOffer: "",
		shareContact: true,
		tags: [],

		isLoading: false,
		isEditProfile: false
	};

	submit = (e) => {
		const { name, lastName, company, position, phone, email, soc, whatSearch, whatOffer, shareContact, tags } = this.state;

		this.setLoading(true)

		api.auth
			.registration(
				name,
				lastName,
				company,
				position,
				phone,
				email,
				soc,
				whatSearch,
				whatOffer,
				shareContact,
				JSON.stringify(tags.map(v => v.label.toLowerCase()))
			)
			.then((res) => {
				this.setLoading(false)
				console.log(res);
				this.props.history.push("/desc");
			})
			.catch((e) => {
				this.setLoading(false);

				api.errorHandler(e, {
					"user_not_found": () => {
						this.props.history.push("/error");
					}
				});
			});

		e.preventDefault();
	};

	componentDidMount() {
		this.fetchData()
	}

	// TODO: наверно это надо засунуть в редукс, оставлю эту задачу настоящему профи редукса
	isLogin = () => {
		return window.localStorage.token !== undefined
	}

	fetchData = async () => {
		// if (this.isLogin()) {
		// 	// this.props.history.push("/desc");
		// } else {
		const params = new URLSearchParams(this.props.location.search);
		const token = params.get('token');
		console.log("token", token);

		if (token != null) {
			window.localStorage.token = token
		} else {
			if (this.isLogin()) {
				this.setState({ isEditProfile: true })
			} else {
				this.props.history.push("/error");
			}
		}

		this.setLoading(true);

		api.auth.getUserData().then(res => {
			console.log(res);

			let userTags = JSON.parse(res.user.tags)
			console.log("userTags", userTags);

			userTags = userTags.map(v => {
				return defaultTags.find(t => {
					console.log("t.label.toLowerCase", t.label.toLowerCase());
					console.log("v.toLowerCase", v.toLowerCase());

					return t.label.toLowerCase() == v.toLowerCase()
				})
			})
			console.log("userTags", userTags);


			this.setState({
				avatar: "http://116.203.213.27/images/avatar/" + res.user.avatar,
				name: res.user.first_name,
				lastName: res.user.last_name,
				company: res.user.company,
				position: res.user.position,
				phone: res.user.phone,
				email: res.user.mail,
				soc: res.user.social_site,
				whatSearch: res.user.what_looking,
				whatOffer: res.user.what_offer,
				shareContact: !!res.user.view_contact,
				tags: userTags
			})

			this.setLoading(false);
		}).catch(e => {
			api.errorHandler(e, {
				"user_not_found": () => {
					this.setLoading(false);
					alert("Пользователь не найден")
					this.props.history.push("/error");
				}
			})
		})
	}

	setLoading = (status) => {
		this.setState({
			isLoading: status
		})
	}

	render() {
		const {
			avatar,
			name,
			lastName,
			company,
			position,
			phone,
			email,
			soc,
			whatSearch,
			whatOffer,
			shareContact,
			isLoading,
			isEditProfile,
			tags
		} = this.state;

		return (
			<LoadingOverlay
				active={isLoading}
				spinner
				text='Загрузка'
				className="h-100"
			>
				<div className="bg-light h-100">
					<div className="container h-100 flex-center" id="registration">
						<div className={isEditProfile ? "edit-wrap" : "registration-wrap"}>
							<form action="" method="post" onSubmit={this.submit}>
								<div className="row m-0">
									<div className="col-md-5 left p-5">
										<div className="ava p-3 flex-center">
											<AvatarUploader
												customHeaders={api.useAuth().headers}
												defaultImg={avatar}
												name="file"
												size={100}
												uploadURL={api.proxy + api.host + api.auth.getUploadAvatarUrl()}
												fileType={"image/png"}
											/>
										</div>
										<div className="field mt-3">
											<input
												type="text"
												className="form-control r1-inp"
												placeholder="Имя"
												value={name}
												onChange={(e) => {
													this.setState({
														name: e.target.value,
													});
												}}
												required
											/>
										</div>
										<div className="field mt-3">
											<input
												type="text"
												className="form-control r1-inp"
												placeholder="Фамилия"
												value={lastName}
												onChange={(e) => {
													this.setState({
														lastName: e.target.value,
													});
												}}
												required
											/>
										</div>
										<div className="field mt-3">
											<input
												type="text"
												className="form-control r1-inp"
												placeholder="Компания"
												value={company}
												onChange={(e) => {
													this.setState({
														company: e.target.value,
													});
												}}
												required
											/>
										</div>
										<div className="field mt-3">
											<input
												type="text"
												className="form-control r1-inp"
												placeholder="Должность"
												value={position}
												onChange={(e) => {
													this.setState({
														position: e.target.value,
													});
												}}
												required
											/>
										</div>
										<div className="btn-wrap">
											<button
												type="submit"
												className="btn mt-3"
												disabled={isLoading}>
												{
													isEditProfile &&
													<img
														src={require("../../images/editProfile-btn.png")}
													/>
												}
												{
													!isEditProfile &&
													<img
														src={require("../../images/registration-btn.png")}
													/>
												}
											</button>
										</div>
									</div>

									<div className="col-md-7 right p-5">
										<div className="field">
											<input
												type="text"
												className="form-control r1-inp"
												placeholder="Телефон"
												value={phone}
												onChange={(e) => {
													this.setState({
														phone: e.target.value,
													});
												}}
											/>
										</div>

										<div className="field mt-4">
											<input
												type="email"
												className="form-control r1-inp"
												placeholder="Email"
												value={email}
												onChange={(e) => {
													this.setState({
														email: e.target.value,
													});
												}}
											/>
										</div>

										<div className="field mt-4">
											<input
												type="text"
												className="form-control r1-inp"
												placeholder="Ссылка на соц. сеть"
												value={soc}
												onChange={(e) => {
													this.setState({
														soc: e.target.value,
													});
												}}
											/>
										</div>

										<div className="field mt-4">
											<textarea
												className="form-control r1-inp"
												placeholder="Что ищу"
												value={whatSearch}
												maxLength="150"
												onChange={(e) => {
													this.setState({
														whatSearch: e.target.value,
													});
												}}></textarea>
										</div>

										<div className="field mt-4">
											<textarea
												className="form-control r1-inp"
												placeholder="Что предлагаю"
												value={whatOffer}
												maxLength="150"
												onChange={(e) => {
													this.setState({
														whatOffer: e.target.value,
													});
												}}></textarea>
										</div>

										<div className="field mt-4">
											<Select
												placeholder="Выберите теги"
												isMulti
												options={defaultTags}
												value={tags}
												theme={(theme) => ({
													...theme,
													borderRadius: 10,
													colors: {
														...theme.colors,
														primary: "#f4004d",
													},
												})}
												onChange={(e) => {
													this.setState({ tags: e });
												}}
											/>
										</div>

										<div className="field mt-4">
											<div className="row">
												<div className="col d-flex align-items-center">
													Хочу ли я делиться контактами?
											</div>
												<div className="col-auto">
													<div className="row">
														<div className="col">
															<div
																className={
																	"radio" +
																	(shareContact
																		? " radio-selected"
																		: "")
																}
																onClick={() => {
																	this.setState({
																		shareContact: true,
																	});
																}}>
																да
														</div>
														</div>
														<div className="col">
															<div
																className={
																	"radio" +
																	(shareContact
																		? ""
																		: " radio-selected")
																}
																onClick={() => {
																	this.setState({
																		shareContact: false,
																	});
																}}>
																нет
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</LoadingOverlay>
		);
	}
}

export default Registration;
