import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./login.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from '../../components/error-indicator'
import Spinner from "../../components/spinner";

class Login extends React.Component {

	state = {
		email: '',
		password: '',
		disableForm: false,
		loading: false,

	}

	onChangeEmail = (e) => {
		this.setState({
			email: e.target.value
		})
	}

	onChangePassword = (e) => {
		this.setState({
			password: e.target.value
		})
	}

	onLoading = (status) => {
		this.setState({
			loading: status
		})
	}

	onDisableForm = (status) => {
		this.setState({
			disableForm: status
		})
	}

	saveToken = (token) => {
		window.localStorage.token = token;
	}



	onSubmit = (e) => {
		e.preventDefault();

		let user = {
			email: this.state.email,
			password: this.state.password,
		};


		this.onLoading(true);
		this.onDisableForm(true);

		this.props.autorizate(user)
			.then((res) => {

				this.onLoading(false);
				this.onDisableForm(false);
				this.saveToken(res.Token)

				if (res.myfirsttime) {
					this.props.history.push("/profile/edit")
				} else {
					this.props.history.push("/desk")
				}

			})
			.catch(err => {

				if (err.response.data.error == 'user_not_found') {
					ErrorIndicator('Пользователя с этими данными не существует');
				};


				this.onLoading(false);
				this.onDisableForm(false);
			})
	}

	onLoginGuest = () => {
		this.props.addGuestUser()
			.then((res) => {
				this.saveToken(res.token);
				this.props.history.push("/desk")

			})
			.catch(
				err => {
					ErrorIndicator('Пользователя с этими данными не существует');
				}
			)
	}

	render() {

		const { email, password, disableForm, loading } = this.state;

		return (
			<div id="login">
				<form onSubmit={this.onSubmit} className="login-form">
					<div className="login-form--wrapper">
						<div className="login-form--caption">Авторизация</div>
						<input required type="email" value={email} onChange={this.onChangeEmail} className="email-input" placeholder="e-mail"></input>
						<input required type="password" value={password} onChange={this.onChangePassword} className="password-input" placeholder="Пароль"></input>
						<button disabled={email == '' || password == '' || disableForm} className="white-button login-btn">
							{(loading) ? <Spinner /> : "ВОЙТИ"}
						</button>

						<button className="white-button guest-btn" onClick={this.onLoginGuest}>
							ВОЙТИ КАК ГОСТЬ
						</button>

						<Link className="reg-link" to="/registration">Зарегистрироваться</Link>

					</div>
					<Link className="passrec-link" to="/password-recovery">забыли пароль?</Link>

				</form>
			</div>
		);
	}
}

class LoginContainer extends React.Component {

	render() {

		return (
			<Login {...this.props} />
		);
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
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer);
