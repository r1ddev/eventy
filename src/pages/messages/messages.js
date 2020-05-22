import React from "react";
import "./messages.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import api from "./../../js/api";
import ScenesChat from "./../../components/scenes-chat/scenes-chat";

class Messages extends React.Component {
	state = {
		users: [
			{
				name: "asasd",
				avatar: "ab70bd0a37b1153c1109a198f3d4c386.png",
				id: 123,
				company: "Ideas.First",
				position: "Маркетинг директор",
			},
			{
				name: "Руслан Федоров Федоров ФедоровФедоровФедоровФедоров Федоров Федоров",
				avatar: "ab70bd0a37b1153c1109a198f3d4c386.png",
				id: 234,
				company: "Ideas.First 222",
				position: "Маркетинг директор 222",
			},
		],
		activeUser: {},
		messages: [
			{
				first_name: "qwe",
				last_name: "123",
				range: 4,
				message: "Привет",
				avatar: "ab70bd0a37b1153c1109a198f3d4c386.png",
			},
			{
				first_name: "qwe-2",
				last_name: "123-2",
				range: 4,
				message: "Привет 2",
				avatar: "ab70bd0a37b1153c1109a198f3d4c386.png",
			},
		],
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		if (this.props.match.params.id) {
			this.setUser(this.props.match.params.id);
		}
	};

	setUser = (userId) => {
		let activeUser = this.state.users.find((u) => u.id == userId);

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
							name: res.user.first_name + " " + res.user.last_name,
							avatar: res.user.avatar,
							id: userId,
							company: res.user.company,
							position: res.user.position,
						},
					});
				})
				.catch((e) => console.log(e));
		}
	};

	sendMessage = (message) => {
		let m = this.state.messages;
		m.push({
			first_name: "qwe-2",
			last_name: "123-2",
			range: 4,
			message: message,
			avatar: "ab70bd0a37b1153c1109a198f3d4c386.png",
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
				<div className="profile-header">
					<div className="container">
						<div className="ava text-right">
							<Link to="/profile">
								{data && (
									<img src={api.auth.getAvatarLocation() + data.avatar} alt="" />
								)}
							</Link>
						</div>
					</div>
				</div>
				<div className="container-fluid">
					<div className="row h-100">
						<div className="col-md-3 p-0">
							<div className="users-list">
								{users.map((user, index) => {
									return (
										<Link
											to={"/messages/" + user.id}
											className="user"
											key={index}
											onClick={() => {
												this.setUser(user.id);
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
													<div className="col p-0 name">{user.name}</div>
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
									<div className="card flex-center p-4">
										<div className="ava">
											<img
												src={
													api.auth.getAvatarLocation() + activeUser.avatar
												}
											/>
										</div>
										<div className="title">{activeUser.name}</div>
										<div className="desc">
											{activeUser.position + " в " + activeUser.company}
										</div>
									</div>
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
