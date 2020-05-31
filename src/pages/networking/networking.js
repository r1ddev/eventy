import React from "react";
import "./networking.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from 'react-router-dom';
import api from './../../js/api';
import Header from './../../components/header/index';
import posed from 'react-pose';

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
				users: res.users
			})
		}).catch(e => console.log(e))
	}

	render() {
		const { users, searchText, searchFilter } = this.state;
		const { data } = this.props.user

		const Card = posed.div({
			draggable: true,
			init: { scale: 1 },
			drag: {
				scale: 1.1,
				zIndex: 55
			},

			dragEnd: {
				x: 0,
				y: 0,
				transition: { type: 'spring' }
			}
		});

		return (
			<div id="networking" >

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
						<Link to="/messages/5" className="action-link">
							Связь <br />с организаторами
						</Link>
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
									// <Card className="" key={index}>
									<div className="card" key={index}>
										<Link className="card-link2" to={"/messages/" + user.id}>
											<div className="row">
												<div className="col-4">
													{/* <Link className="card-link2" to={"/messages/" + user.id}> */}
													<div className="ava">
														{/* <Link className="card-link2" to={"/messages/" + user.id}> */}
														{user.avatar && <img src={api.auth.getAvatarLocation() + user.avatar} alt="" />}
														{!user.avatar && <img src={require("../../images/default-avatar.svg")} alt="" />}
														{/* </Link> */}
													</div>
													{/* </Link> */}
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
										</Link>
									</div>

									// </Card>
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
