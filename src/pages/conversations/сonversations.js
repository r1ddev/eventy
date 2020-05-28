import React from "react";
import "./conversations.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import api from './../../js/api';
import Header from "../../components/header";
import Spinner from '../../components/spinner';
import NoPermissions from '../../components/no-permissions';
import { fetchUser } from '../../actions/user-actions';
import { conversationRoomsLoading, conversationRoomsLoaded } from '../../actions/conversations-actions';

class Сonversations extends React.Component {

	render() {
		const { data } = this.props.user;
		return (
			<div id="conversations">
				<Header data={data}>
					<></>
					<div className="col d-flex align-items-center p-0">
						<Link to="/messages/5" className="action-link">
							Связь с организаторами
						</Link>
					</div>
				</Header>
				<div className="container">
					<div className="title">Открытые комнаты:</div>

					<div className="room-list">
						{this.props.rooms.map((room, index) => {
							return (
								<Link to={"/conversations/" + room.room_id} className="link" key={index}>
									<div className="row room">
										<div className="col-auto">
											<div className="ava">
												{/* <img src={room.ava} alt="" /> */}
											</div>
										</div>
										<div className="col-lg name">{room.name}</div>
										<div className="col-auto">
											<div
												className={
													"space" +
													(room.current_people == room.max_people ? " full" : "")
												}>
												{room.current_people + "/" + room.max_people} человек
											</div>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}
class СonversationsContainer extends React.Component {

	state = {
	}

	componentDidMount() {
		this.props.fetchUser()

		api.account.conversations.getRooms().then(res => {
			console.log(res);

			this.props.conversationRoomsLoaded(res.rooms)
		})
	}
	render() {
		let loading = true
		const { loading: userLoading, user, error } = this.props.user;
		const { isLoaded: roomsLoaded, rooms } = this.props.conversations;

		loading = userLoading || !roomsLoaded

		let errorUserPermissions = false;
		if (user) errorUserPermissions = error || user.range === 1 || user.range === 2

		return (
			<>
				{
					(!loading && !errorUserPermissions) &&
					<Сonversations {...this.props} rooms={rooms} />
				}
				{
					(loading) && <Spinner big={1} />
				}
				{
					(!loading && errorUserPermissions) && <NoPermissions />
				}
			</>
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
)(СonversationsContainer);
