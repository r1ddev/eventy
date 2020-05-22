import React from "react";
import "./conversations.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import api from './../../js/api';

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
				<div className="profile-header">
					<div className="container">
						<div className="ava text-right">
							<Link to="/profile">
								{
									data &&
									<img
										src={api.auth.getAvatarLocation() + data.avatar}
										alt=""
									/>
								}
							</Link>
						</div>
					</div>
				</div>
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
	render() {
		return <Сonversations {...this.props} />;
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
)(СonversationsContainer);
