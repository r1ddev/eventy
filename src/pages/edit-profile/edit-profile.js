import React from "react";
import AvatarUploader from "react-avatar-uploader";
import Select from "react-select";
import LoadingOverlay from "react-loading-overlay";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import "./edit-profile.scss";
import api from "../../js/api";

import ErrorIndicator from "../../components/error-indicator";

import { withTranslation } from "react-i18next";

class EditProfile extends React.Component {
  state = {
    avatar: "",
    name: "",
    lastName: "",
    company: "",
    position: "",
    phone: "",
    email: "",
    shareContact: true,
    soc: "",

    isLoading: false,
  };

  submit = (e) => {
    const { name, lastName, company, position, phone, email, shareContact, soc } = this.state;

    this.setLoading(true);

    api.auth
      .registration(name, lastName, company, position, phone, email, shareContact, soc)
      .then((res) => {
        this.setLoading(false);
        this.props.history.push("/desk");
      })
      .catch((e) => {
        this.setLoading(false);

        api.errorHandler(e, {
          user_not_found: () => {
            this.props.history.push("/error");
          },
        });
      });

    e.preventDefault();
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const t = this.props.t;
    this.setLoading(true);

    api.account
      .getUserData()
      .then((res) => {
        this.setState({
          avatar: api.auth.getAvatarLocation() + res.user.avatar,
          name: res.user.first_name || "",
          lastName: res.user.last_name || "",
          company: res.user.company || "",
          position: res.user.position || "",
          phone: res.user.phone || "",
          email: res.user.mail || "",
          shareContact: !!res.user.view_contact,
          soc: res.user.social_site || "",
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
  };

  setLoading = (status) => {
    this.setState({
      isLoading: status,
    });
  };

  render() {
    const t = this.props.t;
    const { avatar, name, lastName, company, position, phone, email, shareContact, isLoading, soc } = this.state;

    return (
      <LoadingOverlay active={isLoading} spinner text={t("Загрузка")} className="">
        <div className="bg-light flex-center min-vh-100">
          <div className="container" id="edit-profile">
            <div className="edit-wrap">
              <form action="" method="post" onSubmit={this.submit}>
                <div className="row m-0">
                  <div className="col-md-5 left p-5">
                    <div className="ava p-3 flex-center">
                      <AvatarUploader
                        customHeaders={api.useAuth().headers}
                        defaultImg={avatar}
                        name="file"
                        size={100}
                        uploadURL={api.proxy + api.host + api.auth.getUploadAvatarUrl()}
                        fileType={"image/png,image/jpeg"}
                      />
                    </div>
                    <div className="field mt-3">
                      <input
                        type="text"
                        className="form-control r1-inp"
                        placeholder={t("Имя")}
                        value={name}
                        onChange={(e) => {
                          this.setState({
                            name: e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="field mt-3">
                      <input
                        type="text"
                        className="form-control r1-inp"
                        placeholder={t("Фамилия")}
                        value={lastName}
                        onChange={(e) => {
                          this.setState({
                            lastName: e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="field mt-3">
                      <input
                        type="text"
                        className="form-control r1-inp"
                        placeholder={t("Название компании")}
                        value={company}
                        onChange={(e) => {
                          this.setState({
                            company: e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="field mt-3">
                      <input
                        type="text"
                        className="form-control r1-inp"
                        placeholder={t("Должность")}
                        value={position}
                        onChange={(e) => {
                          this.setState({
                            position: e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-7 right p-5">
                    <div className="field">
                      <input
                        type="text"
                        className="form-control r1-inp"
                        placeholder={t("Телефон")}
                        value={phone}
                        onChange={(e) => {
                          this.setState({
                            phone: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div className="field mt-4">
                      <input
                        type="email"
                        className="form-control r1-inp"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          this.setState({
                            email: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div className="field mt-4">
                      <input
                        type="text"
                        className="form-control r1-inp"
                        placeholder={t("Ссылка на соц. сеть")}
                        value={soc}
                        onChange={(e) => {
                          this.setState({
                            soc: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div className="field mt-4">
                      <div className="row">
                        <div className="col d-flex align-items-center">{t("Хочу ли я делиться контактами?")}</div>
                        <div className="col-auto">
                          <div className="row">
                            <div className="col">
                              <div
                                className={"radio" + (shareContact ? " radio-selected" : "")}
                                onClick={() => {
                                  this.setState({
                                    shareContact: true,
                                  });
                                }}>
                                да
                              </div>
                            </div>
                            <div className="col">
                              <div
                                className={"radio" + (shareContact ? "" : " radio-selected")}
                                onClick={() => {
                                  this.setState({
                                    shareContact: false,
                                  });
                                }}>
                                нет
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field mt-3 flex-center">
                      <button type="submit" className="btn-submit mt-3" disabled={isLoading}>
                        {t("Изменить профиль")}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
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

export default compose(withTranslation(), withApiService(), connect(mapStateToProps, mapDispatchToProps))(EditProfile);
