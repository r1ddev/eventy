import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

class Menu extends React.Component {
	state = {
		itemsCount: 12,
	};

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


		return (
			<div id="menu">
				<div className="flex-center" style={{ padding: "20px" }}>
					<img alt="" src={logo} />
				</div>
				<MenuItem icon={desk} label="Infodesk" link="/desk"></MenuItem>
				<MenuItem icon={scenes} label="Сцены" link="/scenes"></MenuItem>
				<MenuItem icon={program} label="Программа" link="/"></MenuItem>
				<MenuItem icon={spikers} label="Спикеры" link="/spikers"></MenuItem>
				<MenuItem icon={presentations} label="Презентации" link="/presentations"></MenuItem>
				<MenuItem icon={networking} label="Нетворкинг" link="/networking"></MenuItem>
				<MenuItem icon={messages} label="Мои сообщения" link="/messages"></MenuItem>
				<MenuItem icon={exposure} label="Экспозона" link="/exposure"></MenuItem>
				<MenuItem icon={conversations} label="Переговорки" link="/conversations"></MenuItem>
				<MenuItem icon={quest} label="Квест" link="/quest"></MenuItem>
				<MenuItem icon={party} label="Вечеринка" link="/party"></MenuItem>
				<MenuItem
					icon={vipassistent}
					label="Ассистент для вип"
					link="/vip-assistent"></MenuItem>
			</div>
		);
	}
}

class MenuItem extends React.Component {
	render() {
		const { label, link, icon } = this.props;

		return (
			<Link to={link} className="menu-item flex-center">
				<div className="menu-item-icon-wrap">
					<img alt="" src={icon} className="menu-item-icon" />
				</div>
				<div className="menu-item-label">{label}</div>
			</Link>
		);
	}
}

export default Menu;
