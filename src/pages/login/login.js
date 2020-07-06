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
		password: '',
		disableForm: false,

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

		let user = {
			email: this.state.email,
			password: this.state.password,
		};

		console.log(user)
		this.setState({
			disableForm: false
		})

		this.props.autorizate(user)
			.then((res) => {
				if (res.status) console.log('авторизация успешна');
				console.log(res)
				window.localStorage.token = res.token;
				if (res.myfirsttime) {
					this.props.history.push("/profile/edit")
				} else {
					this.props.history.push("/desk")
				}
			})
			.catch(err => {
				console.log(err.message);
				this.setState({
					disableForm: false
				})
			})
	}

	render() {

		const { email, password, disableForm } = this.state;

		return (
			<div id="login">
				<form onSubmit={this.onSubmit} className="login-form">
					<div className="login-form--wrapper">
						<div className="login-form--caption">Авторизация</div>
						<input required type="email" value={email} onChange={this.onChangeEmail} className="email-input" placeholder="e-mail"></input>
						<input required type="password" value={password} onChange={this.onChangePassword} className="password-input" placeholder="Пароль"></input>
						<button disabled={email == '' || password == '' || disableForm} className="white-button login-btn">ВОЙТИ</button>
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
		autorizate: (user) => apiService.autorizate(user)
	};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer);