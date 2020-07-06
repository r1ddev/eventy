import React from "react";
import LoadingOverlay from "react-loading-overlay";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./profile.scss";
import api from "../../js/api";
import { Link } from "react-router-dom";

import ErrorIndicator from "../../components/error-indicator";

class Registration extends React.Component {
	state = {
		name: "",
		lastName: "",
		avatar: "",
		company: "",
		position: "",
		phone: "",
		email: "",
		soc: "",
		isLoading: false,
		isEditable: false,
	};

	componentDidMount() {
		this.fetchData();

		console.log("history", this.props.history);
		console.log("history", this.props.history.length);
	}

	goBack = () => {
		this.props.history.length == 1
			? window.close()
			: this.props.history.goBack();
	};

	fetchData = async () => {
		if (window.localStorage.token !== undefined) {
			if (this.props.match.params.id) {
				if (this.props.match.params.id === this.props.user.id) {
					this.setState({
						isEditable: true,
					});
				}

				this.setLoading(true);
				api.account
					.getUserDataById(this.props.match.params.id)
					.then((res) => {
						this.setState({
							avatar: res.user.avatar,
							name: res.user.first_name,
							lastName: res.user.last_name,
							company: res.user.company,
							position: res.user.position,
							phone: res.user.phone,
							email: res.user.mail,
							soc: res.user.social_site,
						});

						this.setLoading(false);
					})
					.catch((e) => {
						api.errorHandler(e, {
							public_user_not_found: () => {
								this.setLoading(false);
								ErrorIndicator("Пользователь не найден");
								this.props.history.push("/error");
							},
						});
					});
			} else {
				this.setLoading(true);
				api.account
					.getUserData()
					.then((res) => {
						this.setState({
							avatar: res.user.avatar,
							name: res.user.first_name,
							lastName: res.user.last_name,
							company: res.user.company,
							position: res.user.position,
							phone: res.user.phone,
							email: res.user.mail,
							soc: res.user.social_site,
							isEditable: true,
						});

						this.setLoading(false);
					})
					.catch((e) => {
						api.errorHandler(e, {
							user_not_found: () => {
								this.setLoading(false);
								ErrorIndicator("Пользователь не найден");
								this.props.history.push("/error");
							},
						});
					});
			}
		} else {
			this.props.history.push("/error");
		}
	};

	setLoading = (status) => {
		this.setState({
			isLoading: status,
		});
	};

	render() {
		const {
			isLoading,
			name,
			lastName,
			avatar,
			company,
			position,
			phone,
			email,
			soc,
			isEditable,
		} = this.state;

		let userAvatar = require("../../images/default-avatar.svg");
		if (avatar) {
			userAvatar = api.auth.getAvatarLocation() + avatar;
		}

		return (
			<LoadingOverlay
				active={isLoading}
				spinner
				text="Загрузка"
				className="">
				<div className="bg-light flex-center min-vh-100">
					<div className="container" id="profile">
						<div
							className="back"
							onClick={() => this.goBack()}></div>
						<div className="profile-wrap">
							<div className="row m-0">
								<div className="col-md-5 left p-5">
									<div className="ava p-3 flex-center">
										<img src={userAvatar} alt="" />
									</div>

									<div className="field mt-3">{name}</div>
									<div className="field mt-3">{lastName}</div>
									{isEditable && (
										<div className="btn-wrap">
											<Link
												to="/profile/edit"
												className="flex-center">
												<button
													type="submit"
													className="btn mt-3"
													disabled={isLoading}>
													<img
														src={require("../../images/profile-btn.png")}
													/>
												</button>
											</Link>
										</div>
									)}
								</div>

								{!isLoading && (
									<div className="col-md-7 right p-5">
										<div className="title">
											{position + " в " + company}
										</div>
										<div className="title mt-2">
											Контакты:
										</div>
										<div className="text">{email}</div>
										<div className="text">{phone}</div>
										<div className="text">{soc}</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</LoadingOverlay>
		);
	}
}

const mapStateToProps = ({ user }) => {
	return {
		user,
	};
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(Registration);
