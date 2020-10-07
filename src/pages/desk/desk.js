import React from "react";
import "./desk.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { fetchUser } from "../../actions/user-actions";
import IdeaFirstApiService from "../../services/idea-first-api-service";
import { isMobile } from "react-device-detect";

import { Trans, withTranslation } from "react-i18next";
import LangChecker from "../../components/lang-checker";

class Desk extends React.Component {
    api = new IdeaFirstApiService();

    render() {
        const t = this.props.t;
        return (
            <div id="desk" className="h-100">
                {!isMobile && (
                    <Header className="fixed transparented" data={this.props.user.data} expand>
                        <></>
                    </Header>
                )}
                {isMobile && (
                    <div></div>
                )}
                <section
                    className="first-section"
                    style={{ backgroundImage: `url(${require("../../images/lobby.png")})` }}>
                        {!isMobile && (
                            <div className="lobby-item" style={{backgroundColor: "rgba(255, 0, 0, 0.0)", width: '100%', height:'100%'}}></div>
                        )}

                        <div className="lobby-item main-logo" style={{backgroundColor: "rgba(100, 200, 200, 0.0)", width: '100%', height:'100%'}}>
                            <img alt="" src={require("../../images/icons/lobby/main-logo.svg")} />
                        </div>
                        <div className="lobby-item lang" style={{backgroundColor: "rgba(55, 55, 100, 0.0)", width: '100%', height:'100%'}}>
                            <p className="lobby-text">{t(`Добро пожаловать!`)} </p>
                            <div className='lobby-lang-checker'>
                                <LangChecker />
                            </div>
                        </div>
                        
                        <div className="lobby-item visa" style={{backgroundColor: "rgba(255, 20, 100, 0.0)", width: '100%', height:'100%'}}>
                            <p className="lobby-text">{t(`Главный партнер`)} </p>
                            <div>
                                <img alt="" src={require("../../images/icons/lobby/visa-logo.svg")} />
                            </div>
                        </div>
                        <div className="lobby-item brand-icons1" style={{backgroundColor: "rgba(5, 120, 10, 0.0)", width: '100%', height:'100%'}}>
                           
                            <div>
                                <img alt="" src={require("../../images/icons/lobby/vodafone-logo.svg")} />
                                <span>{t('Инновационный партнер')}</span>
                            </div>
                           
                            <div>
                                <img alt="" src={require("../../images/icons/lobby/cisco-logo.svg")} />
                                <span>{t('Премиум партнер')}</span>
                            </div>
                        
                            <div>
                                <img alt="" src={require("../../images/icons/lobby/erc.svg")} />
                                <span>{t('Премиум партнер')}</span>

                            </div>
                            
                            <div>
                                <img alt="" src={require("../../images/icons/lobby/it-integrator-logo.svg")} />
                                <span>{t('Премиум партнер')}</span>
                            </div>
                            
                        </div>
                        <div className="lobby-item brand-icons2" style={{backgroundColor: "rgba(255, 10, 120, 0.0)", width: '100%', height:'100%'}}>
                            <div>
                            <img alt="" src={require("../../images/icons/lobby/l1.svg")} />
                            </div>
                            <div>
                            <img alt="" src={require("../../images/icons/lobby/l2.svg")} />
                            </div>
                           
                            <div>
                            <img alt="" src={require("../../images/icons/lobby/l3.svg")} />
                            </div>
                           
                            <div>
                            <img alt="" src={require("../../images/icons/lobby/l4.svg")} />
                            </div>
                           
                            <div>
                            <img alt="" src={require("../../images/icons/lobby/l5.svg")} />
                            </div>
                           
                            <div>
                            <img alt="" src={require("../../images/icons/lobby/l6.svg")} />
                            </div>
                           
                            <div>
                            <img alt="" src={require("../../images/icons/lobby/l8.svg")} />
                            </div>
                           
                            <div>
                            <img alt="" src={require("../../images/icons/lobby/l7.svg")} />
                            </div>
                           
                        
                        </div>
                    {/* <img src={require('../../images/lobby.jpg')} alt="img" /> */}
                    {/* <div className="lobby-text"> */}
                        {/* {t(`Добро пожаловать на digital Stand-up Smit.Studio`)} */}
                        {/* <Trans t={t}>Добро пожаловать</Trans> */}
                        {/* <div className='lobby-lang-checker'>
                            <LangChecker />
                        </div> */}
                    {/* </div> */}

                </section>
            </div>
        );
    }
}
class DeskContainer extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        let range = 1;

        if (this.props.user.user) {
            range = this.props.user.user.range;
        }

        return <Desk {...this.props} range={range} />;
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user,
    };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
        fetchUser: fetchUser(apiService, dispatch),
    };
};

export default compose(
    withTranslation(),
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(DeskContainer);
