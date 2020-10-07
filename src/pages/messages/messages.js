import React from "react";
import "./messages.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import api from "./../../js/api";
import ScenesChat from "./../../components/scenes-chat/scenes-chat";
import Header from "../../components/header";
import IdleTimer from "react-idle-timer";
import { setMessagesNotifications } from "../../actions/notifications-actions";
import { isMobile } from "react-device-detect";

import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import MessagesMobile from "../../components/messages-mobile";
import DialogMobile from "../dialog-mobile/dialog-mobile";

import { withTranslation } from "react-i18next";

import Translit from "../../components/translit";

class Messages extends React.Component {
  scrollToBottom = (upd = true) => {
    this.refs.scenesChat.onUpdate(true);
  };

  render() {
    const {
      users,
      activeUser,
      messages,
      loading: messagesIsLoading,
      user: data,
      onActive,
      onIdle,
      setUser,
      sendMessage,
      t,
    } = this.props;

    var isChatAvailable = Object.entries(activeUser).length > 0;

    const isContactAvailable =
      activeUser.email ||
      activeUser.phone ||
      activeUser.social_site ||
      activeUser.what_offer ||
      activeUser.what_looking ||
      false;
    
    // console.log(users);

    return (
      <div id="messages">
        <IdleTimer element={document} onActive={onActive} onIdle={onIdle} timeout={1000 * 30} />

        {!isMobile && (
          <Header data={data.data}>
            <></>
          </Header>
        )}

        <div className="container-fluid">
          <div className="row h-100">
            <div className="col-md-8 mes-padding">
              <div className="row h-100 mes-padding-left m-0">
                <div className="col-5 p-0 users-list-wrap">
                  <div className="users-list">
                    {users.map((user, index) => {
                      return (
                        <Link
                          to={"/messages/" + user.id}
                          className="user"
                          key={index}
                          onClick={() => {
                            setUser(user.id);
                          }}>
                          <div>
                            <div className="row align-items-center">
                              <div className="col-auto">
                                <div className="ava">
                                  {!user.is_read && <div className="unread"></div>}
                                  <img src={api.auth.getAvatarLocation() + user.avatar} />
                                </div>
                              </div>
                              <div className="col p-0 name">
                                <Translit value={user.first_name + " " + user.last_name} />
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="col-7 p-0 dialog-wrap">
                  <div className="dialog">
                    {isChatAvailable && (
                      <ScenesChat
                        t={t}
                        loading={messagesIsLoading}
                        messages={messages}
                        sendMessage={sendMessage}
                        isPrivate={true}
                        ref="scenesChat"
                      />
                    )}
                    {!isChatAvailable && (
                      <div className="flex-center h-100 text-black-50 text-center">
                        {t("Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 cards">
              <div className="info p-3">
                {isChatAvailable && (
                  <>
                    <div className="card flex-center p-4">
                      <div className="ava">
                        <Link to={"/profile/" + activeUser.id}>
                          <img src={api.auth.getAvatarLocation() + activeUser.avatar} />
                        </Link>
                      </div>
                      <div className="title">
                        <Translit value={activeUser.first_name + " " + activeUser.last_name} />
                      </div>
                      <div className="desc">{activeUser.position + " " + t("в") + " " + activeUser.company}</div>
                    </div>

                    {isContactAvailable && (
                      <div className="card card-contacts flex-center p-4 px-5 mt-3">
                        <div className="title">{t("Контакты")}:</div>
                        <div className="desc">{activeUser.mail}</div>
                        <div className="desc">{activeUser.phone}</div>
                        <div className="desc">{activeUser.social_site}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class MessagesContainer extends React.Component {
  state = {
    users: [],
    activeUser: {},
    messages: [],
    loading: true,
    newUser: undefined,
  };

  isEncrypted = false;

  updateTimer = 5000;
  updateDialogsTimer = 20000;

  timeoutMessages = undefined;
  timeoutDialogs = undefined;

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (setUser = true) => {
    api.account.messages
      .getDialogs()
      .then((res) => {
        res = res.filter((dialog) => {
          return dialog.range != 6;
        });
        this.setState(
          {
            users: res,
          },
          () => {
            if (setUser) {
              if (this.props.match.params.id) {
                this.setUser(this.props.match.params.id);
              }
            }
          }
        );
      })
      .catch((e) => console.log(e));

    clearTimeout(this.timeout);
    this.timeoutDialogs = setTimeout(() => {
      this.fetchData(false);
    }, this.updateDialogsTimer);
  };

  setUser = async (userId) => {
    this.setState({
      loading: true,
    });
    let activeUser = this.state.users.find((u) => u.id == userId);

    let unreadCount = this.state.users.filter((u) => u.is_read == 0).length;

    if (unreadCount > 0) {
      this.props.setMessagesNotifications(false);
    }

    if (activeUser !== undefined) {
      activeUser.is_read = 1;
      await this.asetState({
        activeUser: activeUser,
      });
    } else {
      let userData = await api.account.getUserDataById(userId);

      let newUserData = {
        first_name: userData.user.first_name,
        last_name: userData.user.last_name,
        avatar: userData.user.avatar,
        id: userId,
        company: userData.user.company,
        position: userData.user.position,
        // email: userData.user.email || "",
        // phone: userData.user.phone || "",
        // social_site: userData.user.social_site || "",
        // what_looking: userData.user.what_looking || "",
        // what_offer: userData.user.what_offer || "",
      };

      await this.asetState({
        activeUser: newUserData,
      });

      // let isNewUserInList = this.state.users.filter(u => {
      // 	return u.user_id === this.props.match.params.id
      // }).length > 0

      this.setState({
        newUser: { ...newUserData, is_read: true },
      });
    }

    await this.fetchMessages(userId);

    this.setState({
      loading: false,
    });

    this.refs.messages.scrollToBottom(true);
  };

  asetState = (newState) => {
    return new Promise((resolve, reject) => {
      this.setState(newState, () => resolve());
    });
  };

  fetchMessages = async (userId) => {
    let messages = await api.account.messages.getMessages(userId);
    let isEncrypted = false;

    messages.messages = messages.messages.map((message) => {
      if (message.text.substr(0, 10) == "U2FsdGVkX1" && window.localStorage.ckey != undefined) {
        isEncrypted = true;
        try {
          let dec = AES.decrypt(message.text, window.localStorage.ckey || "");
          message.text = dec.toString(CryptoJS.enc.Utf8);
        } catch (error) { }
      }
      return { ...message, message: message.text };
    });

    await this.asetState({
      messages: messages.messages,
    });
    this.isEncrypted = isEncrypted;

    this.refs.messages.scrollToBottom(false);

    clearTimeout(this.timeoutMessages);
    this.timeoutMessages = setTimeout(() => {
      this.fetchMessages(userId);
    }, this.updateTimer);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.timers !== this.props.timers) {
      this.updateTimer = this.props.timers.updateTimer;
      this.updateDialogsTimer = this.props.timers.updateDialogsTimer;
    }

    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setUser(this.props.match.params.id);
    }
  }

  sendMessage = (message) => {
    let encMessage = "";

    if (this.isEncrypted && window.localStorage.ckey != undefined) {
      let enc = AES.encrypt(message, window.localStorage.ckey || "");
      encMessage = enc.toString();
    }

    api.account.messages
      .sendMessages(this.state.activeUser.user_id, encMessage || message)
      .then((res) => { })
      .catch((e) => console.log(e));

    let m = this.state.messages;
    m.push({
      first_name: this.props.user.data.first_name,
      last_name: this.props.user.data.last_name,
      range: this.props.user.data.range,
      message: message,
      avatar: this.props.user.data.avatar,
    });

    this.setState(
      {
        messages: m,
      },
      () => {
        this.refs.messages.scrollToBottom(true);
      }
    );
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutDialogs);
    clearTimeout(this.timeoutMessages);
  }

  onActive = async (e) => {
    this.updateTimer = this.props.timers.updateTimer;
    this.updateDialogsTimer = this.props.timers.updateDialogsTimer;
  };

  onIdle = (e) => {
    this.updateTimer = 80000;
    this.updateDialogsTimer = 80000;
  };

  render() {
    let users = [...this.state.users];

    if (this.state.newUser !== undefined) {
      users.push(this.state.newUser);
    }

    const t = this.props.t;

    return (
      <>
        {isMobile && (
          <>
            {this.props.match.params.id && (
              <DialogMobile
                t={t}
                ref="messages"
                activeUser={this.state.activeUser}
                messages={this.state.messages}
                loading={this.state.loading}
                sendMessage={this.sendMessage}
              />
            )}
            {!this.props.match.params.id && (
              <MessagesMobile ref="messages" users={users} setUser={this.setUser} t={t} />
            )}
          </>
        )}
        {!isMobile && (
          <Messages
            ref="messages"
            users={users}
            activeUser={this.state.activeUser}
            messages={this.state.messages}
            loading={this.state.loading}
            onActive={this.onActive}
            onIdle={this.onIdle}
            setUser={this.setUser}
            sendMessage={this.sendMessage}
            {...this.props}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ user, timers }) => {
  return { user, timers };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
  return {
    setMessagesNotifications: (n) => dispatch(setMessagesNotifications(n)),
  };
};

export default compose(
  withTranslation(),
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MessagesContainer);
