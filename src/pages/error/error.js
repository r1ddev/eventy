import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./error.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from '../../components/error-indicator'
import { withTranslation } from "react-i18next";

class Error extends React.Component {

	onSubmit = (e) => {
		e.preventDefault();
		if (window.localStorage.token) {
			this.props.history.push("/desk")
		} else {
			this.props.history.push("/login")
		}
	}

	render() {

		const { t } = this.props;

		return (
			<div id="registration-acception">
				<form onSubmit={this.onSubmit} className="registration-acception-form">
					<div className="registration-acception-form--wrapper">
						<div className="registration-acception-form--caption">
							{t('Потерялись на конференции? Давайте вернёмся к стойке регистрации.')}
						</div>

					</div>
					<button type="submit" onClick={this.onSubmit} className="white-button login-btn">{t('Найтись')}</button>

				</form>
			</div>
		);
	}
}

class ErrorContainer extends React.Component {

	render() {

		return (
			<Error {...this.props} />
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
	withTranslation(),
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(ErrorContainer);
