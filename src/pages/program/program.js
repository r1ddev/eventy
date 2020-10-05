import React from "react";
import "./program.scss";

import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import Header from "../../components/header";

class Program extends React.Component {
	render () {
		return (
			<div id="program">
				<Header data={this.props.user.data} />
				<iframe src="https://drive.google.com/file/d/1h_56n64fZ4PQkueKPpRQlaXO1sZbLjZY/preview" width="100%" height="100%"></iframe>
			</div>
		)
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
  
export default compose(withApiService(), connect(mapStateToProps, mapDispatchToProps))(Program);
  