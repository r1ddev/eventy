import React from "react";
import "./exposure.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import Header from "../../components/header";
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';


const partners = [
	{
		logo: require("../../images/partners/smitstudio.png"),
		background: require("../../images/partners/smitstudio-bg.png"),
		backgroundPosition: 'top',
		name: "Smit.Studio",
		desc:
			(<p>

				"SMIT.studio - эксперты в интерактивом маркетинге <br/> Наращивайте своё сообщество лояльными игроками, которых в будущем конвертируете в адвокатов бренда"
			</p>
		),
				link: "https://smit.studio/"
	},
	{
		logo: require("../../images/partners/smitscreen.png"),
		background: require("../../images/partners/smitscreen-bg.png"),
		backgroundPosition: 'center',
		name: "Smit.Screen",
		desc:
			"Инвестиционная компания, которая открывает перед клиентами возможности в мире ценных бумаг и фондового рынка.",
		link: "https://smit.studio/"
	},
];

class Exposure extends React.Component {
	render() {
		let partnersList = partners.map((partner) => {
			return (

				<a style={{
					backgroundImage: `url(${partner.background})`, backgroundSize: 'cover', backgroundPosition: partner.backgroundPosition, backgroundRepeat: 'norepeat'
				}}
					target="_blank"
					href={partner.link}
					className="card"
					onClick={() => this.props.postUrl(partner.link)}
				>
					<div className="row head m-0">
						<div className="col-5 logo flex-center">
							<img src={partner.logo} alt="" />
						</div>
					</div>
					<div className="desc">{partner.desc}</div>
				</a>
			);
		});

		return (
			<div id="exposure">

				{(!isMobile)&&<Header className="fixed" data={this.props.user.data}>
					<></>
					<div className="col d-flex align-items-center p-0">
						<Link to="/messages/5" className="action-link">
							Связь <br />с организаторами
						</Link>
					</div>
				</Header>
				}
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
	return {
		postUrl: (url) => { apiService.postUrl(url) }
	};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(ExposureContainer);
