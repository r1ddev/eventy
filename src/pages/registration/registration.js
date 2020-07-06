import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./registration.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from '../../components/error-indicator';
import Select from 'react-select';

const regOptions = [
	{ value: 'Компания', label: 'Компания' },
	{ value: 'Агенство', label: 'Агенство' },
]

class Registration extends React.Component {

	state = {
		email: '',
		password: '',
		passwordRepeated: '',
		company: '',
		regTag: 'Компания',
		passwordRepeatedError: false,
		disableForm: false
	}

	onSubmit = (e) => {
		e.preventDefault();
		if (this.validate()) {
			this.setState({
				disableForm: true
			})

			let user = {
				email: this.state.email,
				password: this.state.password,
				re_password: this.state.passwordRepeated,
				company: this.state.company,
				tag: this.state.regTag
			};

			console.log(user)
			this.setState({
				disableForm: false
			})


			this.props.addUser(user)
				.then((res) => {
					if (res.status) console.log('регистрация успешна');
					this.props.history.push("/registration-acception")
				})
				.catch(err => {
					console.log(err.message);
					this.setState({
						disableForm: false
					})
				})
		}
	}
	validate = () => {

		this.setState({
			passwordRepeatedError: !this.validatePasswords(),
		})
		if (this.validatePasswords()) return 1;
		return 0;
	}

	validatePasswords = () => {
		const { password, passwordRepeated } = this.state;
		if (password === passwordRepeated) return 1; //все ок
		return 0; //ошибка
	}


	onChangeEmail = (e) => {
		this.setState({
			email: e.target.value
		})
	}

	onChangePassword = (e) => {
		this.setState({
			password: e.target.value,
			passwordRepeatedError: false
		})
	}

	onChangePasswordRepeated = (e) => {
		this.setState({
			passwordRepeated: e.target.value,
			passwordRepeatedError: false
		})
	}

	onChangeCompany = (e) => {
		this.setState({
			company: e.target.value
		})
	}

	onChangeRegTag = (e) => {
		this.setState({ regTag: e.value.split(' ') || [] });
	}

	render() {

		const { email, password, passwordRepeated, company, regTag, disableForm, passwordRepeatedError } = this.state;

		return (
			<div id="registration">
				<form onSubmit={this.onSubmit} className="registration-form">
					<div className="registration-form--wrapper">
						<div className="registration-form--caption">Регистрация</div>

						<input
							required
							type="email"
							value={email}
							onChange={this.onChangeEmail}
							className="email-input"
							placeholder="e-mail">
						</input>

						<input
							required
							type="password"
							value={password}
							onChange={this.onChangePassword}
							className="password-input"
							placeholder="Пароль">
						</input>

						<input
							required
							type="password"
							value={passwordRepeated}
							onChange={this.onChangePasswordRepeated}
							className={(!passwordRepeatedError) ? "password-input" : "password-input error-input"}
							placeholder="Подтверждение пароля">
						</input>

						{(passwordRepeatedError) && <p className="error-message">
							Пароли должны быть одинаковыми
						</p>
						}

						<input
							required
							type="text"
							value={company}
							onChange={this.onChangeCompany}
							className="company-input"
							placeholder="Компания">
						</input>




						<Select
							isSearchable={false}
							defaultValue={regOptions[0]}
							options={regOptions}
							onChange={this.onChangeRegTag}
							className="reg-select"
						/>


						<button disabled={passwordRepeatedError || email == '' || password == '' || passwordRepeated == '' || company == '' || disableForm} className="white-button login-btn">РЕГИСТРАЦИЯ</button>
					</div>
					<Link className="passrec-link" to="/password-recovery">забыли пароль?</Link>

				</form>
			</div>
		);
	}
}

class RegistrationContainer extends React.Component {

	render() {

		return (
			<Registration {...this.props} />
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
		addUser: (user) => apiService.addUser(user)
	};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(RegistrationContainer);
