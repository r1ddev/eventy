import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import posed from 'react-pose';
import "./registration-acception.scss";
import { Link } from "react-router-dom";
import ErrorIndicator from "../../components/error-indicator";

import { withTranslation } from "react-i18next";

const Fade = posed.div({
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
})

class RegistrationAcception extends React.Component {

    render() {
        const t = this.props.t;
        return (
            <div id="registration-acception">
                <Fade initialPose="hidden" pose="visible" className="flex-center w-100 h-100">
                    <div className="registration-acception-container">

                        <div className="form-item flex-center mt-0 mb-4">
                            {/* <img className="logo" src={require("../../images/avito_logo_rgb__work.png")} alt=""/> */}
                        </div>

                        <div className="registration-acception-container--caption">
                            На указанный вами при регистрации почтовый адрес пришла ссылка подтверждения. Пожалуйста перейдите по ссылке в письме, чтобы завершить этап регистрации.
                        </div>
                        <div className="form-item flex-center mt-5">
                            <Link className="e-button primary" to="/login">
                                {t("ВОЙТИ")}
                            </Link>
                        </div>
                    </div>
                </Fade>
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
