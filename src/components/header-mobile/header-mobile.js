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
		const logo = require("../../images/icons/menu/mini-logo.svg");

		return (
			<div id="header-mobile">
				<MenuMobile onSetLogo={this.onSetLogo} />
				<div className={(activeLogo) ? "logo-mobile active" : "logo-mobile"}>
					{/* <span className="logo-mobile--text">smit</span>
					<span className="logo-mobile--text">.</span>
					<span className="logo-mobile--text">events</span> */}

					<span className="logo-mobile--icon">
						<img alt="" src={logo}></img>
					</span>
				</div>
				<Link to='/profile' id="profile-link-mobile"></Link>
			</div>
		)
	}
}

export default HeaderMobile;