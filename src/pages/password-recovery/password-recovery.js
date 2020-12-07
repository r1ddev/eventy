import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./password-recovery.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from "../../components/error-indicator";

import { withTranslation } from "react-i18next";
import SpinnerButton from './../../components/spinner-button/index';

import posed from 'react-pose';

const Fade = posed.div({
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
})

class PasswordRecovery extends React.Component {
    state = {
        email: "",
        isLoading: false
    };

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        this.setState({
            isLoading: true,
        });

        this.props
            .recoverPassword(this.state.email)
            .then((res) => {
                ErrorIndicator("Новый пароль отправлен на указанную почту")
                this.props.history.push("/login");
            })
            .catch((err) => {
                // console.log(err.message);
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const t = this.props.t;
        const { email, isLoading } = this.state;

        const validationPassed = email.length > 0 &&
            !isLoading

        return (
            <div id="password-recovery">
                <Fade initialPose="hidden" pose="visible" className="flex-center w-100 h-100">
                    <form onSubmit={this.onSubmit} className="password-recovery-form">
                        
                        <div className="password-recovery-form--caption">{t("Восстановление пароля")}</div>
                        
                        <div className="form-item">
                            <label htmlFor="">{t("Email")}*</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={this.onChangeEmail}
                                className="email-input"
                                placeholder="E-mail" />
                        </div>

                        <div className="form-item flex-center">
                            <SpinnerButton className="e-button primary" disabled={!validationPassed} spinner={isLoading}>
                                {t("ВОССТАНОВИТЬ")}
                            </SpinnerButton>
                        </div>
                    </form>
                </Fade>
            </div>
        );
    }
}

class PasswordRecoveryContainer extends React.Component {
    render() {
        return <PasswordRecovery {...this.props} />;
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user,
    };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
        recoverPassword: (email) => apiService.recoverPassword(email),
    };
};

export default compose(
    withTranslation(),
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(PasswordRecoveryContainer);
