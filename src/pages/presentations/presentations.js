import React from "react";
import "./presentations.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import api from './../../js/api';
import Header from "../../components/header";

class Presentations extends React.Component {
	state = {}

	render() {
		const { data } = this.props.user

		return (
			<div id="presentations">
				<Header data={data}>
					<></>
					<div className="col d-flex align-items-center p-0">
						<Link to="/messages/5" className="action-link">
							Связь <br />с организаторами
						</Link>
					</div>
				</Header>

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
		return <Presentations {...this.props} />;
	}
}

const mapStateToProps = ({ user }) => {
	return { user };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(PresentationsContainer);
