import React from 'react';
import './spikers.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class Spikers extends React.Component {

    render() {
        return (
            <div>
                Спикеры
            </div>
        )
    }

}
class SpikersContainer extends React.Component {

    render() {

        return (
            <Spikers />
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
    connect(mapStateToProps, mapDispatchToProps))(SpikersContainer);