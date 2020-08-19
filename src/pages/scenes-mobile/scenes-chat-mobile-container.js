import React from 'react';
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { fetchMessages, updateMessages, fetchAddMessage } from '../../actions/chat-actions';

import ScenesChatMobile from '../../components/scenes-mobile-components/scenes-chat-mobile';


class ScenesChatMobileContainer extends React.Component {

    state = {
        activeChat: 'general',
        survey: false,
        currentChatId: this.props.generalChatId,
        generalChatId: this.props.generalChatId,
        spikerChatId: this.props.spikerChatId,
        timerId: null
    }

    setChat = (chat) => {

        const cashChat = chat === this.state.activeChat;

        this.setState({
            activeChat: chat,
            survey: false,
            currentChatId: (chat === 'general' ? this.state.generalChatId : this.state.spikerChatId)
        }, () => {
            if (!cashChat) this.props.fetchMessages(this.state.currentChatId)
        })
    }

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
        this.props.fetchAddMessage(this.state.currentChatId, mes)
    }

    setItem = (item) => {
        if (item !== 'survey') {
            this.setChat(item)
        } else {
            this.setState(
                { survey: true }
            )
        }
    }

    componentDidMount() {
        this.setState({
            activeChat: 'general',
            currentChatId: this.props.generalChatId,
            spikerChatId: this.props.spikerChatId
        },
            () => {

                setTimeout(this.props.fetchMessages(this.state.currentChatId), 1000);
                this.updateMessages();
            }
        )
    }

    updateMessages = () => {

        let id = setTimeout(() => {
            this.props.updateMessages(this.state.currentChatId, this.props.chat.lastApiMessageId);
            this.updateMessages();
        }, this.props.timers.sceneChatTime)

        this.setState({
            timerId: id
        })
    }

    render() {

        const { messages, loading } = this.props.chat;
        const { survey } = this.state;

        // console.log(messages)

        return (

            <ScenesChatMobile
                setItem={this.setItem}
                loading={loading}
                messages={messages}
                survey={survey}
                sendMessage={this.sendMessage}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = ({ chat, timers, user }) => {
    return {
        chat, timers, user: user.user
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
    connect(mapStateToProps, mapDispatchToProps))(ScenesChatMobileContainer);