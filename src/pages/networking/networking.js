import React from "react";
import "./networking.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import api from "./../../js/api";
import Header from "./../../components/header/index";
import posed from "react-pose";
import { isMobile } from "react-device-detect";
import { withTranslation } from "react-i18next";
import Translit from "../../components/translit";

import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class Networking extends React.Component {
	state = {
		searchText: "",
		searchFilter: "",
		users: [],
		pagination: {
			currentPage: 1,
			itemsOnPage: 9,
		},
	};

	searchSubmit = async (e) => {
		this.setState({
			searchFilter: this.state.searchText,
		});
    if (e)
      e.preventDefault();
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData = async () => {
		api.account
			.getNetworking()
			.then((res) => {
				res.users = res.users.map((user) => {
					user.avatar = user.avatar || "";
					user.company = user.company || "";
					user.first_name = user.first_name || "";
					user.last_name = user.last_name || "";
					user.email = user.email || "";
					user.phone = user.phone || "";
					user.position = user.position || "";
					user.range = user.range || "";
					user.read = user.read || "";
					user.social_site = user.social_site || "";
					user.user_id = user.user_id || "";
					user.what_looking = user.what_looking || "";
					user.what_offer = user.what_offer || "";

					return user;
				});

				this.setState({
					users: res.users,
				});
			})
			.catch((e) => console.log(e));
	};

	filterUsers = () => {
		return this.state.users.filter((user) => {
			const translit = new Translit();

			let userStr =
				user.first_name + " " + user.last_name + " " + user.position + " " + user.company;

			userStr += translit.t(userStr);

			return ~userStr.toLowerCase().indexOf(this.state.searchFilter.toLowerCase());
		});
	};

	onPageChange = (data) => {
		this.setState((prevState) => ({
			pagination: { ...prevState.pagination, currentPage: data },
		}));
	};

	onSerchTextChange = (e) => {
		this.setState({ searchText: e.target.value });
  };
  
  onSerchTextClear = (e) => {
    this.setState({ searchText: "" }, () => {
      this.searchSubmit()
    });
	};

	paginateUsers = () => {
		return this.filterUsers().slice(
			this.state.pagination.itemsOnPage * (this.state.pagination.currentPage - 1),
			this.state.pagination.itemsOnPage * this.state.pagination.currentPage
		);
	};

	textItemRender = (current, type, element) => {
		if (type === "prev") {
			return "<";
		}
		if (type === "next") {
			return ">";
		}
		return element;
	};

	render() {
		const { users, searchText, searchFilter } = this.state;
		const { data } = this.props.user;
		const t = this.props.t;

		const cards = this.paginateUsers().map((user, index) => {
			return (
				<div className="card" key={index}>
					<Link className="card-link2" to={"/messages/" + user.id}>
						<div className="row">
							<div className="col-4">
								<div className="ava">
									{user.avatar && (
										<img
											src={api.auth.getAvatarLocation() + user.avatar}
											alt=""
										/>
									)}
									{!user.avatar && (
										<img
											src={require("../../images/default-avatar.svg")}
											alt=""
										/>
									)}
								</div>
							</div>

							<div className="col d-flex justify-content-center flex-column">
								<div className="name">
									<Translit value={user.first_name + " " + user.last_name} />
								</div>
								<div className="desc">
									{user.position + " " + t("в") + " " + user.company}
								</div>
							</div>
						</div>

						<div className="title">Что предлагаю:</div>
						<div className="text">{user.what_offer}</div>
						<div className="title mt-5">Что ищу:</div>
						<div className="text">{user.what_looking}</div>
					</Link>
				</div>
			);
		});

		const search = (
			<div className="search">
				<form method="post" className="form-search" onSubmit={this.searchSubmit}>
					<div className="inp-search-wrap">
						<input
							type="text"
							className="inp-search col"
							placeholder="Search"
							onChange={this.onSerchTextChange}
							value={this.state.searchText}
						/>
						{searchText && <span className="clear-search" onClick={this.onSerchTextClear}></span>}
					</div>

					<input type="submit" value="" className="btn-search" />
				</form>
			</div>
		);

		return (
			<div id="networking">
				{!isMobile && <Header data={data}>{search}</Header>}

				{isMobile && <>{search}</>}

				<div className="container">
					<div className="card-list">{cards}</div>

					<Pagination
						pageSize={this.state.pagination.itemsOnPage}
						onChange={this.onPageChange}
						current={this.state.pagination.currentPage}
						total={this.filterUsers().length}
						itemRender={this.textItemRender}
						locale={"ru"}
					/>
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
	withTranslation(),
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(NetworkingContainer);
