import React from "react";
import "./networking.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from 'react-router-dom';
import api from './../../js/api';
import Header from './../../components/header/index';


class Networking extends React.Component {
	state = {
		searchText: "",
		searchFilter: "",
		users: []
	};

	searchSubmit = async (e) => {
		this.setState({
			searchFilter: this.state.searchText
		})
		e.preventDefault();
	};

	componentDidMount() {
		this.fetchData()
	}

	fetchData = async () => {
		api.account.getNetworking().then(res => {
			this.setState({
				users: res.user
			})
		}).catch(e => console.log(e))
	}

	render() {
		const { users, searchText, searchFilter } = this.state;
		const { data } = this.props.user

		return (
			<div id="networking">

				<Header data={data}>
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

					<div className="col d-flex align-items-center p-0">
						<a href="#" className="action-link">
							Связь с организаторами
						</a>
					</div>
				</Header>

				<div className="container">
					<div className="card-list">
						{users.filter(user => {
							return ~user.first_name.toLowerCase().indexOf(searchFilter.toLowerCase()) ||
								~user.position.toLowerCase().indexOf(searchFilter.toLowerCase()) ||
								~user.company.toLowerCase().indexOf(searchFilter.toLowerCase()) ||
								~(user.what_offer || "").toLowerCase().indexOf(searchFilter.toLowerCase()) ||
								~(user.what_looking || "").toLowerCase().indexOf(searchFilter.toLowerCase())
						})
							.map((user, index) => {
								return (
									<div className="" key={index}>
										<div className="card">
											<div className="row">
												<div className="col-4">
													<div className="ava">
														<img src={api.auth.getAvatarLocation() + user.avatar} alt="" />
													</div>
												</div>

												<div className="col d-flex justify-content-center flex-column">
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
