import React from 'react';
import './networking.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class Networking extends React.Component {

    render() {
        return (
            <div>
                Нетворкинг
            </div>
        )
    }

}
class NetworkingContainer extends React.Component {

    render() {

        return (
            <Networking />
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
    connect(mapStateToProps, mapDispatchToProps))(NetworkingContainer);