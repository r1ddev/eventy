import React from 'react';
import './messages.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class Messages extends React.Component {

    render() {
        return (
            <div>
                Мои сообщения
            </div>
        )
    }

}
class MessagesContainer extends React.Component {

    render() {

        return (
            <Messages />
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
    connect(mapStateToProps, mapDispatchToProps))(MessagesContainer);