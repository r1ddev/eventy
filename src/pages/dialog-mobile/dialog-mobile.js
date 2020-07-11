import React from "react";
import "./dialog-mobile.scss";
import api from "../../js/api";
import { Link } from "react-router-dom";
import ScenesChat from "../../components/scenes-chat/scenes-chat";

import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

class DialogMobile extends React.Component {
	scrollToBottom = (upd) => {
		this.refs.scenesChat.onUpdate(true);
	};
	render() {
		const { activeUser, messages, loading, sendMessage } = this.props;
		const userIsLoaded = Object.entries(activeUser).length > 0;

		console.log("isLoading", loading);

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
							<Link
								to={"/profile/" + activeUser.user_id}
								target="_blank"
								className="userdata">
								<div className="row">
									<div className="col-auto">
										<div className="avatar">
											<img
												src={
													api.auth.getAvatarLocation() +
													activeUser.avatar
												}
												alt=""
												srcSet=""
											/>
										</div>
									</div>
									<div className="col username">
										{userIsLoaded && (
											<>
												{activeUser.first_name +
													" " +
													activeUser.last_name}
											</>
										)}
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
				<ScenesChat
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

const mapStateToProps = ({ notifications }) => {
	return { notifications };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(DialogMobile);

// export default DialogMobile;
