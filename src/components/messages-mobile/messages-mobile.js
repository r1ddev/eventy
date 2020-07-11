import React from "react";
import "./messages-mobile.scss";
import api from "../../js/api";
import { Link } from "react-router-dom";

class MessagesMobile extends React.Component {
	scrollToBottom = () => {
		//this.refs.scenesChat.onUpdate(true);
	};

	render() {
		const { users, setUser } = this.props;
		return (
			<div id="messages-mobile">
				<div className="container">
					{users.map((user, index) => {
						return (
							<Link
								to={"/messages/" + user.user_id}
								className="dialog-item row"
								key={index}
								onClick={() => {
									setUser(user.user_id);
								}}>
								<div className="col-auto p-0">
									<div className="avatar">
										<img
											className="img-fluid"
											src={
												api.auth.getAvatarLocation() +
												user.avatar
											}
											alt=""
											srcSet=""
										/>
									</div>
								</div>
								<div className="col">
									{user.first_name + " " + user.last_name}
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
