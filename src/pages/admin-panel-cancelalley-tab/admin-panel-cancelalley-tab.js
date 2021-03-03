import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import ReactPaginate from 'react-paginate';

import "./admin-panel-cancelalley-tab.scss";
import { withTranslation } from "react-i18next";
import { fetchUser } from "../../actions/user-actions";
import { fetchAdminAlleyUsers } from "../../actions/adminalleyusers-actions";
import Spinner from "../../components/spinner";
import api from "../../js/api";
import Translit from "../../components/translit";

import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import IdeaFirstApiService from "../../services/idea-first-api-service";
import Rules from "../../utils/rules";

class AdminPanelCancelalleyTab extends React.Component {

	state = {
		searchText: "",
		searchFilter: "",
		users: [],
		pagination: {
			currentPage: 1,
			itemsOnPage: 5,
		},
	};


	componentDidUpdate(prevProps) {
		if (this.props.adminalleyusers.users !== prevProps.adminalleyusers.users && this.props.adminalleyusers.users) {
			this.setState({
				users: this.props.adminalleyusers.users,
			});
		}
	}

	cancelAlley= (room_id, slot)=>{
		new IdeaFirstApiService().adminCancelAlley(room_id, slot).then(
			(res)=>{
			  // alert('ok');
			 this.props.fetchAdminAlleyUsers();
			}
		)

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
		const { users } = this.props.adminalleyusers;

		let userlist = null;
		let roomlist = null;

		roomlist=(rooms)=>{
			return rooms.map((room)=>{
				return(
					<div className="room-item" key={room.id}>
						<div className="room-name">{room.name}</div>
						<div className="time">{room.time}</div>
							<button className="block-btn" onClick={() => {this.cancelAlley(room.room_id, room.id)}}>
						<span>Отменить</span>
						</button>
					</div>
				)
			})
		}

		if (users) userlist = this.paginateUsers().map((item) => {
			return (
				<div className="user-item" key={item.id}>
					<div className="user-info">
						<div className="id">{item.id}</div>
						<div className="avatar"><img src={api.auth.getAvatarLocation() + item.avatar}></img></div>
						<div className="name">{`| ${item.first_name} ${item.last_name}`}</div>
						<div className="email">{`| ${item.email}`}</div>
					</div>
					<div className="room-list">
						{roomlist(item.rooms)}
						
						
					</div>
					<hr style={{width: '100%'}}/>

					
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
			<div id="admin-panel-cancelalley-tab">	
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

class AdminPanelCancelalleyTabContainer extends React.Component {

	componentDidMount() {
		// this.props.fetchUser();
		this.props.fetchAdminAlleyUsers();
	}

	componentDidUpdate(prevProps) {
		if (this.props.user.user !== prevProps.user.user && this.props.user.user) {
			if (!new Rules().isModeratorHere(this.props.user.user.rules))  {
				this.props.history.push("/error");
			}
		}

		
	}
	render() {
		const { loading, user, error } = this.props.user;
	
		let errorUserPermissions = false;
		if (user) errorUserPermissions = error || (!new Rules().isModeratorHere(this.props.user.user.rules)); //moderator

		console.log(this.props.adminalleyusers)


		return (
			<>
				{!loading && !errorUserPermissions && <AdminPanelCancelalleyTab {...this.props} loading={loading} />}
				{(loading || errorUserPermissions) && <Spinner big={1} />}
			</>
		);
	}
}


const mapStateToProps = ({ user, adminalleyusers }) => {
	return {
		user,
		adminalleyusers,
	};
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {
		fetchUser: fetchUser(apiService, dispatch),
		fetchAdminAlleyUsers: fetchAdminAlleyUsers(apiService, dispatch),
	};
};

  export default compose(
	withTranslation(),
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(AdminPanelCancelalleyTabContainer);
