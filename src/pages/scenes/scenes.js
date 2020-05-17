import React from 'react';
import './scenes.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class Scenes extends React.Component {

    render() {
        return (
            <div id="scenes">
                <div className="scenes-translation">Трансляция</div>
                <div className="scenes-chat">Чат</div>
            </div>
        )
    }

}
class ScenesContainer extends React.Component {

    render() {

        return (
            <Scenes />
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
    connect(mapStateToProps, mapDispatchToProps))(ScenesContainer);