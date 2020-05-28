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
			})
		}
	}

	render() {
		const { data } = this.props.user;

		return (
			<div id="conversations-room">
				<Header data={data}>
					<></>
					<div className="col d-flex align-items-center p-0">
						<Link to="/messages/5" className="action-link">
							Связь с организаторами
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
		console.log(this.props.conversations);

		if (!this.props.conversations.isLoaded) {
			api.account.conversations.getRooms().then(res => {
				this.props.conversationRoomsLoaded(res.rooms)
			})
		}


		this.props.fetchUser()
	}

	render() {
		let loading = true
		const { loading: userLoading, user, error } = this.props.user;
		const { isLoaded: roomsLoading, rooms } = this.props.conversations;

		loading = userLoading || !roomsLoading

		let errorUserPermissions = false;
		if (user) errorUserPermissions = error || user.range === 1 || user.range === 2
		console.log(loading)

		return (

			<div style={{ height: '100%', width: '100%' }}>
				{
					(!loading && !errorUserPermissions) &&
					<СonversationsRoom {...this.props} rooms={rooms} />
				}
				{
					(loading) && <Spinner big={1} />
				}
				{
					(!loading && errorUserPermissions) && <NoPermissions />
				}
			</div>
		)
	}

}

const mapStateToProps = ({ user, conversations }) => {
	return {
		user, conversations
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
