import React from "react";
import "./messages.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import api from "./../../js/api";
import ScenesChat from "./../../components/scenes-chat/scenes-chat";
import Header from "../../components/header";
import IdleTimer from 'react-idle-timer'

import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'

class Messages extends React.Component {
	state = {
		users: [],
		activeUser: {},
		messages: [],
		updateTimeout: undefined,
		updateTimer: 5000
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		api.account.messages.getDialogs().then(res => {
			this.setState({
				users: res.dialogs
			}, () => {
				if (this.props.match.params.id) {
					this.setUser(this.props.match.params.id);
				}
			})
		}).catch(e => console.log(e))
	};

	asetState = (newState) => {
		return new Promise((resolve, reject) => {
			this.setState(newState, () => resolve())
		});
	}

	setUser = async (userId) => {

		let activeUser = this.state.users.find((u) => u.user_id == userId);

		if (activeUser !== undefined) {
			await this.asetState({
				activeUser: activeUser,
			});

		} else {
			let userData = await api.account.getUserDataById(userId)

			await this.asetState({
				activeUser: {
					first_name: userData.user.first_name,
					last_name: userData.user.last_name,
					avatar: userData.user.avatar,
					user_id: userId,
					company: userData.user.company,
					position: userData.user.position,
					mail: userData.user.mail || "",
					phone: userData.user.phone || "",
					social_site: userData.user.social_site || "",
					what_looking: userData.user.what_looking || "",
					what_offer: userData.user.what_offer || "",
				},
			});

		}

		clearTimeout(this.state.updateTimeout)
		await this.fetchMessages(userId)

		this.refs.scenesChat.onUpdate(true);
	};

	fetchMessages = async (userId) => {
		let messages = await api.account.messages.getMessages(userId)

		messages.messages = messages.messages.map(message => {
			if ((this.props.user.data.id == 8 && userId == 7) ||
				(this.props.user.data.id == 7 && userId == 8)) {

				try {
					let dec = AES.decrypt(message.text, window.localStorage.ckey || "");
					message.text = dec.toString(CryptoJS.enc.Utf8)
				} catch (error) { }

			}
			return { ...message, message: message.text }
		})

		await this.asetState({
			messages: messages.messages
		})

		let timeout = setTimeout(() => {
			this.fetchMessages(userId)
		}, this.state.updateTimer);

		await this.asetState({
			updateTimeout: timeout
		})

	}

	sendMessage = (message) => {

		let encMessage = ""

		if ((this.props.user.data.id == 7 && this.state.activeUser.user_id == 8) ||
			(this.props.user.data.id == 8 && this.state.activeUser.user_id == 7)) {
			let enc = AES.encrypt(message, window.localStorage.ckey || "");
			encMessage = enc.toString();
		}

		api.account.messages.sendMessages(this.state.activeUser.user_id, encMessage || message).then(res => {

		}).catch(e => console.log(e))


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
				this.refs.scenesChat.onUpdate(true);
			}
		);
	};

	componentWillUnmount() {
		clearTimeout(this.state.updateTimeout)
	}

	onActive = async (e) => {
		await this.asetState({
			updateTimer: 5000
		})

		if (Object.entries(this.state.activeUser).length > 0) {
			this.setUser(this.state.activeUser.user_id)
		}

	}

	onIdle = (e) => {
		this.setState({
			updateTimer: 30000
		})
	}

	render() {
		const { users, activeUser, messages } = this.state;
		const { data } = this.props.user;

		var isChatAvailable = Object.entries(activeUser).length > 0;


		return (
			<div id="messages">
				<IdleTimer
					element={document}
					onActive={this.onActive}
					onIdle={this.onIdle}
					timeout={1000 * 60} />
				<Header />
				<div className="container-fluid">
					<div className="row h-100">
						<div className="col-md-3 p-0">
							<div className="users-list">
								{users.map((user, index) => {
									return (
										<Link
											to={"/messages/" + user.user_id}
											className="user"
											key={index}
											onClick={() => {
												this.setUser(user.user_id);
											}}>
											<div>
												<div className="row align-items-center">
													<div className="col-auto">
														<div className="ava">
															<img
																src={
																	api.auth.getAvatarLocation() +
																	user.avatar
																}
															/>
														</div>
													</div>
													<div className="col p-0 name">{user.first_name + " " + user.last_name}</div>
												</div>
											</div>
										</Link>
									);
								})}
							</div>
						</div>
						<div className="col-md-5 p-0">
							<div className="dialog">
								{isChatAvailable && (
									<ScenesChat
										loading={false}
										messages={messages}
										sendMessage={this.sendMessage}
										isPrivate={true}
										ref="scenesChat"
									/>
								)}
								{!isChatAvailable && (
									<div className="flex-center h-100 text-black-50">
										Пожалуйста, выберите беседу
									</div>
								)}
							</div>
						</div>
						<div className="col-md-4 cards">
							<div className="info p-3">
								{isChatAvailable && (
									<>
										<div className="card flex-center p-4">
											<div className="ava">
												<Link to={"/profile/" + activeUser.user_id}>
													<img
														src={
															api.auth.getAvatarLocation() + activeUser.avatar
														}
													/>
												</Link>
											</div>
											<div className="title">{activeUser.first_name + " " + activeUser.last_name}</div>
											<div className="desc">
												{activeUser.position + " в " + activeUser.company}
											</div>
										</div>

										<div className="card card-contacts flex-center p-4 px-5 mt-3">
											<div className="title">Контакты:</div>
											<div className="desc">{activeUser.mail}</div>
											<div className="desc">{activeUser.phone}</div>
											<div className="desc">{activeUser.social_site}</div>
											<div className="title">Что предлагаю:</div>
											<div className="desc">{activeUser.what_offer}</div>
											<div className="title">Что ищу:</div>
											<div className="desc">{activeUser.what_looking}</div>
										</div>
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
	render() {
		return <Messages {...this.props} />;
	}
}

const mapStateToProps = ({ user }) => {
	return { user };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(MessagesContainer);
