import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./registration.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from "../../components/error-indicator";

import { withTranslation } from "react-i18next";
import posed from 'react-pose';
import api from './../../js/api';
import SpinnerButton from "../../components/spinner-button/spinner-button";

const Fade = posed.div({
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
})

class Registration extends React.Component {
    state = {
        first_name: "",
        last_name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        city: "",
        termsAgree: false,
        isLoading: false
    };


    onSubmit = (e) => {
        e.preventDefault();

        let user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            company: this.state.company,
            position: this.state.position,
            phone: this.state.phone,
            email: this.state.email,
            city: this.state.city,
        };

        this.setState({
            isLoading: true,
        });

        localStorage.removeItem("token");

        this.props
            .addUser(user)
            .then((res) => {
                this.props.history.push("/registration-acception");
            })
            .catch((err) => {
                api.errorHandler(err, {
                    'email_already_exists': () => ErrorIndicator("Указанный почтовый адрес уже зарегистрирован")
                })
                this.setState({
                    isLoading: false,
                });
            });
    };

    onChangeFirstName = (e) => {
        this.setState({
            first_name: e.target.value,
        });
    };

    onChangeLastName = (e) => {
        this.setState({
            last_name: e.target.value,
        });
    };

    onChangeCompany = (e) => {
        this.setState({
            company: e.target.value,
        });
    };

    onChangePosition = (e) => {
        this.setState({
            position: e.target.value,
        });
    };

    onChangePhone = (e) => {
        this.setState({
            phone: e.target.value,
        });
    };

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    onChangeCity = (e) => {
        this.setState({
            city: e.target.value,
        });
    };

    onChangeTermsAgree = (e) => {
        this.setState({
            termsAgree: e.target.checked
        })
    }

    render() {
        const t = this.props.t;
        const { first_name, last_name, company, position, phone, email, city, termsAgree, isLoading } = this.state;

        const validationPassed = first_name.length > 0 &&
            last_name.length > 0 &&
            company.length > 0 &&
            position.length > 0 &&
            phone.length > 0 &&
            email.length > 0 &&
            city.length > 0 &&
            !isLoading &&
            termsAgree

        return (
            <div id="registration" className="flex-center min-vh-100">
                <Fade initialPose="hidden" pose="visible" className="flex-center w-100 h-100">
                    <form onSubmit={this.onSubmit} className="registration-form">
                        <div className="registration-form--caption">{t("Регистрация")}</div>

                        <div className="form-item">
                            <label htmlFor="">{t("Имя")}*</label>

                            <input
                                required
                                type="text"
                                value={first_name}
                                onChange={this.onChangeFirstName}
                                placeholder={t("Имя")} />
                        </div>
                        
                        <div className="form-item">
                            <label htmlFor="">{t("Фамилия")}*</label>

                            <input
                                required
                                type="text"
                                value={last_name}
                                onChange={this.onChangeLastName}
                                placeholder={t("Фамилия")} />
                        </div>

                        <div className="form-item">
                            <label htmlFor="">{t("Компания")}*</label>

                            <input
                                required
                                type="text"
                                value={company}
                                onChange={this.onChangeCompany}
                                placeholder={t("Компания")} />
                        </div>

                        <div className="form-item row">
                            <label htmlFor="">{t("Должность")}*</label>

                            <input
                                required
                                type="text"
                                value={position}
                                onChange={this.onChangePosition}
                                placeholder={t("Должность")} />
                        </div>

                        <div className="form-item">
                            <label htmlFor="">{t("Телефон")}*</label>

                            <input
                                required
                                type="text"
                                value={phone}
                                onChange={this.onChangePhone}
                                placeholder={t("+7")} />
                        </div>

                        <div className="form-item">
                            <label htmlFor="">{t("Email")}*</label>

                            <input
                                required
                                type="email"
                                value={email}
                                onChange={this.onChangeEmail}
                                placeholder={t("Email")} />
                        </div>

                        <div className="form-item">
                            <label htmlFor="">{t("Город")}*</label>

                            <input
                                required
                                type="text"
                                value={city}
                                onChange={this.onChangeCity}
                                placeholder={t("Город")} />
                        </div>

                        <div className="form-item">
                            <div className="custom-control custom-checkbox mt-4">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="terms-agree"
                                    checked={termsAgree}
                                    onChange={this.onChangeTermsAgree}
                                    required
                                />
                                <label className="custom-control-label" htmlFor="terms-agree">
                                    {t("Я согласен с условиями обработки персональных данных")}
                                </label>
                            </div>
                        </div>

                        <div className="form-item flex-center">
                            <SpinnerButton className="e-button primary" disabled={!validationPassed} spinner={isLoading}>
                                {t("Зарегистрироваться")}
                            </SpinnerButton>
                        </div>
                        
                        <div className="form-item flex-center">
                            <Link className="form-link" to="/password-recovery">
                                {t("Забыли пароль?")}
                            </Link>
                        </div>
                        
                        <div className="form-item flex-center">
                            <Link className="form-link" to="/login">
                                {t("Уже зарегистрированы?")}
                            </Link>
                        </div>
                    </form>
                </Fade>
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
