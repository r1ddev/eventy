import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./login.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from "../../components/error-indicator";
import Spinner from "../../components/spinner";

import { withTranslation } from "react-i18next";
import i18next from "i18next";

class Login extends React.Component {
	state = {
		email: "",
		password: "",
		disableForm: false,
		loading: false,
	};

	onChangeEmail = (e) => {
		this.setState({
			email: e.target.value,
		});
	};

	onChangePassword = (e) => {
		this.setState({
			password: e.target.value,
		});
	};

	onLoading = (status) => {
		this.setState({
			loading: status,
		});
	};

	onDisableForm = (status) => {
		this.setState({
			disableForm: status,
		});
	};

	saveToken = (token) => {
		window.localStorage.token = token;
	};

	setLang = (lang) => {
		i18next.changeLanguage(lang);
	};

	onSubmit = (e) => {
		e.preventDefault();

		let t = this.props.t;
		let user = {
			email: this.state.email,
			password: this.state.password,
		};

		this.onLoading(true);
		this.onDisableForm(true);

		this.props
			.autorizate(user)
			.then((res) => {
				this.onLoading(false);
				this.onDisableForm(false);
				this.saveToken(res.token);

				if (res.myfirsttime) {
					this.props.history.push("/profile/edit");
				} else {
					this.props.history.push("/desk");
				}
			})
			.catch((err) => {
				if (err.response.data.error == "user_not_found") {
					ErrorIndicator(t("Пользователя с этими данными не существует"));
				}

				this.onLoading(false);
				this.onDisableForm(false);
			});
	};

	onLoginGuest = () => {
		let t = this.props.t;
		this.props
			.addGuestUser()
			.then((res) => {
				this.saveToken(res.token);
				this.props.history.push("/desk");
			})
			.catch((err) => {
				ErrorIndicator(t("Пользователя с этими данными не существует"));
			});
	};

	render() {
		// console.log("this.props.t", this.props);

		const t = this.props.t;
		const { email, password, disableForm, loading } = this.state;

		return (
			<div id="login">
				<form onSubmit={this.onSubmit} className="login-form">
					<div className="login-form--wrapper">
						<div className="login-form--caption">{t("Авторизация")}</div>
						<input
							required
							type="email"
							value={email}
							onChange={this.onChangeEmail}
							className="email-input"
							placeholder="e-mail"></input>
						<input
							required
							type="password"
							value={password}
							onChange={this.onChangePassword}
							className="password-input"
							placeholder={t("Пароль")}></input>
						<button
							disabled={email == "" || password == "" || disableForm}
							className="white-button login-btn">
							{loading ? <Spinner /> : t("ВОЙТИ")}
						</button>

						<button type="button" className="white-button guest-btn" onClick={this.onLoginGuest}>
							{t("ВОЙТИ КАК ГОСТЬ")}
						</button>

						<Link className="reg-link" to="/registration">
							{t("Зарегистрироваться")}
						</Link>

						<button onClick={() => this.setLang("en")} type="button">
							set Eng
						</button>
						<button onClick={() => this.setLang("ru")} type="button">
							set RU
						</button>
					</div>
					<Link className="passrec-link" to="/password-recovery">
						{t("забыли пароль?")}
					</Link>
				</form>
			</div>
		);
	}
}

class LoginContainer extends React.Component {
	render() {
		return <Login {...this.props} />;
	}
}

const mapStateToProps = ({ user }) => {
	return {
		user,
	};
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {
		autorizate: (user) => apiService.autorizate(user),
		addGuestUser: () => apiService.addGuestUser(),
	};
};

export default compose(
	withTranslation(),
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer);
