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
		const logo = require("../../images/icons/soldout/Logotype.svg");

		const desk = require("../../images/icons/soldout/Orange_Icon_01.svg");
		const activedesk = require("../../images/icons/soldout/White_Icon_01.svg");

		const scenes = require("../../images/icons/soldout/Orange_Icon_02.svg");
		const activescenes = require("../../images/icons/soldout/White_Icon_02.svg");

		const program = require("../../images/icons/soldout/Orange_Icon_03.svg");
		const activeprogram = require("../../images/icons/soldout/White_Icon_03.svg");

		const networking = require("../../images/icons/soldout/Orange_Icon_04.svg");
		const activenetworking = require("../../images/icons/soldout/White_Icon_04.svg");

		const messages = require("../../images/icons/soldout/Orange_Icon_05.svg");
		const activemessages = require("../../images/icons/soldout/White_Icon_05.svg");

		const conversations = require("../../images/icons/soldout/Orange_Icon_06.svg");
		const activeconversations = require("../../images/icons/soldout/White_Icon_06.svg");

		const exposure = require("../../images/icons/soldout/Orange_Icon_07.svg");
		const activeexposure = require("../../images/icons/soldout/White_Icon_07.svg");

		const presentations = require("../../images/icons/soldout/Orange_Icon_08.svg");
		const activepresentations = require("../../images/icons/soldout/Orange_Icon_08.svg");



		const { range, notifications, page } = this.props;

		const { newMessages, newVipMessages } = notifications;
		const t = this.props.t;


		return (
			<div id="menu">

				<div className="flex-center" style={{ backgroundColor: '#350278' }}>
					<img style={{ height: '100px' }} alt="" src={logo} />
				</div>

				<MenuItem active={page.page == 'desk'} icon={desk} activeicon={activedesk} label={t("Лобби")} link="/desk"></MenuItem>
				<MenuItem active={page.page == 'scenes'} icon={scenes} activeicon={activescenes} label={t("Трансляция")} link="/scenes"></MenuItem>
				<MenuItem2 active={page.page == 'program'} icon={program} activeicon={activeprogram} label={t("Программа")} link="/program"></MenuItem2>
				<MenuItem active={page.page == 'networking'} icon={networking} activeicon={activenetworking} label={t("Нетворкинг")} link="/networking"></MenuItem>
				<MenuItem active={page.page == 'messages'} icon={messages} activeicon={activemessages} label={t("Сообщения")} link="/messages" notifications={newMessages}></MenuItem>
				<MenuItem active={page.page == 'conversations'} icon={conversations} activeicon={activeconversations} label={t("Переговорки")} link="/conversations"></MenuItem>
				<MenuItem active={page.page == 'exposure'} icon={exposure} activeicon={activeexposure} label={t("Партнеры")} link="/exposure"></MenuItem>
				<MenuItem active={page.page == 'presentations'} icon={presentations} activeicon={activepresentations} label={t("Презентации")} link="/presentations/day1"></MenuItem>

				<a target="_blank" href="https://events.nethouse.ru/buy_tickets/25206/" className="menu-item flex-center buy">
					<div className="menu-item-label">{'Купить билеты'}</div>
				</a>
			</div>
		);
	}
}

class MenuItem extends React.Component {
	render() {
		const { label, link, icon, activeicon, out = false, notifications = false, active } = this.props;
		const api = new IdeaFirstApiService();
		const curIcon = active ? activeicon : icon;

		return (
			<NavLink
				to={link}
				activeStyle={{
					background: '#ff5900',
				}}
				className="menu-item flex-center"
			>
				<div className="menu-item-icon-wrap">
					<img alt="" src={curIcon} className="menu-item-icon" />
					{((link === '/messages' || link === "/vip-assistent") && notifications) && <div className="menu-notify"></div>}
				</div>
				<div className="menu-item-label">{label}</div>
			</NavLink>
		);
	}
}

class MenuItem2 extends React.Component {
	render() {
		const { label, link, icon, activeicon, out = false, notifications = false, active } = this.props;
		console.log(active, label)
		const api = new IdeaFirstApiService();
		const curIcon = active ? activeicon : icon;

		return (
			<a target="_blank" href="https://soldoutconf.ru/program" className="menu-item flex-center">
				<div className="menu-item-icon-wrap">
					<img alt="" src={curIcon} className="menu-item-icon" />
					{((link === '/messages' || link === "/vip-assistent") && notifications) && <div className="menu-notify"></div>}
				</div>
				<div className="menu-item-label">{label}</div>
			</a>
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

const mapStateToProps = ({ user, page }) => {
	return {
		user: user,
		page: page,
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