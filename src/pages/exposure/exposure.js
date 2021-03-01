import React from "react";
import "./exposure.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Trans, withTranslation } from "react-i18next";
import api from "../../js/api";
import Langs from "../../utils/lang";
import Spinner from './../../components/spinner';
import parse from 'html-react-parser';

class Exposure extends React.Component {

    render() {
        let list = this.props.list.map((partner) => {
            return (
                <Link
                    key={partner.id}
                    to={`exposure/${partner.id}`}
                    className="card">
                    <div className="row head m-0">
                        <div className="col-sm-4 logo flex-center">
                            <img src={partner.logo} alt="" />
                        </div>
                    </div>
                    <div className="desc">
                    {parse(partner.title_text)}
                    </div>
                </Link>
            );
        });

        return (
            <div id="exposure">
                {!isMobile && (
                    <Header className="fixed" data={this.props.user.data}>
                        <></>
                    </Header>
                )}
                <div className="container">
                    <div className="card-list">{list}</div>
                </div>
            </div>
        );
    }
}

class ExposureContainer extends React.Component {
    
    state = {
        exposureList: [],
        loading: true,
    }

    componentDidMount () {
        api.account.exposure.getList().then(res => {
            console.log(Langs.getCurrentLang());
            this.setState({
                exposureList: res[Langs.getCurrentLang()] || [],
                loading: false
            })
            console.log(Langs.getCurrentLang());
        }).catch(e => [
            api.errorHandler(e, {})
        ])
    }
    render() {

        const { exposureList, loading }  = this.state;
        
        return (<div style={{ height: "100%", width: "100%" }}>
            {!loading && <Exposure {...this.props} list={exposureList} />}
            {loading && <Spinner big={1} center/>}
        </div>)
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user,
    };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
        postUrl: (url) => {
            apiService.postUrl(url);
        },
    };
};

export default compose(
    withTranslation(),
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ExposureContainer);
