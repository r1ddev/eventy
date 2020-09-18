import React from "react";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import ReactPaginate from 'react-paginate';

import "./admin-panel.scss";
import { withTranslation } from "react-i18next";

class AdminPanel extends React.Component {


	render() {

		const search = (
			<div className="search">
				<form method="post" onSubmit={this.searchSubmit}>
					<input
						type="text"
						className="input-search"
						placeholder="Search"
						onChange={(e) => {
							// this.setState({ searchText: e.target.value });
						}}
					/>
					<input type="submit" value="" className="btn-search" />
				</form>
			</div>
		);

		return (
			<div id="admin-panel">
				<div className="header">
					<p>/admin-panel</p>
				</div>
				<div className="content">
					<div>
						{search}
					</div>
					<div className="user-list">

						<div className="user-item">
							<div className="id">1223</div>
							<div className="avatar"><img src="https://sun9-43.userapi.com/c9991/u132322200/a_ebbda311.jpg?ava=1"></img></div>
							<div className="name">| Харитон Мельников</div>
							<div className="email">| HV@gmail.com </div>
							<button className="block-btn">| <span>Заблокировать</span></button>
						</div>

						<div className="user-item">
							<div className="id">1223</div>
							<div className="avatar"><img src="https://sun9-43.userapi.com/c9991/u132322200/a_ebbda311.jpg?ava=1"></img></div>
							<div className="name">| Харитон Мельников</div>
							<div className="email">| HV@gmail.com </div>
							<button className="block-btn">| <span>Заблокировать</span></button>
						</div>

					</div>
				</div>
				<div className="footer">
					<ReactPaginate
						previousLabel={'previous'}
						nextLabel={'next'}
						breakLabel={'...'}
						breakClassName={'break-me'}
						pageCount={4}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={() => { }}
						containerClassName={'pagination'}
						subContainerClassName={'pages pagination'}
						activeClassName={'active'}
					/>
				</div>
			</div>
		);
	}
}

class AdminPanelContainer extends React.Component {

	render() {

		return (
			<AdminPanel {...this.props} />
		);
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
	withTranslation(),
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(AdminPanelContainer);
