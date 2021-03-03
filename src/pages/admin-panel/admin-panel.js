import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import ReactPaginate from 'react-paginate';

import "./admin-panel.scss";
import { withTranslation } from "react-i18next";
import { fetchUser } from "../../actions/user-actions";
import { fetchAdminUsers, fetchAdminBan } from "../../actions/adminusers-actions";
import Spinner from "../../components/spinner";
import api from "./../../js/api";
import Translit from "../../components/translit";

import Pagination from "rc-pagination";
import AdminPanelBlockchatTab from "../admin-panel-blockchat-tab";
import AdminPanelCancelalleyTab from "../admin-panel-cancelalley-tab";
import Rules from "../../utils/rules";

class AdminPanel extends React.Component {

	state = {
		activeTab: 'chatBlock',
	};

	setTab = (tab) =>{
		this.setState({
			activeTab: tab,
		})
	}

	render() {
		const{
			activeTab
		} = this.state;
		


		return (
			<div id="admin-panel">
				<div className="header">

					<div 
					className = {(activeTab === "chatBlock")?"tab-item active":"tab-item"} 
					onClick={()=>this.setTab('chatBlock')}>
						Блокировка чатов
					</div>

					<div 
					className = {(activeTab === "cancelAlley")?"tab-item active":"tab-item"} 
					onClick={()=>this.setTab('cancelAlley')}>
						Отмена брони
					</div>

					
				</div>
				 {(activeTab === "chatBlock")&&<AdminPanelBlockchatTab/>}
				 {(activeTab === "cancelAlley")&&<AdminPanelCancelalleyTab/>}

			</div>
		);
	}
}

class AdminPanelContainer extends React.Component {

	componentDidMount() {
		this.props.fetchUser();
		// this.props.fetchAdminUsers();
		console.log('mount')
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
		let errorUserPermissions = false;
		if (user) errorUserPermissions = error || (!new Rules().isModeratorHere(this.props.user.user.rules)); //moderator
		// console.log(users);

		return (
			<div style={{ height: "100vh", width: "100%" }}>
				{!loading && !errorUserPermissions && <AdminPanel {...this.props} loading={loading} />}
				{loading || errorUserPermissions && <Spinner big={1} />}
			</div>
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
)(AdminPanelContainer);
