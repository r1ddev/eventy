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

const rooms = [
	{
		name: "Креатив в условиях кризиса",
		ava: "https://images.eksmo.ru/upload/iblock/b51/fry_720.jpg",
		places: 25,
		fill: 25,
		link: "room1",
	},
	{
		name: "Проведение мероприятий для крупного бизнеса в кризис",
		ava: "https://images.eksmo.ru/upload/iblock/b51/fry_720.jpg",
		places: 25,
		fill: 10,
		link: "room2",
	},
];

class Сonversations extends React.Component {

	render() {
		const { data } = this.props.user;
		return (
			<div id="conversations">
				<Header data={data} />
				<div className="container">
					<div className="title">Открытые комнаты:</div>

					<div className="room-list">
						{rooms.map((room, index) => {
							return (
								<Link to={"/conversations/" + room.link} className="link" key={index}>
									<div className="row room">
										<div className="col-auto">
											<div className="ava">
												<img src={room.ava} alt="" />
											</div>
										</div>
										<div className="col-lg name">{room.name}</div>
										<div className="col-auto">
											<div
												className={
													"space" +
													(room.fill == room.places ? " full" : "")
												}>
												{room.fill + "/" + room.places} человек
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


	componentDidMount() {
		this.props.fetchUser()
	}
	render() {

		const { loading, user, error } = this.props.user;

		let errorUserPermissions = false;
		if (user) errorUserPermissions = error || user.range === 1 || user.range === 2
		console.log(loading)

		return (

			<div style={{ height: '100%', width: '100%' }}>
				{
					(!loading && !errorUserPermissions) &&
					<Сonversations {...this.props} />
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

const mapStateToProps = ({ user }) => {
	return {
		user: user
	}
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {
		fetchUser: fetchUser(apiService, dispatch)
	}
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(СonversationsContainer);
