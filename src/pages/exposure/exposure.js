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
      background: require("../../images/partners/so_nethouse.png"),
      backgroundPosition: "top",
      link: "https://events.nethouse.ru/?p=soldout",
    },{
      background: require("../../images/partners/so_infobraz.jpg"),
      backgroundPosition: "center",
      link: "https://infoobraz.ru/",
    },{
      background: require("../../images/partners/so_topmoderator.png"),
      backgroundPosition: "center",
      link: "https://topmoderator.ru/?utm_source=soldout&utm_medium=post_iventologiya&utm_campaign=promotion",
    },{
      background: require("../../images/partners/so_infoblock_Verspeak.png"),
      backgroundPosition: "center",
      link: "https://verspeak.com/ru/",
    },{
      background: require("../../images/partners/so_Funky_Games.jpg"),
      backgroundPosition: "center",
      link: "https://funkygames.ru/",
    },{
      background: require("../../images/partners/so_eLama_партнеры_SMIT.png"),
      backgroundPosition: "center",
      link: "https://try.elama.ru/product?utm_source=soldout_online&utm_medium=pr&utm_campaign=sait_soldout_online",
    },{
      background: require("../../images/partners/so_gifts.png"),
      backgroundPosition: "center",
      link: "https://gifts.ru/pro/event?utm_source=soldout&utm_medium=banner&utm_campaign=010_for_event&utm_content=info",
    },{
      background: require("../../images/partners/smitstudio.png"),
      backgroundPosition: "center",
      link: "https://smit.studio/",
    },{
      background: require("../../images/partners/so_Banner_Surovogo.png"),
      backgroundPosition: "center",
      link: "https://smmconfa.ru/?utm_source=soldout&utm_medium=broadcast",
    },{
      background: require("../../images/partners/so_Eventology_banner.png"),
      backgroundPosition: "center",
      link: "https://event-manager.eventologia.ru/?utm_source=soldout&utm_medium=broadcast",
    },{
      background: require("../../images/partners/so_po_promokodu_soldaut_2.png"),
      backgroundPosition: "center",
      link: "https://smm2020.tochkadostupa.pro/?utm_source=soldout&utm_medium=broadcast",
    },{
      background: require("../../images/partners/so_po_promokodu_soldaut_1.png"),
      backgroundPosition: "center",
      link: "https://partner.markevent.ru/?utm_source=soldout&utm_medium=broadcast",
    },{
      background: require("../../images/partners/so_488_355_VShT.png"),
      backgroundPosition: "center",
      link: "http://targeting.school/?utm_source=soldout&utm_medium=broadcast",
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
          {/* <div className="row head m-0">
            <div className="col-sm-5 logo flex-center">
              <img src={partner.logo} alt="" />
            </div>
          </div> */}
          {/* <div className="desc">{partner.desc}</div> */}
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
