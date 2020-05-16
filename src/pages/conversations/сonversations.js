import React from 'react';
import './conversations.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class Сonversations extends React.Component {

    render() {
        return (
            <div>
                Переговорки
            </div>
        )
    }

}
class СonversationsContainer extends React.Component {

    render() {

        return (
            <Сonversations />
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
    connect(mapStateToProps, mapDispatchToProps))(СonversationsContainer);