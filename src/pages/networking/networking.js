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

import { Collapse } from "react-collapse";

import specializations from "../../consts/specializations-list";
import Select from "react-select";

import OutsideClickHandler from "react-outside-click-handler";

class Networking extends React.Component {
	state = {
		searchText: "",
		searchFilter: "",
		users: [],
		pagination: {
			currentPage: 1,
			itemsOnPage: 9,
		},
		filterOptions: {
			specialization: undefined,
			onlyWhatLooking: false,
			hasWhatOffer: false,
		},
		filterOpen: false,
	};

	searchSubmit = async (e) => {
		this.setState({
			searchFilter: this.state.searchText,
		});
		if (e) e.preventDefault();
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

			let filterSpecialization = this.state.filterOptions.specialization ? (user.specialization == this.state.filterOptions.specialization) : true;
			let filterHasWhatOffer = this.state.filterOptions.hasWhatOffer ? user.what_offer.length > 0 : true;
			let filterOnlyWhatLooking = this.state.filterOptions.onlyWhatLooking ? (user.what_looking.length > 0 && user.what_offer.length == 0) : true;

			return ~userStr.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) && 
				filterSpecialization &&
				filterHasWhatOffer &&
				filterOnlyWhatLooking;
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
			this.searchSubmit();
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

	toggleFilterOpen = () => {
		this.setState((prev) => ({
			filterOpen: !prev.filterOpen,
		}));
	};

	onOnlyWhatLookingChange = (e) => {

		let filterOptions = this.state.filterOptions
		filterOptions.onlyWhatLooking = e.target.checked

		this.setState({
			filterOptions: filterOptions
		});
	};

	onHasWhatOfferChange = (e) => {
		let filterOptions = this.state.filterOptions
		filterOptions.hasWhatOffer = e.target.checked

		this.setState({
			filterOptions: filterOptions
		});
	};

	onSpecializationChange = (e) => {
		let filterOptions = this.state.filterOptions
		if (e) {
			filterOptions.specialization = e.value
		} else {
			filterOptions.specialization = undefined
		}

		this.setState({
			filterOptions: filterOptions
		});
	};

	render() {
		const { users, searchText, searchFilter, filterOpen, filterOptions } = this.state;
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
						{/* 
						<div className="title">Что предлагаю:</div>
						<div className="text">{user.what_offer}</div>
						<div className="title mt-5">Что ищу:</div>
						<div className="text">{user.what_looking}</div> */}
					</Link>
				</div>
			);
		});

		const currentSpecialization = specializations.find(s => s.value == filterOptions.specialization)

		const filterContainer = (
			<div
				className={"filter-container" + (isMobile ? " filter-container-mobile" : "")}
				style={filterOpen && !isMobile ? { position: "absolute" } : {}}>
				<div className="row">
					<div className="col-md-auto d-flex align-items-center">Специализация:</div>
					<div className="col-md">
						<Select
							isClearable={true}
							onChange={this.onSpecializationChange}
							value={currentSpecialization}
							options={specializations}
							className="p-0"
							placeholder={t("Специализация")}
							required={true}
						/>
					</div>
				</div>

				<div className="custom-control custom-checkbox my-3">
					<input
						type="checkbox"
						className="custom-control-input"
						id="filter1"
						checked={this.state.filterOptions.onlyWhatLooking}
						onChange={this.onOnlyWhatLookingChange}
					/>
					<label className="custom-control-label" htmlFor="filter1">
						Только ищу
					</label>
				</div>

				<div className="custom-control custom-checkbox my-3">
					<input
						type="checkbox"
						className="custom-control-input"
						id="filter2"
						checked={this.state.filterOptions.hasWhatOffer}
						onChange={this.onHasWhatOfferChange}
					/>
					<label className="custom-control-label" htmlFor="filter2">
						Что-то предлагаю
					</label>
				</div>
			</div>
		);

		const search = (
			<div className="search">
				<form method="post" className="form-search" onSubmit={this.searchSubmit}>
					<div className="input-btn">
						<div className="inp-search-wrap">
							<input
								type="text"
								className="form-control inp-search col"
								placeholder="Search"
								onChange={this.onSerchTextChange}
								value={this.state.searchText}
							/>
							{searchText && (
								<span
									className="clear-search"
									onClick={this.onSerchTextClear}></span>
							)}
						</div>

						<input type="submit" value="" className="btn btn-search" />
					</div>

					<button className="btn btn-filter" onClick={this.toggleFilterOpen}></button>
				</form>

				{isMobile && (
					<Collapse isOpened={filterOpen} className="filter-container-wrap">
						{filterContainer}
					</Collapse>
				)}

				{!isMobile && (
					<OutsideClickHandler
						onOutsideClick={() => {
							this.setState({
								filterOpen: false,
							});
						}}>
						<Collapse isOpened={filterOpen} className="filter-container-wrap">
							{filterContainer}
						</Collapse>
					</OutsideClickHandler>
				)}
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
