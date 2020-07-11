import React from "react";
import "./messages-mobile.scss";
import api from "../../js/api";

class MessagesMobile extends React.Component {
	render() {
		const { users } = this.props;
		return (
			<div id="messages-mobile">
				<div className="container">
					{users.map((user, index) => {
						return (
							<div className="row dialog-item" key={index}>
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
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default MessagesMobile;
