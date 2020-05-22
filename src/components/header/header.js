import React from 'react';
import './header.scss'
import { Link } from 'react-router-dom';
import api from './../../js/api';

class Header extends React.Component {

	state = {}

	render() {

		const { data, className } = this.props

		return (
			<div className={className + " header profile-header"}>
				<div className="container">
					<div className="row">
						<div className="col d-flex align-items-center">
							{this.props.children && this.props.children[0]}
						</div>

						<div className="col-md-auto profile row m-0">
							{this.props.children && this.props.children[1]}
							<div className="col-auto ava">
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
				</div>
			</div>
		)
	}
}

export default Header;