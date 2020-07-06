import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./password-recovery.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from '../../components/error-indicator'

class PasswordRecovery extends React.Component {

	state = {
		email: '',
		disableForm: false
	}

	onChangeEmail = (e) => {
		this.setState({
			email: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();

		this.setState({
			disableForm: false
		})

		this.props.recoverPassword(this.state.email)
			.then((res) => {
				if (res.status) console.log('Пароль восстановлен');
				this.props.history.push("/login")

			})
			.catch(err => {
				console.log(err.message);
				this.setState({
					disableForm: false
				})
			})
	}

	render() {

		const { email, disableForm } = this.state;

		return (
			<div id="password-recovery">
				<form onSubmit={this.onSubmit} className="password-recovery-form">
					<div className="password-recovery-form--wrapper">
						<div className="password-recovery-form--caption">Восстановление пароля</div>
						<input required type="email" value={email} onChange={this.onChangeEmail} className="email-input" placeholder="e-mail"></input>
					</div>
					<button disabled={email == '' || disableForm} className="white-button login-btn">ВОССТАНОВИТЬ</button>
				</form>
			</div>
		);
	}
}

class PasswordRecoveryContainer extends React.Component {

	render() {

		return (
			<PasswordRecovery {...this.props} />
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
		recoverPassword: (email) => apiService.recoverPassword(email)
	};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(PasswordRecoveryContainer);