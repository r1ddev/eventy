import React from 'react';
import './quest.css'
import Header from '../../components/header/header';
import { Link } from 'react-router-dom';
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { fetchUser } from '../../actions/user-actions';
import ErrorIndicator from '../../components/error-indicator'
import NoPermissions from '../../components/no-permissions';

class Quest extends React.Component {

    render() {
        return (
            <div id="quest">
                <div className="quest-header">
                    <Header data={null}>
                        <></>
                        <div className="col d-flex align-items-center p-0">
                            <Link to="/messages/5" className="action-link">
                                Связь <br />с организаторами
                            </Link>
                        </div>
                    </Header>
                </div>
                <div className="quest-item">
                    <a href="#" style={{ backgroundImage: `url(${require("../../images/quests/1.svg")})` }}></a>
                </div>
                <div className="quest-item">
                    <a href="#" style={{ backgroundImage: `url(${require("../../images/quests/2.svg")})` }}></a>

                </div>
                <div className="quest-item">
                    <a href="#" style={{ backgroundImage: `url(${require("../../images/quests/3.svg")})` }}></a>

                </div>
                <div className="quest-item">
                    <a href="#" style={{ backgroundImage: `url(${require("../../images/quests/4.svg")})` }}></a>

                </div>
            </div>
        )
    }

}
class QuestContainer extends React.Component {


    componentDidMount() {
    }
    render() {

        return (
            <Quest />
        )
    }

}

const mapStateToProps = () => {
    return {

    }
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {

    }
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps))(QuestContainer);