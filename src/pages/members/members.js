import React from 'react';
import './members.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class Members extends React.Component {

    render() {
        return (
            <div>
                Участники
            </div>
        )
    }

}
class MembersContainer extends React.Component {

    render() {

        return (
            <Members />
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
    connect(mapStateToProps, mapDispatchToProps))(MembersContainer);