import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./registration-acception.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from '../../components/error-indicator'

class RegistrationAcception extends React.Component {

	onSubmit = (e) => {
		e.preventDefault();
		this.props.history.push("/login")
	}

	render() {
		return (
			<div id="registration-acception">
				<form onSubmit={this.onSubmit} className="registration-acception-form">
					<div className="registration-acception-form--wrapper">
						<div className="registration-acception-form--caption">
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

class RegistrationAcceptionContainer extends React.Component {

	render() {

		return (
			<RegistrationAcception />
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
)(RegistrationAcceptionContainer);
