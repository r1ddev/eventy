import React from "react";
import "./conversationsRoom.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import DailyIframe from '@daily-co/daily-js';
import Header from "../../components/header";

const rooms = [
	{
		room: "room1",
		daily: "https://teeestuyjg.daily.co/hello"
	}, {
		room: "room2",
		daily: "https://teeestuyjg.daily.co/test-call"
	}
]

class СonversationsRoom extends React.Component {

	constructor() {
		super()

		this.iframeRef = React.createRef();
		this.state = {
			room: undefined
		}
	}

	componentDidMount() {

		let currentRoom = rooms.find(r => r.room == this.props.match.params.room)

		if (currentRoom) {
			this.setState({
				room: currentRoom
			}, () => {
				this.daily = DailyIframe.wrap(this.iframeRef.current);
				this.daily.join({ url: currentRoom.daily });
			})


		}
	}

	render() {
		const { data } = this.props.user;

		return (
			<div id="conversations-room">
				<Header data={data} />
				<div className="container">
					{this.state.room &&
						<iframe className="video"
							title="video call iframe"
							ref={this.iframeRef}
							allow="camera; microphone; fullscreen"
						></iframe>
					}
				</div>
			</div>
		);
	}
}
class СonversationsRoomContainer extends React.Component {
	render() {
		return <СonversationsRoom {...this.props} />;
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
)(СonversationsRoomContainer);
