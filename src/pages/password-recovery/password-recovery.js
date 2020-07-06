import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./password-recovery.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from '../../components/error-indicator'

class PasswordRecovery extends React.Component {

	onSubmit = (e) => {
		e.preventDefault();
	}

	render() {
		return (
			<div id="password-recovery">
				<form onSubmit={this.onSubmit} className="password-recovery-form">
					<div className="password-recovery-form--wrapper">
						<div className="password-recovery-form--caption">
							Вам на почту пришла ссылка,
							пожалуйста перейдите по ней, чтобы завершить регистрацию
						</div>

					</div>
					<button className="white-button login-btn">ВОЙТИ</button>

				</form>
			</div>
		);
	}
}

class PasswordRecoveryContainer extends React.Component {

	render() {

		return (
			<PasswordRecovery />
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
)(PasswordRecoveryContainer);
