import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import api from "./../../js/api";
import LangChecker from "../lang-checker";

import { Trans, withTranslation } from "react-i18next";

class Header extends React.Component {
  state = {};

  render() {
    const { data, className = "", t } = this.props;

    let userAvatar = require("../../images/default-avatar.svg");
    if (data) {
      if (data.avatar) {
        userAvatar = api.auth.getAvatarLocation() + data.avatar;
      }
    }

    // console.log("this.props.children", this.props.children);

    return (
      <div className={className + " header profile-header"}>
        <div className={this.props.expand ? "container-fluid" : "container"}>
          <div className="row">
            <div className="col d-flex align-items-center">
              <div>
                {/* <img src={require('../../images/avito-logo.svg')}/> */}
              </div>
              {this.props.children}
              
              </div>

            <div className="col-md-auto profile row m-0">
              <div className="col d-flex align-items-center p-0">
                <Link to="/messages/5" className="action-link e-button primary">
                  <Trans t={t}>Написать организаторам</Trans>
                </Link>
              </div>
              <div className="col-auto ava">
              <Link to="/profile">
                  <img src={userAvatar} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Header);

// export default Header;
