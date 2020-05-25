import React from "react";
import "./messages.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import api from "./../../js/api";
import ScenesChat from "./../../components/scenes-chat/scenes-chat";
import Header from "../../components/header";

import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'

class Messages extends React.Component {
	state = {
		users: [],
		activeUser: {},
		messages: [],
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

	setUser = (userId) => {

		let activeUser = this.state.users.find((u) => u.user_id == userId);

		if (activeUser !== undefined) {
			this.setState({
				activeUser: activeUser,
			});
		} else {
			api.account
				.getUserDataById(userId)
				.then((res) => {

					this.setState({
						activeUser: {
							first_name: res.user.first_name,
							last_name: res.user.last_name,
							avatar: res.user.avatar,
							user_id: userId,
							company: res.user.company,
							position: res.user.position,
							mail: res.user.mail || "",
							phone: res.user.phone || "",
							social_site: res.user.social_site || "",
							what_looking: res.user.what_looking || "",
							what_offer: res.user.what_offer || "",
						},
					});
				})
				.catch((e) => console.log(e));
		}

		api.account.messages.getMessages(userId).then(res => {
			res.messages = res.messages.map(message => {
				if ((this.props.user.data.id == 8 && userId == 7) ||
					(this.props.user.data.id == 7 && userId == 8)) {

					let dec = AES.decrypt(message.text, "мандаринка");
					message.text = dec.toString(CryptoJS.enc.Utf8)
				}
				return { ...message, message: message.text }
			})
			this.setState({
				messages: res.messages
			})
		}).catch(e => console.log(e))
	};

	sendMessage = (message) => {

		let encMessage = ""

		if ((this.props.user.data.id == 7 && this.state.activeUser.user_id == 8) ||
			(this.props.user.data.id == 8 && this.state.activeUser.user_id == 7)) {
			let enc = AES.encrypt(message, "мандаринка");
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

	render() {
		const { users, activeUser, messages } = this.state;
		const { data } = this.props.user;

		var isChatAvailable = Object.entries(activeUser).length > 0;


		return (
			<div id="messages">
				<Header data={data} />
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
						<div className="col-md-4">
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
