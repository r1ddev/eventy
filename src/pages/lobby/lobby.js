import React from 'react';
import './lobby.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class Lobby extends React.Component {

    render() {
        return (
            <div>
                Лобби
            </div>
        )
    }

}
class LobbyContainer extends React.Component {

    render() {

        return (
            <Lobby />
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
    connect(mapStateToProps, mapDispatchToProps))(LobbyContainer);