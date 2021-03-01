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
import {
	conversationRoomsLoading,
	conversationRoomsLoaded,
} from "../../actions/conversations-actions";

import { fetchMessages, updateMessages, fetchAddMessage } from "../../actions/chat-actions";
import api from "../../js/api";
import { isMobile } from "react-device-detect";

import { withTranslation } from "react-i18next";

import posed, { PoseGroup } from "react-pose";
import ScenesChat from "../../components/scenes-chat";
import ErrorIndicator from "../../components/error-indicator";
import Translit from "../../components/translit";
import Rules from './../../utils/rules';
import Langs from './../../utils/lang';

const Modal = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

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
		x: 100,
	},
	enter: {
		delay: ({ i }) => i * 50,
		scale: 1,
		opacity: 1,
		x: 0,
	},
	exit: {
		delay: ({ i }) => i * 25,
		opacity: 0,
		x: -100,
	},
});


class СonversationsRoom extends React.Component {
	constructor() {
    super();
    
    this.timeoutChat = undefined;
		this.timeout = undefined;
    this.iframeRef = React.createRef();
    
		this.state = {
      onlineUsers: [],
      chatVisible: false,
      isModer: false
		};
  }
  
  getCurrentPageRules = () => {

    let isModer = new Rules().isModeratorHere(this.props.user.data.rules)

    this.setState({
      isModer: isModer
    })

  }

	componentDidMount () {
    this.getCurrentPageRules()
    if (this.props.room) {
      
      this.daily = DailyIframe.wrap(this.iframeRef.current);
      this.daily.join({ url: this.props.room.url });

      this.updateRoomStatus();
      setTimeout(() => {
        this.props.fetchMessages(this.props.room.chat_id)
      }, 300);

      this.updateMessages()
      
    }
  }

  updateMessages = () => {
    this.timeoutChat = setTimeout(() => {
        this.props.updateMessages(this.props.room.chat_id, this.props.chat.lastApiMessageId);
        this.updateMessages();
    }, this.props.timers.sceneChatTime)

  }

  sendMessage = (message, reply_id, replyAttachmentData) => {
    const { first_name, last_name, avatar, range } = this.props.user.data;

    const date = new Date;

    const mes = {
        user_id: 1,
        first_name: first_name,
        last_name: last_name,
        avatar: avatar,
        range: range,
        id: 1,
        reply: replyAttachmentData,
        reply_id: reply_id,
        message: message,
        time: `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
    }
    this.props.fetchAddMessage(this.props.room.chat_id, mes, reply_id)
    this.refs.scenesChat.onUpdate(true)
  }

	updateRoomStatus = () => {
		api.account.conversations
			.updateRoomStatus(this.props.room.id)
			.then((res) => {
				this.setState({
					onlineUsers: res,
				});
			})
			.catch((e) => {
				api.errorHandler(e, {
					access_denied: () => {
            this.props.goBack();
            ErrorIndicator(this.props.t("Комната недоступна"))
          },
				});
			});

		this.timeout = setTimeout(() => {
			this.updateRoomStatus();
		}, this.props.timers.conversationsTimer);
  };

  

  toggleChat = () => {
    this.setState({
      chatVisible: !this.state.chatVisible
    })
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.chat.updateLoading != this.props.chat.updateLoading && !this.props.chat.updateLoading) {
      if (this.refs.scenesChat)
        this.refs.scenesChat.onUpdate()
    }

    if (prevProps.chat.loading != this.props.chat.loading && !this.props.chat.loading) {
      if (this.refs.scenesChat)
        this.refs.scenesChat.onUpdate(true)
    }

    if (prevState.chatVisible != this.state.chatVisible) {
      if (this.refs.scenesChat)
        this.refs.scenesChat.onUpdate(true)
    }
  }

  kickUser = (e, userId) => {
    let res = window.confirm(this.props.t("Заблокировать пользователю доступ к разделу?"))
    if (res) {
      api.account.rules.conversations
        .kickUser(this.props.room.id, userId)
        .then(res => {
          this.setState({
            onlineUsers: this.state.onlineUsers.filter(u => u.id != userId)
          })
        }).catch(e => {
          api.errorHandler(e, {})
        })
    }
    e.preventDefault();
  }

	componentWillUnmount() {
		clearTimeout(this.timeout);
    clearTimeout(this.timeoutChat);
	}


  render() {
    const { data } = this.props.user;
    const t = this.props.t;
    const { isModer } = this.state
    
    const { messages, loading, error } = this.props.chat;

    return (
      <div id="conversations-room">
        {!isMobile && (
          <Header data={data}>
            <></>
          </Header>
        )}

        <div className="container pt-3">
          <div className="row wrap">
            <div className="col-lg-9 left">
              {this.props.room && (
                <iframe
                  className="video"
                  title="video call iframe"
                  ref={this.iframeRef}
                  allow="camera; microphone; fullscreen"></iframe>
              )}
            </div>
            <div className="col-lg-3 right">
              <div className="chat-open-btn-wrap">
                <button onClick={this.toggleChat} className="btn chat-open-btn"></button>
              </div>
              
							<div className="online-list-wrap">
								<div className="title">{t("Пользователи онлайн")}:</div>
								<div className="online-list">
									<PoseGroup animateOnMount preEnterPose="preEnter">
										{this.state.onlineUsers.map((user) => (
											<Item key={user.id}>
												<a
													key={user.id}
													href={`/profile/${user.id}`}
													className="link"
													target="_blank">
													<div className="row m-0">
														<div className="col-auto p-0">
															<div className="avatar">
																<img
																	src={
																		api.auth.getAvatarLocation() +
																		user.avatar
																	}
																	alt=""
																/>
															</div>
														</div>
														<div className="col username">
															<span><Translit value={`${user.first_name} ${user.last_name}`} /></span>
														</div>
													</div>
                          {
                            isModer && (
                              <div className="kick-icon" alt={t("Выгнать пользователя")} title={t("Выгнать пользователя")} onClick={e => { this.kickUser(e, user.id) }}></div>
                            )
                          }
												</a>
											</Item>
										))}
									</PoseGroup>
								</div>
							</div>
              
              {!this.state.chatVisible && 
                <ScenesChat
                  t={t}
                  loading={loading}
                  messages={messages}
                  sendMessage={this.sendMessage}
                  isPrivate={true}
                  ref="scenesChat"
                />
              }
						</div>
					</div>
				</div>

        <PoseGroup>
          {this.state.chatVisible && [
            // If animating more than one child, each needs a `key`
            <Shade key="shade" className="chat-shade" />,
            <Modal key="modal" className="chat-modal-wrap">
              <div className="chat-modal">
                <div className="modal-close-btn" onClick={this.toggleChat}></div>
                <div className="chat-modal-messages">
                  <ScenesChat
                    t={t}
                    loading={loading}
                    messages={messages}
                    sendMessage={this.sendMessage}
                    isPrivate={true}
                    ref="scenesChat"
                  />
                </div>
                
              </div>
            </Modal>
          ]}
        </PoseGroup>
			</div>
		);
	}
}
class СonversationsRoomContainer extends React.Component {
  state = {
    room: undefined,
  }

	componentDidMount() {
    this.props.fetchUser();
    this.loadRooms()
  }
  
  loadRooms = async () => {
    // if (!this.props.conversations.isLoaded) {
		// 	let rooms = await api.account.conversations.getRooms()
    //   this.props.conversationRoomsLoaded(rooms);
    // }

    api.account.conversations
      .getRoomById(this.props.match.params.room)
      .then(res => {
        let room = res.filter(c => c.lang == Langs.getCurrentLang())

        this.setState({
          room: room[0],
        });
      })
      .catch(e => {
        api.errorHandler(e, {
          access_denied: () => {
            this.goBack();
            ErrorIndicator(this.props.t("Комната недоступна"))
          },
        })
      })

    // let currentRoom = this.props.conversations.rooms.filter(c => c.lang == Langs.getCurrentLang()).find((r) => r.room_id == this.props.match.params.room);

    // if (currentRoom) {
    //   this.setState({
    //     room: currentRoom,
    //   });
    // }
  }

  goBack = () => {
    this.props.history.length == 1 ? window.close() : this.props.history.goBack();
  };

	render() {
		let loading = true;
    const { loading: userLoading, data: userData  } = this.props.user;
    
    const room = this.state.room;
    loading = !room || !userData;

		return (
			<div style={{ height: "100%", width: "100%" }}>
				{!loading && <СonversationsRoom {...this.props} room={room} goBack={this.goBack} />}
				{loading && <Spinner big={1} />}
			</div>
		);
	}
}

const mapStateToProps = ({ chat, user, conversations, timers }) => {
	return {
		chat,
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

		fetchMessages: (idChat) => fetchMessages(apiService, dispatch)(idChat),
		updateMessages: (idChat, id) => updateMessages(apiService, dispatch)(idChat, id),
		fetchAddMessage: (idChat, message, reply_id) =>
			fetchAddMessage(apiService, dispatch)(idChat, message, reply_id),
	};
};

export default compose(
	withTranslation(),
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(СonversationsRoomContainer);
