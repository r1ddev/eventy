import React from "react";
import "./exposure.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import Header from "../../components/header";

const partners = [
	{
		logo: "https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
		name: "UNIVEST",
		desc:
			"SMIT SCREEN — это сеть носимых экранов для таргетированного показа рекламы в городе и местах высокого скопления людей. Вашу рекламу увидят там, где вы захотите",
	},
	{
		logo: "https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
		name: "UNIVEST",
		desc:
			"SMIT SCREEN — это сеть носимых экранов для таргетированного показа рекламы в городе и местах высокого скопления людей. Вашу рекламу увидят там, где вы захотите",
	},
	{
		logo: "https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
		name: "UNIVEST",
		desc:
			"SMIT SCREEN — это сеть носимых экранов для таргетированного показа рекламы в городе и местах высокого скопления людей. Вашу рекламу увидят там, где вы захотите",
	},
];

class Exposure extends React.Component {
	render() {
		let partnersList = partners.map((partner) => {
			return (
				<div className="card">
					<div className="row head m-0">
						<div className="col-6 name flex-center">{partner.name}</div>
						<div className="col logo flex-center">
							<img src={partner.logo} alt="" />
						</div>
					</div>
					<div className="desc">{partner.desc}</div>
				</div>
			);
		});

		return (
			<div id="exposure">
				<Header className="fixed" data={this.props.user.data} />

				<div className="container">
					<div className="card-list">{partnersList}</div>
				</div>
			</div>
		);
	}
}

class ExposureContainer extends React.Component {
	render() {
		return <Exposure {...this.props} />;
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
)(ExposureContainer);
