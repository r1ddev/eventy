import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import styledComponents from "styled-components";
import AvatarUploader from "react-avatar-uploader";
import Select from "react-select";

import "./css/App.scss";
import "./css/registration.scss";
import api from "./js/api";

class Registration extends React.Component {
	state = {
		name: "",
		lastName: "",
		company: "",
		position: "",
		phone: "",
		email: "",
		soc: "",
		whatSearch: "",
		whatOffer: "",
		shareContact: true,
		tags: [],

		disabled: false,
	};

	submit = (e) => {
		const {
			name,
			lastName,
			company,
			position,
			phone,
			email,
			soc,
			whatSearch,
			whatOffer,
			shareContact,
		} = this.state;

		this.setState({
			disabled: true,
		});

		api.auth
			.registration(
				name,
				lastName,
				company,
				position,
				phone,
				email,
				soc,
				whatSearch,
				whatOffer,
				shareContact
			)
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				console.log(e);

				this.setState({ disabled: false });

				api.errorHandler(e, {
					404: () => {
						alert("alert");
					},
				});
			});

		e.preventDefault();
	};

	render() {
		const {
			name,
			lastName,
			company,
			position,
			phone,
			email,
			soc,
			whatSearch,
			whatOffer,
			shareContact,
			disabled,
		} = this.state;
		return (
			<div className="bg-light h-100">
				<div className="container h-100 flex-center" id="registration">
					<div className="registration-wrap">
						<form action="" method="post" onSubmit={this.submit}>
							<div className="row m-0">
								<div className="col-md-5 left p-5">
									<div className="ava p-3 flex-center">
										<AvatarUploader
											name="avatar"
											size={100}
											uploadURL="http://localhost:3000"
											fileType={"image/png"}
										/>
									</div>
									<div className="field mt-3">
										<input
											type="text"
											className="form-control r1-inp"
											placeholder="Имя"
											value={name}
											onChange={(e) => {
												this.setState({
													name: e.target.value,
												});
											}}
											required
										/>
									</div>
									<div className="field mt-3">
										<input
											type="text"
											className="form-control r1-inp"
											placeholder="Фамилия"
											value={lastName}
											onChange={(e) => {
												this.setState({
													lastName: e.target.value,
												});
											}}
											required
										/>
									</div>
									<div className="field mt-3">
										<input
											type="text"
											className="form-control r1-inp"
											placeholder="Компания"
											value={company}
											onChange={(e) => {
												this.setState({
													company: e.target.value,
												});
											}}
											required
										/>
									</div>
									<div className="field mt-3">
										<input
											type="text"
											className="form-control r1-inp"
											placeholder="Должность"
											value={position}
											onChange={(e) => {
												this.setState({
													position: e.target.value,
												});
											}}
											required
										/>
									</div>
									<div className="btn-wrap">
										<button
											type="submit"
											className="btn mt-3"
											disabled={disabled}>
											<img
												src={require("./images/registration-btn.png")}
											/>
										</button>
									</div>
								</div>

								<div className="col-md-7 right p-5">
									<div className="field">
										<input
											type="text"
											className="form-control r1-inp"
											placeholder="Телефон"
											value={phone}
											onChange={(e) => {
												this.setState({
													phone: e.target.value,
												});
											}}
										/>
									</div>

									<div className="field mt-4">
										<input
											type="email"
											className="form-control r1-inp"
											placeholder="Email"
											value={email}
											onChange={(e) => {
												this.setState({
													email: e.target.value,
												});
											}}
										/>
									</div>

									<div className="field mt-4">
										<input
											type="text"
											className="form-control r1-inp"
											placeholder="Ссылка на соц. сеть"
											value={soc}
											onChange={(e) => {
												this.setState({
													soc: e.target.value,
												});
											}}
										/>
									</div>

									<div className="field mt-4">
										<textarea
											className="form-control r1-inp"
											placeholder="Что ищу"
											value={whatSearch}
											maxLength="150"
											onChange={(e) => {
												this.setState({
													whatSearch: e.target.value,
												});
											}}></textarea>
									</div>

									<div className="field mt-4">
										<textarea
											className="form-control r1-inp"
											placeholder="Что предлагаю"
											value={whatOffer}
											maxLength="150"
											onChange={(e) => {
												this.setState({
													whatOffer: e.target.value,
												});
											}}></textarea>
									</div>

									<div className="field mt-4">
										<Select
											placeholder="Выберите теги"
											options={[
												{
													value: "creator",
													label: "Креатор",
												},
												{
													value: "necreator",
													label: "Не креатор",
												},
											]}
											isMulti
											theme={(theme) => ({
												...theme,
												borderRadius: 10,
												colors: {
													...theme.colors,
													primary: "#f4004d",
												},
											})}
											onChange={(e) => {
												this.setState({ tags: e });
											}}
										/>
									</div>

									<div className="field mt-4">
										<div className="row">
											<div className="col d-flex align-items-center">
												Хочу ли я делиться контактами?
											</div>
											<div className="col-auto">
												<div className="row">
													<div className="col">
														<div
															className={
																"radio" +
																(shareContact
																	? " radio-selected"
																	: "")
															}
															onClick={() => {
																this.setState({
																	shareContact: true,
																});
															}}>
															да
														</div>
													</div>
													<div className="col">
														<div
															className={
																"radio" +
																(shareContact
																	? ""
																	: " radio-selected")
															}
															onClick={() => {
																this.setState({
																	shareContact: false,
																});
															}}>
															нет
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Registration;
