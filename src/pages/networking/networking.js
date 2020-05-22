import React from "react";
import "./networking.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from 'react-router-dom';
import api from './../../js/api';


class Networking extends React.Component {
	state = {
		searchText: "",
		users: []
	};

	searchSubmit = async (e) => {
		e.preventDefault();
	};

	componentDidMount() {
		this.fetchData()
	}

	fetchData = async () => {

		if (this.props.user.isLogin) {
			api.account.getNetworking().then(res => {
				this.setState({
					users: res.user
				})
			}).catch(e => console.log(e))
		} else {
			this.props.history.push("/error")
		}
	}

	render() {
		const { users, searchText } = this.state;
		return (
			<div id="networking">
				<div className="header profile-header">
					<div className="container">
						<div className="row">
							<div className="col d-flex align-items-center">
								<div className="search">
									<form
										method="post"
										className="row m-0"
										onSubmit={this.searchSubmit}>
										<input
											type="text"
											className="inp-search col"
											placeholder="Search"
											onChange={(e) => {
												this.setState({ searchText: e.target.value });
											}}
										/>
										<input type="submit" value="" className="btn-search" />
									</form>
								</div>
							</div>

							<div className="col-md-auto profile row m-0">
								<div className="col d-flex align-items-center p-0">
									<a href="#" className="action-link">
										Связь с организаторами
									</a>
								</div>
								<div className="col-auto ava">
									<Link to="/profile">
										<img
											src={require("../../images/networking-card-image-placeholder.png")}
											alt=""
										/>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="card-list">
						{users.filter(user => {
							return ~user.first_name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) ||
								~user.position.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) ||
								~user.company.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) ||
								~user.what_offer.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) ||
								~user.what_looking.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase())
						})
							.map((user, index) => {
								return (
									<div className="" key={index}>
										<div className="card">
											<div className="row">
												<div className="col-auto">
													<div className="ava">
														<img src={api.auth.getAvatarLocation() + user.avatar} alt="" />
													</div>
												</div>

												<div className="col">
													<div className="name">{user.first_name}</div>
													<div className="desc">{user.position + " в " + user.company}</div>
												</div>
											</div>

											<div className="title">Что предлагаю:</div>
											<div className="text">{user.what_offer}</div>

											<div className="title mt-5">Что ищу:</div>
											<div className="text">{user.what_looking}</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}
class NetworkingContainer extends React.Component {
	render() {
		return <Networking {...this.props} />;
	}
}

const mapStateToProps = ({ user }) => {
	return {
		user,
	};
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(NetworkingContainer);
