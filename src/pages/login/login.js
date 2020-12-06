import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./login.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from "../../components/error-indicator";

import posed from 'react-pose';

import { withTranslation } from "react-i18next";
import i18next from "i18next";
import LangChecker from "../../components/lang-checker";
import SpinnerButton from './../../components/spinner-button/index';
import api from './../../js/api';

const Fade = posed.div({
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
})

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        disableForm: false,
        isLoading: false,
    };

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    onLoading = (status) => {
        this.setState({
            isLoading: status,
        });
    };

    saveToken = (token) => {
        window.localStorage.token = token;
    };

    onSubmit = (e) => {
        e.preventDefault();

        let t = this.props.t;
        let user = {
            email: this.state.email,
            password: this.state.password,
        };

        this.onLoading(true);

        this.props
            .autorizate(user)
            .then((res) => {
                this.onLoading(false);
                this.saveToken(res.token);

                if (res.myfirsttime) {
                    this.props.history.push("/profile/edit");
                } else {
                    this.props.history.push("/desk");
                }
            })
            .catch((err) => {
                api.errorHandler(err, {
                    "user_not_found": () => ErrorIndicator(t("Пользователя с этими данными не существует"))
                })

                this.onLoading(false);
            });
    };

    onLoginGuest = () => {
        let t = this.props.t;
        this.props
            .addGuestUser()
            .then((res) => {
                this.saveToken(res.token);
                this.props.history.push("/desk");
            })
            .catch((err) => {
                ErrorIndicator(t("Пользователя с этими данными не существует"));
            });
    };

    render() {
        const t = this.props.t;
        const { email, password, isLoading } = this.state;

        const validationPassed = email.length > 0 &&
            password.length > 0 &&
            !isLoading

        return (
            <div id="login" className="flex-center min-vh-100">
                <Fade initialPose="hidden" pose="visible" className="flex-center w-100 h-100">
                    <form onSubmit={this.onSubmit} className="login-form">
                        <div className="login-form--caption">{t("Авторизация")}</div>
                        
                        <div className="form-item">
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={this.onChangeEmail}
                                placeholder="E-mail"></input>
                        </div>
                        
                        <div className="form-item">
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={this.onChangePassword}
                                placeholder={t("Пароль")}></input>
                        </div>

                        {/* <LangChecker /> */}

                        <div className="form-item flex-center">
                            <SpinnerButton className="e-button primary" disabled={!validationPassed} spinner={isLoading}>
                                {t("ВОЙТИ")}
                            </SpinnerButton>
                        </div>

                        <div className="form-item flex-center">
                            <Link className="e-button bordered" to="/registration">
                                {t("Зарегистрироваться")}
                            </Link>
                        </div>
                        
                        {/* <button type="button" className="white-button guest-btn" onClick={this.onLoginGuest}>
                            {t("ВОЙТИ КАК ГОСТЬ")}
                        </button> */}
                        
                        <div className="form-item flex-center">
                            <Link className="form-link" to="/password-recovery">
                                {t("Забыли пароль?")}
                            </Link>
                        </div>
                    </form>
                </Fade>
            </div>
        );
    }
}

class LoginContainer extends React.Component {
    render() {
        return <Login {...this.props} />;
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
    withTranslation(),
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer);
