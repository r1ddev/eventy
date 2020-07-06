import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./login.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from '../../components/error-indicator'

class Login extends React.Component {

	state = {
		email: '',
		password: ''

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

	onSubmit = (e) => {
		e.preventDefault();
		alert('login');
	}

	render() {

		const { email, password } = this.state;

		return (
			<div id="login">
				<form onSubmit={this.onSubmit} className="login-form">
					<div className="login-form--wrapper">
						<div className="login-form--caption">Авторизация</div>
						<input required type="email" value={email} onChange={this.onChangeEmail} className="email-input" placeholder="e-mail"></input>
						<input required type="password" value={password} onChange={this.onChangePassword} className="password-input" placeholder="Пароль"></input>
						<button disabled={email == '' || password == ''} className="white-button login-btn">ВОЙТИ</button>
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
			<Login />
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
)(LoginContainer);
