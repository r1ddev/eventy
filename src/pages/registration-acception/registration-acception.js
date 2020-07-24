import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./registration-acception.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from "../../components/error-indicator";

import { withTranslation } from "react-i18next";

class RegistrationAcception extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.history.push("/login");
  };

  render() {
    const t = this.props.t;
    return (
      <div id="registration-acception">
        <form onSubmit={this.onSubmit} className="registration-acception-form">
          <div className="registration-acception-form--wrapper">
            <div className="registration-acception-form--caption">
              {t("Вам на почту пришла ссылка, пожалуйста перейдите по ней, чтобы завершить регистрацию")}
            </div>
          </div>
          <button className="white-button login-btn">{t("ВОЙТИ")}</button>
        </form>
      </div>
    );
  }
}

class RegistrationAcceptionContainer extends React.Component {
  render() {
    return <RegistrationAcception {...this.props} />;
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
)(RegistrationAcceptionContainer);
