import React from 'react';
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { fetchMessages, fetchAddMessage } from '../../actions/vip-chat-actions';
import { setVipMessagesNotifications, setMessagesNotifications } from '../../actions/notifications-actions';

import ScenesChat from '../../components/scenes-chat';

class VipChatContainer extends React.Component {


    timerId = null;



    sendMessage = (message) => {

        const { first_name, last_name, avatar, range } = this.props.user;

        const mes = {
            user_id: 1,
            first_name: first_name,
            last_name: last_name,
            avatar: avatar,
            range: range,
            messages_id: 1,
            message: message
        }

        this.props.fetchAddMessage(9, mes)
        this.refs.scenesChat.onUpdate(true)
    }

    componentDidMount() {
        this.updateMessages();
        this.props.setVipMessagesNotifications(false)
    }

    updateMessages = () => {
        this.props.fetchMessages(9);
        let id = setTimeout(() => {
            this.updateMessages();
        }, this.props.timers.vipChatTime)


        this.timerId = id;

    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.vipchat.loading !== this.props.vipchat.loading && !this.props.vipchat.loading) {
            this.refs.scenesChat.onUpdate(true)
        }
    }

    render() {
        const {
            messages,
        } = this.props.vipchat

        return (

            <ScenesChat
                loading={false}
                messages={messages}
                sendMessage={this.sendMessage}
                isPrivate={true}
                ref="scenesChat"
            />
        )
    }
}

const mapStateToProps = ({ vipchat, timers }) => {
    return {
        vipchat: vipchat,
        timers: timers
    }
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
        fetchMessages: (idUser) => fetchMessages(apiService, dispatch)(idUser),
        fetchAddMessage: (idUser, message) => fetchAddMessage(apiService, dispatch)(idUser, message),
        setVipMessagesNotifications: (n) => dispatch(setVipMessagesNotifications(n))
    }
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps))(VipChatContainer);