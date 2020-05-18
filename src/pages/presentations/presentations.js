import React from "react";
import "./presentations.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";

class Presentations extends React.Component {
	state = {}

	render() {
		return (
			<div id="presentations">
				<div className="profile-header">
					<div className="container">
						<div className="ava text-right">
							<Link to="/profile">
								<img
									src={require("../../images/networking-card-image-placeholder.png")}
									alt=""
								/>
							</Link>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-6 px-5 mt-5">
							<Link to="/presentations/speakers" className="folder">
								Презентации спикеров
							</Link>
						</div>
						<div className="col-lg-6 px-5 mt-5">
							<Link to="/presentations/organizers" className="folder">
								Материалы от организаторов
							</Link>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6 px-5 mt-5">
							<Link to="/presentations/partners" className="folder">
								Материалы от партнёров
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
class PresentationsContainer extends React.Component {
	render() {
		return <Presentations />;
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
)(PresentationsContainer);
