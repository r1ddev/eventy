import React from "react";
import "./exposure.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Trans, withTranslation } from "react-i18next";
import { setPageFetch } from "../../actions/page-actions";


class Exposure extends React.Component {
  partners = [
    {
      logo: require("../../images/partners/smitstudio.png"),
      background: require("../../images/partners/smitstudio-bg.png"),
      backgroundPosition: "top",
      name: "Smit.Studio",
      desc: (
        <p>
          <Trans t={this.props.t}>expo_smit</Trans>
        </p>
      ),
      link: "https://smit.studio/",
    },
    {
      logo: require("../../images/partners/smitscreen.png"),
      background: require("../../images/partners/smitscreen-bg.png"),
      backgroundPosition: "center",
      name: "Smit.Screen",
      desc: (<Trans t={this.props.t}>expo_smitscreen</Trans>),
      link: "https://smitscreen.ru",
    },
  ];

  render() {
    let partnersList = this.partners.map((partner) => {
      return (
        <a
          style={{
            backgroundImage: `url(${partner.background})`,
            backgroundSize: "cover",
            backgroundPosition: partner.backgroundPosition,
            backgroundRepeat: "norepeat",
          }}
          target="_blank"
          href={partner.link}
          className="card"
          onClick={() => this.props.postUrl(partner.link)}>
          <div className="row head m-0">
            <div className="col-sm-5 logo flex-center">
              <img src={partner.logo} alt="" />
            </div>
          </div>
          <div className="desc">{partner.desc}</div>
        </a>
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
          <div className="card-list">{partnersList}</div>
        </div>
      </div>
    );
  }
}

class ExposureContainer extends React.Component {

  componentDidMount() {
    this.props.setPageFetch('exposure');
  }

  render() {
    return <Exposure {...this.props} />;
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
    setPageFetch: (page) => setPageFetch(apiService, dispatch)(page)
  };
};

export default compose(
  withTranslation(),
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ExposureContainer);
