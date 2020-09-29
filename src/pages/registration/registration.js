import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./registration.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from "../../components/error-indicator";
import Select from "react-select";

import { withTranslation } from "react-i18next";

class Registration extends React.Component {
  state = {
    email: "",
    password: "",
    passwordRepeated: "",
    passwordRepeatedError: false,
    disableForm: false,
    termsAgree: false,
  };

  regOptions = [
    { value: this.props.t("Компания"), label: this.props.t("Компания") },
    { value: this.props.t("Агентство"), label: this.props.t("Агентство") },
  ];

  //   constructor() {
  //     super();
  //     console.log("regOptions", this.regOptions);
  //   }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) {
      this.setState({
        disableForm: true,
      });

      let user = {
        email: this.state.email,
        password: this.state.password,
        re_password: this.state.passwordRepeated,
      };

      // console.log(user);
      this.setState({
        disableForm: false,
      });

      localStorage.removeItem("token");

      this.props
        .addUser(user)
        .then((res) => {
          this.props.history.push("/registration-acception");
        })
        .catch((err) => {
          // console.log(err.message);
          this.setState({
            disableForm: false,
          });
        });
    }
  };
  validate = () => {
    this.setState({
      passwordRepeatedError: !this.validatePasswords(),
    });
    if (this.validatePasswords()) return 1;
    return 0;
  };

  validatePasswords = () => {
    const { password, passwordRepeated } = this.state;
    if (password === passwordRepeated) return 1; //все ок
    return 0; //ошибка
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
      passwordRepeatedError: false,
    });
  };

  onChangePasswordRepeated = (e) => {
    this.setState({
      passwordRepeated: e.target.value,
      passwordRepeatedError: false,
    });
  };

  onTermsAgreeChange = (e) => {
    this.setState({
      termsAgree: e.target.checked
    })
  }

  render() {
    const t = this.props.t;
    const { email, password, passwordRepeated, disableForm, passwordRepeatedError, termsAgree  } = this.state;

    return (
      <div id="registration">
        <form onSubmit={this.onSubmit} className="registration-form">
          <div className="registration-form--wrapper">
            <div className="registration-form--caption">{t("Регистрация")}</div>

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

            <input
              required
              type="password"
              value={passwordRepeated}
              onChange={this.onChangePasswordRepeated}
              className={!passwordRepeatedError ? "password-input" : "password-input error-input"}
              placeholder={t("Подтверждение пароля")}></input>

            {passwordRepeatedError && <p className="error-message">{t("Пароли должны быть одинаковыми")}</p>}

            <div className="custom-control custom-checkbox my-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="terms-agree"
                checked={this.state.termsAgree}
                onChange={this.onTermsAgreeChange}
                required
              />
              <label className="custom-control-label" htmlFor="terms-agree">
                Я согласен с условиями обработки персональных данных
              </label>
            </div>

            <button
              disabled={
                passwordRepeatedError ||
                email == "" ||
                password == "" ||
                passwordRepeated == "" ||
                termsAgree == "" ||
                disableForm
              }
              className="white-button login-btn">
              {t("РЕГИСТРАЦИЯ")}
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

class RegistrationContainer extends React.Component {
  render() {
    return <Registration {...this.props} />;
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
  return {
    addUser: (user) => apiService.addUser(user),
  };
};

export default compose(
  withTranslation(),
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(RegistrationContainer);
