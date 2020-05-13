import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./css/App.scss";
import "./css/registration.scss";

class Registration extends React.Component {
	state = {
		name: "asdasd",
		lastName: "",
		company: "",
		position: "",
	};

	render() {
		const { name, lastName, company, position } = this.state;
		return (
			<div className="container" id="registration">
				<div className="registration-wrap">
					<div className="row m-0">
						<div className="col-md-4 left p-3">
							<div className="ava p-2 flex-center">
								<div className="upload"></div>
							</div>
							<div className="field mt-3">
								<input
									type="text"
									className="form-control r1-inp"
									placeholder="Имя"
									value={name}
									onChange={(e) => {
										this.setState({ name: e.target.value });
									}}
								/>
							</div>
							<div className="field mt-3">
								<input
									type="text"
									className="form-control r1-inp"
									placeholder="Фамилия"
								/>
							</div>
							<div className="field mt-3">
								<input
									type="text"
									className="form-control r1-inp"
									placeholder="Компания"
								/>
							</div>
							<div className="field mt-3">
								<input
									type="text"
									className="form-control r1-inp"
									placeholder="Должность"
								/>
							</div>
							<div className="btn-wrap">
								<button type="submit" className="btn mt-3">
									<img
										src={require("./images/registration-btn.png")}
									/>
								</button>
							</div>
						</div>

						<div className="col-md-8 right">
							<div className="field mt-3">
								<input
									type="text"
									className="form-control r1-inp"
									placeholder="Телефон"
								/>
							</div>

							<div className="field mt-3">
								<input
									type="text"
									className="form-control r1-inp"
									placeholder="Email"
								/>
							</div>

							<div className="field mt-3">
								<input
									type="text"
									className="form-control r1-inp"
									placeholder="Ссылка на соц. сеть"
								/>
							</div>

							<div className="field mt-3">
								<textarea className="form-control r1-inp"></textarea>
							</div>

							<div className="field mt-3">
								<textarea className="form-control r1-inp"></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Registration;
