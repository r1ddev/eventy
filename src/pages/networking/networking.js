import React from "react";
import "./networking.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";

class Networking extends React.Component {
	render() {
		return (
			<div id="networking">
				<div className="header">
					<div className="container">
						<div className="row">
							<div className="col d-flex align-items-center">
								<div className="search row m-0">
									<input
										type="text"
										class="inp-search col"
										placeholder="Search"
									/>
									<input type="submit" value="" class="btn-search" />
								</div>
							</div>

							<div className="col-md-auto profile row m-0">
								<div className="col d-flex align-items-center p-0">
									<a href="#" class="action-link">
										Связь с организаторами
									</a>
								</div>
								<div className="col-auto ava">
									<img
										src={require("../../images/networking-card-image-placeholder.png")}
										alt=""
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="card-list">
						<div className="">
							<div className="card">
								<div className="row">
									<div className="col-auto">
										<div className="ava">
											<img
												src={require("../../images/networking-card-image-placeholder.png")}
												alt=""
												srcset=""
											/>
										</div>
									</div>

									<div className="col">
										<div className="name">ЕВГЕНИЙ ДУБЕНЮК</div>
										<div className="desc">Креативный директор Smit.events</div>
									</div>
								</div>

								<div className="title">Что предлагаю:</div>
								<div className="text">
									Проконсультирую вас по ивентам (до 100 символов)
								</div>

								<div className="title mt-5">Что ищу:</div>
								<div className="text">
									Вдохновения, новые контакты. (до 100 символов)
								</div>
							</div>
						</div>

						<div className="">
							<div className="card">
								<div className="row">
									<div className="col-auto">
										<div className="ava">
											<img
												src={require("../../images/networking-card-image-placeholder.png")}
												alt=""
											/>
										</div>
									</div>

									<div className="col">
										<div className="name">ЕВГЕНИЙ ДУБЕНЮК</div>
										<div className="desc">Креативный директор Smit.events</div>
									</div>
								</div>

								<div className="title">Что предлагаю:</div>
								<div className="text">
									Проконсультирую вас по ивентам (до 100 символов)
								</div>

								<div className="title mt-5">Что ищу:</div>
								<div className="text">
									Вдохновения, новые контакты. (до 100 символов)
								</div>
							</div>
						</div>

						<div className="">
							<div className="card">
								<div className="row">
									<div className="col-auto">
										<div className="ava">
											<img
												src={require("../../images/networking-card-image-placeholder.png")}
												alt=""
											/>
										</div>
									</div>

									<div className="col">
										<div className="name">ЕВГЕНИЙ ДУБЕНЮК</div>
										<div className="desc">Креативный директор Smit.events</div>
									</div>
								</div>

								<div className="title">Что предлагаю:</div>
								<div className="text">
									Проконсультирую вас по ивентам (до 100 символов)
								</div>

								<div className="title mt-5">Что ищу:</div>
								<div className="text">
									Вдохновения, новые контакты. (до 100 символов)
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
class NetworkingContainer extends React.Component {
	render() {
		return <Networking />;
	}
}

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(NetworkingContainer);
