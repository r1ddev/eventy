import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import ReactPaginate from 'react-paginate';

import "./admin-panel-blockchat-tab.scss";
import { withTranslation } from "react-i18next";
import { fetchUser } from "../../actions/user-actions";
import { fetchAdminUsers, fetchAdminBan } from "../../actions/adminusers-actions";
import Spinner from "../../components/spinner";
import api from "../../js/api";
import Translit from "../../components/translit";

import Pagination from "rc-pagination";
import Rules from "../../utils/rules";


class AdminPanelBlockchatTab extends React.Component {

	state = {
		searchText: "",
		searchFilter: "",
		users: [],
		pagination: {
			currentPage: 1,
			itemsOnPage: 15,
		},
	};


	componentDidUpdate(prevProps) {
		if (this.props.adminusers.users !== prevProps.adminusers.users && this.props.adminusers.users) {
			this.setState({
				users: this.props.adminusers.users,
			});
		}
	}


	searchSubmit = async (e) => {
		this.setState({
			searchFilter: this.state.searchText,
		});
		this.setState((prevState) => ({
			pagination: { ...prevState.pagination, currentPage: 1 },
		}));
		e.preventDefault();
	};


	onPageChange = (data) => {
		this.setState((prevState) => ({
			pagination: { ...prevState.pagination, currentPage: data },
		}));
	};

	paginateUsers = () => {
		console.log(this.filterUsers().slice(
			this.state.pagination.itemsOnPage * (this.state.pagination.currentPage - 1),
			this.state.pagination.itemsOnPage * this.state.pagination.currentPage
		).length)
		return this.filterUsers().slice(
			this.state.pagination.itemsOnPage * (this.state.pagination.currentPage - 1),
			this.state.pagination.itemsOnPage * this.state.pagination.currentPage
		);
	};



	filterUsers = () => {
		return this.state.users.filter((user) => {
			const translit = new Translit;

			let userStr = user.first_name + " " + user.last_name + " " + user.position + " " + user.company;

			userStr += translit.t(userStr);

			return ~userStr.toLowerCase().indexOf(this.state.searchFilter.toLowerCase());
		});
	};

	render() {
		const { users } = this.props.adminusers;

		let userlist = null;
		let origin = api.origin;

		if (users) userlist = this.paginateUsers().map((item) => {
			return (
				<div className={(item.chat_ban) ? "user-item blocked" : "user-item"} key={item.id}>
					<div className="id">{item.id}</div>
					<div className="avatar">
						{/* <img src={api.auth.getAvatarLocation() + item.avatar}></img> */}
					</div>
					<div className="name">{`| ${item.first_name} ${item.last_name}`}</div>
					<div className="email">{`| ${item.email}`}</div>

					{(!item.chat_ban) && <button className="block-btn" onClick={() => this.props.fetchAdminBan(item.id, 1)}>
						| <span>Заблокировать</span>
					</button>}

					{(!!item.chat_ban) && <button className="block-btn" onClick={() => this.props.fetchAdminBan(item.id, 0)}>
						| <span>Разблокировать</span>
					</button>}
				</div>
			)
		});

		const search = (
			<div className="search">
				<form method="post" onSubmit={this.searchSubmit}>
					<input
						type="text"
						className="input-search"
						placeholder="Search"
						onChange={(e) => {
							this.setState({ searchText: e.target.value });
						}}
					/>
					<input type="submit" value="" className="btn-search" />
				</form>
			</div>
		);

		return (
			<div id="admin-panel-blockchat-tab">	
				<div className="content">
					<div>
						{search}
					</div>
					{(!!users) && <div className="user-list">
						{userlist}
					</div>
					}
				</div>
				<div className="footer">
					{(this.paginateUsers().length > 0) && <Pagination
						pageSize={this.state.pagination.itemsOnPage}
						onChange={this.onPageChange}
						current={this.state.pagination.currentPage}
						total={this.filterUsers().length}
						itemRender={this.textItemRender}
						locale={"ru"}
					/>}
				</div>
			</div>
		);
	}
}

class AdminPanelBlockchatTabContainer extends React.Component {

	componentDidMount() {
		// this.props.fetchUser();
		this.props.fetchAdminUsers();
	}

	componentDidUpdate(prevProps) {
		if (this.props.user.user !== prevProps.user.user && this.props.user.user) {
			if (!new Rules().isModeratorHere(this.props.user.user.rules)) {
				this.props.history.push("/error");
			}
		}
	}
	render() {
		const { loading, user, error } = this.props.user;
		const { users } = this.props.adminusers;
		let errorUserPermissions = false;
		if (user) errorUserPermissions = error || (!new Rules().isModeratorHere(this.props.user.user.rules)); //moderator
		console.log(users);

		

		return (
			<>
				{!loading && !errorUserPermissions && <AdminPanelBlockchatTab {...this.props} loading={loading} />}
				{loading || errorUserPermissions && <Spinner big={1} />}
			</>
		);
	}
}


const mapStateToProps = ({ user, adminusers }) => {
	return {
		user,
		adminusers,
	};
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {
		fetchUser: fetchUser(apiService, dispatch),
		fetchAdminBan: (userId, banned) => fetchAdminBan(apiService, dispatch)(userId, banned),
		fetchAdminUsers: fetchAdminUsers(apiService, dispatch),
	};
};

export default compose(
	withTranslation(),
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(AdminPanelBlockchatTabContainer);
