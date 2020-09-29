import React from "react";
import { NavLink } from "react-router-dom";
import { isMobileOnly } from 'react-device-detect';
import "./menu-mobile.scss";

import withApiService from "../hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { fetchUser } from '../../actions/user-actions';
import IdeaFirstApiService from "../../services/idea-first-api-service";
import { withTranslation } from "react-i18next";


const logo = require("../../images/icons/logo.svg");
const closebtn = require("../../images/menu/close-icon.svg");
const desk = require("../../images/icons/menu/desk.svg");
const scenes = require("../../images/icons/menu/scenes.svg");
const presentations = require("../../images/icons/menu/presentations.svg");
const networking = require("../../images/icons/menu/networking.svg");
const messages = require("../../images/icons/menu/messages.svg");
const exposure = require("../../images/icons/menu/exposure.svg");
const conversations = require("../../images/icons/menu/conversations.svg");



class MenuMobile extends React.Component {

	state = {
		open: false,
	}

	onOpen = () => {
		this.setState({
			open: true
		})
		this.props.onSetLogo(true);

	}

	onChangeMenu = () => {
		if (this.state.open) {
			this.onClose();
		} else {
			this.onOpen();
		}

	}

	onClose = () => {
		this.setState({
			open: false
		})
		this.props.onSetLogo(false);
	}

	render() {
		const { open } = this.state;
		const t = this.props.t;

		return (
			<div className="menu-mobile">
				<div
					className={(open) ? "menu-mobile--icon active" : "menu-mobile--icon"}
					onClick={this.onChangeMenu}>
				</div>
				<div
					className={(open) ? "menu-mobile--dimmer active" : "menu-mobile--dimmer"}
					onClick={this.onClose}>
				</div>
				<div
					className={(open) ? "menu-mobile--item-container active" : "menu-mobile--item-container"}
				>
					<div className="icon-list">
						<MenuItemMobile link='/desk' icon={desk} label={t('Лобби')} onClose={this.onClose} />
						<MenuItemMobile link='/scenes' icon={scenes} label={t('Сцены')} onClose={this.onClose} />
						<MenuItemMobile link='/networking' icon={networking} label={t('Нетворкинг')} onClose={this.onClose} />
						<MenuItemMobile link='/messages' icon={messages} label={t('Сообщения')} onClose={this.onClose} />
						<div className="icon-item"></div>
						<MenuItemMobile link='/conversations' icon={conversations} label={t('Переговорки')} onClose={this.onClose} />
						<MenuItemMobile link='/exposure' icon={exposure} label={t('Партнеры')} onClose={this.onClose} />
						<MenuItemMobile link='/presentations/day1' icon={presentations} label={t('Презентации')} onClose={this.onClose} />
						<div className="icon-item" onClick={this.onClose} style={{ backgroundImage: `url(${closebtn})`, backgroundPosition: 'center' }}></div>

					</div>
				</div>

			</div>
		);
	}
}

class MenuItemMobile extends React.Component {

	render() {
		const { link, icon, label, onClose } = this.props;

		return (
			<NavLink
				to={link}
				activeStyle={{
					backgroundColor: '#22d671'
				}}
				className="icon-item"
				style={{ backgroundImage: `url(${icon})` }}
				onClick={onClose}
			>
				<span className="icon-label">{label}</span>
			</NavLink>
		)
	}

}


class MenuMobileContainer extends React.Component {

	componentDidMount() {
	}

	render() {

		return (
			<MenuMobile {...this.props} />
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
	connect(mapStateToProps, mapDispatchToProps))(MenuMobileContainer);