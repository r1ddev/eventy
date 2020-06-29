import React from 'react';
import './header-mobile.scss'
import { Link } from 'react-router-dom';
import api from '../../js/api';
import MenuMobile from '../menu-mobile';

class HeaderMobile extends React.Component {
	state = {
		activeLogo: false
	}

	onSetLogo = (status) => {
		this.setState({
			activeLogo: status
		})
	}

	render() {
		const { activeLogo } = this.state;

		return (
			<div id="header-mobile">
				<MenuMobile onSetLogo={this.onSetLogo} />
				<div className={(activeLogo) ? "logo-mobile active" : "logo-mobile"}>
					smit.events
				</div>
				<div id="profile-link-mobile"></div>
			</div>
		)
	}
}

export default HeaderMobile;