import React from "react";
import "./presentations.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import api from "./../../js/api";
import Header from "../../components/header";
import { isMobile } from "react-device-detect";
import { setPageFetch } from "../../actions/page-actions";


class Presentations extends React.Component {
  state = {};

  render() {
    const { data } = this.props.user;

    return (
      <div id="presentations">
        {!isMobile && (
          <Header data={data}>
            <></>
          </Header>
        )}

        <div className="container">
          <div className="row">
            <div className="col-lg-6 px-5 mt-5">
              <Link to="/presentations/day1" className="folder">
                Презентация Smit.studio
              </Link>
            </div>
            {/* <div className="col-lg-6 px-5 mt-5">
							<Link to="/presentations/day2" className="folder">
								День 2
							</Link>
						</div> */}
          </div>
          {/* <div className="row">
						<div className="col-lg-6 px-5 mt-5">
							<Link to="/presentations/partners" className="folder">
								Материалы от партнёров
							</Link>
						</div>
					</div> */}
        </div>
      </div>
    );
  }
}
class PresentationsContainer extends React.Component {
  componentDidMount() {
    this.props.setPageFetch('presentatons');

  }

  render() {
    return <Presentations {...this.props} />;
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
  return {
    setPageFetch: (page) => setPageFetch(apiService, dispatch)(page)
  };
};

export default compose(withApiService(), connect(mapStateToProps, mapDispatchToProps))(PresentationsContainer);
