import React from "react";
import "./messages-mobile.scss";
import api from "../../js/api";
import { Link } from "react-router-dom";

import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

import Translit from "../translit";

class MessagesMobile extends React.Component {
  scrollToBottom = (upd) => {
    //this.refs.scenesChat.onUpdate(true);
  };

  render() {
    const { users, setUser, notifications, t } = this.props;

    return (
      <div id="messages-mobile">
        <div className="container h-100">
          {users.length == 0 && (
            <div className="flex-center h-100 text-black-50 text-center">
              {/* {t("Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться")} */}
              Go to networking and select a person to start chatting with
            </div>
          )}
          {users.map((user, index) => {
            return (
              <Link
                to={"/messages/" + user.id}
                className="dialog-item row"
                key={index}
                onClick={() => {
                  setUser(user.id);
                }}>
                <div className="col-auto p-0">
                  <div className="avatar">
                    {!user.read && <div className="unread"></div>}
                    <img className="img-fluid" src={api.auth.getAvatarLocation() + user.avatar} alt="" srcSet="" />
                  </div>
                </div>
                <div className="col">
                  <Translit value={user.first_name + " " + user.last_name} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MessagesMobile;
