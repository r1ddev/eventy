import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { fetchUser } from '../../actions/user-actions';
import IdeaFirstApiService from "../../services/idea-first-api-service";

class Menu extends React.Component {

	render() {
		const logo = require("../../images/icons/logo.svg");
		const desk = require("../../images/icons/desk.svg");
		const scenes = require("../../images/icons/scenes.svg");
		const program = require("../../images/icons/program.svg");
		const spikers = require("../../images/icons/spikers.svg");
		const presentations = require("../../images/icons/presentations.svg");
		const networking = require("../../images/icons/networking.svg");
		const messages = require("../../images/icons/messages.svg");
		const exposure = require("../../images/icons/exposure.svg");
		const conversations = require("../../images/icons/conversations.svg");
		const party = require("../../images/icons/party.svg");
		const quest = require("../../images/icons/quest.svg");
		const vipassistent = require("../../images/icons/vipassistent.svg");

		const { range, notifications } = this.props;

		const { newMessages, newVipMessages } = notifications;
		console.log(this.props)



		return (
			<div id="menu">
				<div className="flex-center" style={{ padding: "20px" }}>
					<img alt="" src={logo} />
				</div>
				<MenuItem icon={desk} label="Infodesk" link="/desk"></MenuItem>
				<MenuItem icon={scenes} label="Сцены" link="/scenes"></MenuItem>
				<MenuItem icon={program} label="Программа" out={true} link="https://marketingforum.com.ua/ru/home/programm-extended/"></MenuItem>
				<MenuItem icon={spikers} label="Спикеры" out={true} link="https://marketingforum.com.ua/ru/speakers/"></MenuItem>
				<MenuItem icon={presentations} label="Презентации" link="/presentations"></MenuItem>
				<MenuItem icon={networking} label="Нетворкинг" link="/networking"></MenuItem>
				<MenuItem icon={messages} label="Мои сообщения" link="/messages" notifications={newMessages}></MenuItem>
				<MenuItem icon={exposure} label="Экспозона" link="/exposure"></MenuItem>
				{((range !== 1) && (range !== 2)) && <MenuItem icon={conversations} label="Переговорки" link="/conversations"></MenuItem>}
				<MenuItem icon={quest} label="Квест" link="/quest"></MenuItem>
				{(range !== 1) && <MenuItem icon={party} label="Вечеринка" out={true} link="https://us5.campaign-archive.com/?e=&u=df5d96ca282cfa5c02d25b866&id=a9931072e8"></MenuItem>}
				{((range !== 1) && (range !== 2) && (range !== 6)) && <MenuItem
					icon={vipassistent}
					label="Ассистент для вип"
					link="/vip-assistent"
					notifications={newVipMessages}
				></MenuItem>
				}
			</div>
		);
	}
}

class MenuItem extends React.Component {
	render() {
		const { label, link, icon, out = false, notifications = false } = this.props;

		const api = new IdeaFirstApiService();


		return (
			<>
				{(!out) && <Link to={link} className="menu-item flex-center">
					<div className="menu-item-icon-wrap">
						<img alt="" src={icon} className="menu-item-icon" />
						{((link === '/messages' || link === "/vip-assistent") && notifications) && <div className="menu-notify"></div>}
					</div>
					<div className="menu-item-label">{label}</div>
				</Link>}
				{(out) && <a target="_blank" href={link} className="menu-item flex-center" onClick={() => api.postUrl(link)}>
					<div className="menu-item-icon-wrap">
						<img alt="" src={icon} className="menu-item-icon" />
					</div>
					<div className="menu-item-label">{label}</div>
				</a>}
			</>
		);
	}
}

class MenuContainer extends React.Component {

	componentDidMount() {
		this.props.fetchUser();
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
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps))(MenuContainer);