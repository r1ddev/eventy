import React from 'react';
import './party.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class Party extends React.Component {

    render() {
        return (
            <div>
                Вечеринка
            </div>
        )
    }

}
class PartyContainer extends React.Component {

    render() {

        return (
            <Party />
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
    connect(mapStateToProps, mapDispatchToProps))(PartyContainer);