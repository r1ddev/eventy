import React from "react";
import "./conversations.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import api from "./../../js/api";
import Header from "../../components/header";
import Spinner from "../../components/spinner";
import NoPermissions from "../../components/no-permissions";
import { isMobile } from "react-device-detect";
import { fetchUser } from "../../actions/user-actions";
import { conversationRoomsLoading, conversationRoomsLoaded } from "../../actions/conversations-actions";
import { setPageFetch } from "../../actions/page-actions";


import { withTranslation } from "react-i18next";

const Room = ({ t, name, currentPeople, maxPeople }) => {
  return (
    <div className="row room">
      <div className="col-auto">
        <div className="ava">{/* <img src={room.ava} alt="" /> */}</div>
      </div>
      <div className="col-lg name">{name}</div>
      <div className="col-auto">
        <div className={"space" + (currentPeople == maxPeople ? " full" : "")}>
          {currentPeople + "/" + maxPeople} {t("человек")}
        </div>
      </div>
    </div>
  );
};

class Сonversations extends React.Component {
  render() {
    const { data } = this.props.user;
    const t = this.props.t;

    return (
      <div id="conversations">
        {!isMobile && (
          <Header data={data}>
            <></>
          </Header>
        )}

        <div className="container">
          <div className="title">{t("Открытые комнаты")}:</div>

          <div className="room-list pb-4">
            {this.props.rooms.map((room, index) => {
              return (
                <div key={index}>
                  {room.current_people < room.max_people && (
                    <Link to={"/conversations/" + room.room_id} className="link">
                      <Room t={t} name={room.name} currentPeople={room.current_people} maxPeople={room.max_people} />
                    </Link>
                  )}

                  {room.current_people == room.max_people && (
                    <div className="link">
                      <Room name={room.name} currentPeople={room.current_people} maxPeople={room.max_people} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
class СonversationsContainer extends React.Component {
  state = {};

  componentDidMount() {
    this.props.setPageFetch('conversations');

    this.props.fetchUser();

    api.account.conversations.getRooms().then((res) => {
      this.props.conversationRoomsLoaded(res.rooms);
    });
  }
  render() {
    let loading = true;
    // const { loading: userLoading, user, error } = this.props.user;
    const { isLoaded: roomsLoaded, rooms } = this.props.conversations;

    // loading = userLoading || !roomsLoaded;
    loading = !roomsLoaded;

    // let errorUserPermissions = false;
    // if (user) errorUserPermissions = error || user.range === 1 || user.range === 2;

    return (
      <>
        {!loading && <Сonversations {...this.props} rooms={rooms} />}
        {loading && <Spinner big={1} />}
      </>
    );
  }
}

const mapStateToProps = ({ user, conversations }) => {
  return {
    user,
    conversations,
  };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
  return {
    conversationRoomsLoading: () => conversationRoomsLoading(dispatch),
    conversationRoomsLoaded: (rooms) => conversationRoomsLoaded(dispatch)(rooms),
    fetchUser: fetchUser(apiService, dispatch),
    setPageFetch: (page) => setPageFetch(apiService, dispatch)(page)
  };
};

export default compose(
  withTranslation(),
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(СonversationsContainer);
