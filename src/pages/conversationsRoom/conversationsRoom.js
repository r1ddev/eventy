import React from "react";
import "./conversationsRoom.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import DailyIframe from '@daily-co/daily-js';
import Header from "../../components/header";
import Spinner from '../../components/spinner';
import NoPermissions from '../../components/no-permissions';
import { fetchUser } from '../../actions/user-actions';
import { conversationRoomsLoading, conversationRoomsLoaded } from '../../actions/conversations-actions';
import api from './../../js/api';

class СonversationsRoom extends React.Component {

	constructor() {
		super()

		this.timeout = undefined
		this.iframeRef = React.createRef();
		this.state = {
			room: undefined
		}
	}

	componentDidMount() {

		let currentRoom = this.props.rooms.find(r => r.room_id == this.props.match.params.room)

		if (currentRoom) {
			this.setState({
				room: currentRoom
			}, () => {
				this.daily = DailyIframe.wrap(this.iframeRef.current);
				this.daily.join({ url: currentRoom.url });

				this.updateRoomStatus()
			})
		}
	}

	updateRoomStatus = () => {
		api.account.conversations.updateRoomStatus(this.state.room.room_id)

		this.timeout = setTimeout(() => {
			this.updateRoomStatus()
		}, this.props.timers.conversationsTimer);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout)
	}

	render() {
		const { data } = this.props.user;

		return (
			<div id="conversations-room">
				<Header data={data}>
					<></>
					<div className="col d-flex align-items-center p-0">
						<Link to="/messages/5" className="action-link">
							Связь <br />с организаторами
						</Link>
					</div>
				</Header>
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

	componentDidMount() {

		if (!this.props.conversations.isLoaded) {
			api.account.conversations.getRooms().then(res => {
				this.props.conversationRoomsLoaded(res.rooms)
			})
		}


		this.props.fetchUser()
	}

	render() {
		let loading = true
		const { isLoaded: roomsLoading, rooms } = this.props.conversations;

		loading = !roomsLoading



		return (

			<div style={{ height: '100%', width: '100%' }}>
				{
					(!loading) &&
					<СonversationsRoom {...this.props} rooms={rooms} />
				}
				{
					(loading) && <Spinner big={1} />
				}

			</div>
		)
	}

}

const mapStateToProps = ({ user, conversations, timers }) => {
	return {
		user, conversations, timers
	}
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {
		conversationRoomsLoading: () => conversationRoomsLoading(dispatch),
		conversationRoomsLoaded: (rooms) => conversationRoomsLoaded(dispatch)(rooms),
		fetchUser: fetchUser(apiService, dispatch)
	}
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(СonversationsRoomContainer);
