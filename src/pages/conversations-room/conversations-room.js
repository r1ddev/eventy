import React from "react";
import "./conversations-room.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import DailyIframe from "@daily-co/daily-js";
import Header from "../../components/header";
import Spinner from "../../components/spinner";
import NoPermissions from "../../components/no-permissions";
import { fetchUser } from "../../actions/user-actions";
import { conversationRoomsLoading, conversationRoomsLoaded } from "../../actions/conversations-actions";
import api from "../../js/api";
import { isMobile } from "react-device-detect";

import posed, { PoseGroup } from 'react-pose';

const Item = posed.div({
  // preEnter: {
  //   opacity: 0,
  //   transition: { type: "spring" }
  // },
  // enter: {
  //   opacity: 1,
  //   transition: { type: "spring" },
  //   delay: ({ i }) => i * 200,
  // },
  // exit: {
  //   opacity: 0,
  //   transition: { type: "spring" }
  // },

  preEnter: {
    scale: 1,
    opacity: 0,
    x: 100
  },
  enter: {
    delay: ({ i }) => i * 50,
    scale: 1,
    opacity: 1,
    x: 0
  },
  exit: {
    delay: ({ i }) => i * 25,
    opacity: 0,
    x: -100
  }
});
class СonversationsRoom extends React.Component {
  constructor() {
    super();

    this.timeout = undefined;
    this.iframeRef = React.createRef();
    this.state = {
      room: undefined,
      onlineUsers: []
    };
  }

  componentDidMount() {
    let currentRoom = this.props.rooms.find((r) => r.room_id == this.props.match.params.room);

    if (currentRoom) {
      this.setState(
        {
          room: currentRoom,
        },
        () => {
          this.daily = DailyIframe.wrap(this.iframeRef.current);
          this.daily.join({ url: currentRoom.url });

          this.updateRoomStatus();
        }
      );
    }
  }

  updateRoomStatus = () => {
    api.account.conversations.updateRoomStatus(this.state.room.room_id).then(res => {
      this.setState({
        onlineUsers: res
      })
    }).catch(e => {
      api.errorHandler(e, {
        "access_denied": () => this.props.history.goBack()
      })
    })

    this.timeout = setTimeout(() => {
      this.updateRoomStatus();
    }, this.props.timers.conversationsTimer);
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { data } = this.props.user;

    return (
      <div id="conversations-room">
        {!isMobile && (
          <Header data={data}>
            <></>
          </Header>
        )}

        <div className="container pt-3">
          <div className="row">
            <div className="col-lg-9">
              {this.state.room && (
                <iframe
                  className="video"
                  title="video call iframe"
                  ref={this.iframeRef}
                  allow="camera; microphone; fullscreen"></iframe>
              )}
            </div>
            <div className="col-lg-3">

              <div className="online-list-wrap">
                <div className="title">Пользователи онлайн:</div>
                <div className="online-list">
                  <PoseGroup animateOnMount preEnterPose="preEnter">
                    {
                      this.state.onlineUsers.map(user => (
                        <Item key={user.id}>
                          <a key={user.id} href={`/profile/${user.id}`} className="link" target="_blank">
                            <div className="row m-0">
                              <div className="col-auto p-0">
                                <div className="avatar">
                                  <img src={api.auth.getAvatarLocation() + user.avatar} alt=""/>
                                </div>
                              </div>
                              <div className="col username"><span>{`${user.first_name} ${user.last_name}`}</span></div>
                            </div>
                          </a>
                        </Item>
                      ))
                    }
                  </PoseGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class СonversationsRoomContainer extends React.Component {
  componentDidMount() {
    if (!this.props.conversations.isLoaded) {
      api.account.conversations.getRooms().then((res) => {
        this.props.conversationRoomsLoaded(res.rooms);
      });
    }

    this.props.fetchUser();
  }

  render() {
    let loading = true;
    const { isLoaded: roomsLoading, rooms } = this.props.conversations;

    loading = !roomsLoading;

    return (
      <div style={{ height: "100%", width: "100%" }}>
        {!loading && <СonversationsRoom {...this.props} rooms={rooms} />}
        {loading && <Spinner big={1} />}
      </div>
    );
  }
}

const mapStateToProps = ({ user, conversations, timers }) => {
  return {
    user,
    conversations,
    timers,
  };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
  return {
    conversationRoomsLoading: () => conversationRoomsLoading(dispatch),
    conversationRoomsLoaded: (rooms) => conversationRoomsLoaded(dispatch)(rooms),
    fetchUser: fetchUser(apiService, dispatch),
  };
};

export default compose(withApiService(), connect(mapStateToProps, mapDispatchToProps))(СonversationsRoomContainer);
