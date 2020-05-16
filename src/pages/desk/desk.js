import React from 'react';
import './desk.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class Desk extends React.Component {

    render() {
        return (
            <div>
                Лобби
            </div>
        )
    }

}
class DeskContainer extends React.Component {

    render() {

        return (
            <Desk />
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
    connect(mapStateToProps, mapDispatchToProps))(DeskContainer);