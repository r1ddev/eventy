import React from "react";
import "./dialog-mobile.scss";
import api from "../../js/api";
import { Link } from "react-router-dom";
import ScenesChat from "../../components/scenes-chat/scenes-chat";
import Translit from "../../components/translit";

class DialogMobile extends React.Component {
  scrollToBottom = (force = true) => {
    this.refs.scenesChat.onUpdate(force);
  };
  render() {
    const { activeUser, messages, loading, sendMessage, t } = this.props;
    const userIsLoaded = Object.entries(activeUser).length > 0;

    
    return (
      <div id="dialog-mobile">
        <div className="header">
          <div className="row">
            <div className="col-auto pr-0 flex-center">
              <Link to="/messages" className="back">
                &#10094;
              </Link>
            </div>
            <div className="col">
              <Link to={"/profile/" + activeUser.id} target="_blank" className="userdata">
                <div className="row">
                  <div className="col-auto">
                    <div className="avatar">
                      <img src={api.auth.getAvatarLocation() + activeUser.avatar} alt="" srcSet="" />
                    </div>
                  </div>
                  <div className="col username">
                    {userIsLoaded && <Translit value={activeUser.first_name + " " + activeUser.last_name} />}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <ScenesChat
          t={t}
          loading={loading}
          messages={messages}
          sendMessage={sendMessage}
          isPrivate={true}
          ref="scenesChat"
          className="chat"
        />
      </div>
    );
  }
}

export default DialogMobile;
