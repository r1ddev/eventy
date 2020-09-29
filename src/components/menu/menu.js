import React from "react";
import { NavLink } from "react-router-dom";
import "./menu.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { fetchUser } from '../../actions/user-actions';
import IdeaFirstApiService from "../../services/idea-first-api-service";
import { withTranslation } from "react-i18next";

class Menu extends React.Component {

	render() {
		const logo = require("../../images/icons/menu/logo.svg");
		const desk = require("../../images/icons/menu/desk.svg");
		const scenes = require("../../images/icons/menu/scenes.svg");
		const presentations = require("../../images/icons/menu/presentations.svg");
		const networking = require("../../images/icons/menu/networking.svg");
		const messages = require("../../images/icons/menu/messages.svg");
		const exposure = require("../../images/icons/menu/exposure.svg");
		const conversations = require("../../images/icons/menu/conversations.svg");
	
		const { range, notifications } = this.props;

		const { newMessages, newVipMessages } = notifications;
		const t = this.props.t;

		return (
			<div id="menu">
				<div className="flex-center" style={{ padding: "20px" }}>
					<img alt="" src={logo} />
				</div>
				<MenuItem icon={desk} label={t("Лобби")} link="/desk"></MenuItem>
				<MenuItem icon={scenes} label={t("Сцены")} link="/scenes"></MenuItem>
				<MenuItem icon={networking} label={t("Нетворкинг")} link="/networking"></MenuItem>
				<MenuItem icon={messages} label={t("Сообщения")} link="/messages" notifications={newMessages}></MenuItem>
				<MenuItem icon={conversations} label={t("Переговорки")} link="/conversations"></MenuItem>
				<MenuItem icon={exposure} label={t("Партнеры")} link="/exposure"></MenuItem>
				<MenuItem icon={presentations} label={t("Презентации")} link="/presentations/day1"></MenuItem>


			</div>
		);
	}
}

class MenuItem extends React.Component {
	render() {
		const { label, link, icon, out = false, notifications = false } = this.props;

		const api = new IdeaFirstApiService();


		return (
			<NavLink
				to={link}
				activeStyle={{
					borderLeft: '3px solid #3F4545',

				}}
				className="menu-item flex-center"
			>
				<div className="menu-item-icon-wrap">
					<img alt="" src={icon} className="menu-item-icon" />
					{((link === '/messages' || link === "/vip-assistent") && notifications) && <div className="menu-notify"></div>}
				</div>
				<div className="menu-item-label">{label}</div>
			</NavLink>
		);
	}
}

class MenuContainer extends React.Component {

	componentDidMount() {
		if (!this.props.user) this.props.fetchUser();
	}

	render() {
		const { loading, user } = this.props.user;

		let range = 1;
		if (user) range = user.range

		return (
			<Menu range={range} {...this.props} />
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
	withTranslation(),
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps))(MenuContainer);