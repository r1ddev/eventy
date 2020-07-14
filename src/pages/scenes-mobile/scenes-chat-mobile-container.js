import React from 'react';
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { fetchMessages, updateMessages, fetchAddMessage } from '../../actions/chat-actions';
import ScenesChat from '../../components/scenes-chat';

import ScenesChatMobile from '../../components/scenes-mobile-components/scenes-chat-mobile';


class ScenesChatContainer extends React.Component {


    render() {

        return (

            <ScenesChatMobile {...this.props} />
        )
    }
}

const mapStateToProps = ({ chat, timers }) => {
    return {
        chat, timers
    }
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
        fetchMessages: (idChat) => fetchMessages(apiService, dispatch)(idChat),
        updateMessages: (idChat, id) => updateMessages(apiService, dispatch)(idChat, id),
        fetchAddMessage: (idChat, message) => fetchAddMessage(apiService, dispatch)(idChat, message),
    }
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps))(ScenesChatContainer);