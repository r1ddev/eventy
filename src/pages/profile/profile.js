import React from "react";
import LoadingOverlay from "react-loading-overlay";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./profile.scss";
import api from "../../js/api";
import { Link } from "react-router-dom";

import ErrorIndicator from "../../components/error-indicator";

import { withTranslation } from "react-i18next";

class Registration extends React.Component {
  state = {
    name: "",
    lastName: "",
    avatar: "",
    company: "",
    position: "",
    phone: "",
    email: "",
    soc: "",
    what_looking: "",
    what_offer: "",

    isLoading: false,
    isEditable: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  goBack = () => {
    this.props.history.length == 1 ? window.close() : this.props.history.goBack();
  };

  fetchData = async () => {
    const t = this.props.t;
    if (window.localStorage.token !== undefined) {
      if (this.props.match.params.id) {
        if (this.props.match.params.id === this.props.user.id) {
          this.setState({
            isEditable: true,
          });
        }

        this.setLoading(true);
        api.account
          .getUserDataById(this.props.match.params.id)
          .then((res) => {
            this.setState({
              avatar: res.user.avatar,
              name: res.user.first_name,
              lastName: res.user.last_name,
              company: res.user.company,
              position: res.user.position,
              phone: res.user.phone,
              email: res.user.email,
              soc: res.user.social_site,
              what_looking: res.user.what_looking,
              what_offer: res.user.what_offer,
            });

            this.setLoading(false);
          })
          .catch((e) => {
            api.errorHandler(e, {
              public_user_not_found: () => {
                this.setLoading(false);
                ErrorIndicator(t("Пользователь не найден"));
                this.props.history.push("/error");
              },
            });
          });
      } else {
        this.setLoading(true);
        api.account
          .getUserData()
          .then((res) => {
            this.setState({
              avatar: res.user.avatar,
              name: res.user.first_name || "",
              lastName: res.user.last_name || "",
              company: res.user.company || "",
              position: res.user.position || "",
              phone: res.user.phone || "",
              email: res.user.email || "",
              soc: res.user.social_site || "",
              what_looking: res.user.what_looking || "",
              what_offer: res.user.what_offer || "",
              isEditable: true,
            });

            this.setLoading(false);
          })
          .catch((e) => {
            api.errorHandler(e, {
              user_not_found: () => {
                this.setLoading(false);
                ErrorIndicator(t("Пользователь не найден"));
                this.props.history.push("/error");
              },
            });
          });
      }
    } else {
      this.props.history.push("/error");
    }
  };

  setLoading = (status) => {
    this.setState({
      isLoading: status,
    });
  };

  render() {
    const t = this.props.t;
    const { isLoading, name, lastName, avatar, company, position, phone, email, soc, isEditable, what_looking, what_offer } = this.state;

    let userAvatar = require("../../images/default-avatar.svg");
    if (avatar) {
      userAvatar = api.auth.getAvatarLocation() + avatar;
    }

    return (
      <LoadingOverlay active={isLoading} spinner text={t("Загрузка")} className="">
        <div className="bg-light flex-center min-vh-100">
          <div className="container" id="profile">
            <div className="back" onClick={() => this.goBack()}></div>
            <div className="profile-wrap">
              <div className="row m-0">
                <div className="col-md-5 left p-5">
                  <div className="ava p-3 flex-center">
                    <img src={userAvatar} alt="" />
                  </div>

                  <div className="field mt-3">{name}</div>
                  <div className="field mt-3">{lastName}</div>
                </div>

                {!isLoading && (
                  <div className="col-md-7 right p-5">
                    <div className="title">{position + " " + t("в") + " " + company}</div>
                    <div className="title mt-2">{t("Контакты")}:</div>
                    <div className="text">{email}</div>
                    <div className="text">{phone}</div>
                    <div className="text">{soc}</div>

                    <div className="title mt-2">{t("Что ищу")}:</div>
                    <div className="text">{what_looking}</div>

                    <div className="title mt-2">{t("Что предлагаю")}:</div>
                    <div className="text">{what_offer}</div>

                    {isEditable && (
                      <div className="field mt-3 flex-center">
                        <Link to="/profile/edit" className="btn btn-submit text-center">
                          {t("Изменить профиль")}
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
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

export default compose(withTranslation(), withApiService(), connect(mapStateToProps, mapDispatchToProps))(Registration);
