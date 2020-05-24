import React from 'react';
import './quest.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import ErrorIndicator from '../../components/error-indicator'
import NoPermissions from '../../components/no-permissions';

class Quest extends React.Component {

    render() {
        return (
            <div id="quest">
                <div className="quest-item">
                    <a href="#"><img src={require("../../images/quests/1.svg")}></img></a>
                </div>
                <div className="quest-item">
                    <a href="#"><img src={require("../../images/quests/2.svg")}></img></a>

                </div>
                <div className="quest-item">
                    <a href="#"><img src={require("../../images/quests/3.svg")}></img></a>

                </div>
                <div className="quest-item">
                    <a href="#"><img src={require("../../images/quests/4.svg")}></img></a>

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