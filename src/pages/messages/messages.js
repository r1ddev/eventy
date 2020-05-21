import React from "react";
import "./messages.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import api from "./../../js/api";

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
		activeUser: 0,
		massages: [],
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		if (this.props.match.params.id) {
			this.setState({
				activeUser: parseInt(this.props.match.params.id),
			});
		}
	};

	render() {
		const { users, activeUser, massages } = this.state;

		console.log(this.state);

		var activeUserData = false;
		if (activeUser > 0) {
			activeUserData = users.find((u) => {
				return u.id == activeUser;
			});
		}

		console.log("activeUserData", activeUserData);

		return (
			<div id="messages">
				<div className="profile-header">
					<div className="container">
						<div className="ava text-right">
							<Link to="/profile">
								<img
									src={require("../../images/networking-card-image-placeholder.png")}
									alt=""
								/>
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
												this.setState({
													activeUser: user.id,
												});
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
								{activeUserData && <div className="">сообщение</div>}
								{!activeUserData && (
									<div className="flex-center h-100 text-black-50">
										Пожалуйста, выберите беседу
									</div>
								)}
							</div>
						</div>
						<div className="col-md-4">
							<div className="info p-3">
								{activeUserData && (
									<div className="card flex-center p-4">
										<div className="ava">
											<img
												src={
													api.auth.getAvatarLocation() +
													activeUserData.avatar
												}
											/>
										</div>
										<div className="title">{activeUserData.name}</div>
										<div className="desc">
											{activeUserData.position +
												" в " +
												activeUserData.company}
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

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(MessagesContainer);
