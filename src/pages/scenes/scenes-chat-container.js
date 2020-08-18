import React from 'react';
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { fetchMessages, updateMessages, fetchAddMessage } from '../../actions/chat-actions';
import ScenesChat from '../../components/scenes-chat';
import { withTranslation } from "react-i18next";


class ScenesChatContainer extends React.Component {

    state = {
        activeChat: 'general',
        currentChatId: this.props.sponsorChatId,
        sponsorChatId: this.props.sponsorChatId,
        generalChatId: this.props.generalChatId,
        spikerChatId: this.props.spikerChatId,
        timerId: null
    }

    setChat = (chat) => {
        this.setState({
            activeChat: chat,
            currentChatId: (chat === 'general' ? this.state.generalChatId : (chat === 'sponsor' ? this.state.sponsorChatId : this.state.spikerChatId))
        }, () => {
            this.props.fetchMessages(this.state.currentChatId)
        })
    }


    getCurrentChatId = (sponsor, general, spiker) => {
        if (this.state.activeChat === 'general') return general;
        if (this.state.activeChat === 'spiker') return spiker;
        return sponsor;
    }

    sendMessage = (message) => {


        const { first_name, last_name, avatar, range } = this.props.user;

        const date = new Date;


        const mes = {
            user_id: 1,
            first_name: first_name,
            last_name: last_name,
            avatar: avatar,
            range: range,
            messages_id: 1,
            message: message,
            time: `${date.getHours()}:${date.getMinutes()}`
        }

        this.props.fetchAddMessage(this.state.currentChatId, mes)
        this.refs.scenesChat.onUpdate(true)
    }

    componentDidMount() {
        this.setState({
            activeChat: 'general',
            currentChatId: this.props.generalChatId,
            sponsorChatId: this.props.sponsorChatId,
            generalChatId: this.props.generalChatId,
            spikerChatId: this.props.spikerChatId
        },
            () => {

                this.props.fetchMessages(this.state.currentChatId);
                this.updateMessages();
            }
        )
    }

    updateMessages = () => {
        console.log("this.props.timers", this.props.timers);

        let id = setTimeout(() => {
            this.props.updateMessages(this.state.currentChatId, this.props.chat.lastApiMessageId);
            this.updateMessages();
        }, this.props.timers.sceneChatTime)

        this.setState({
            timerId: id
        })
    }

    componentWillUnmount() {

        clearTimeout(this.state.timerId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chat.updateLoading != this.props.chat.updateLoading && !this.props.chat.updateLoading) {
            this.refs.scenesChat.onUpdate()
        }

        if (prevProps.chat.loading != this.props.chat.loading && !this.props.chat.loading) {
            this.refs.scenesChat.onUpdate(true)
        }

        if (prevProps.sponsorChatId !== this.props.sponsorChatId) {

            const {
                sponsorChatId,
                generalChatId,
                spikerChatId,
            } = this.props

            this.setState({
                sponsorChatId: sponsorChatId,
                generalChatId: generalChatId,
                spikerChatId: spikerChatId,
                currentChatId: this.getCurrentChatId(sponsorChatId, generalChatId, spikerChatId)
            },
                () => {
                    this.props.fetchMessages(this.state.currentChatId);

                }
            )
        }


    }

    render() {
        const {
            messages,
            lastApiMessageId,
            loading
        } = this.props.chat

        return (

            <ScenesChat
                loading={loading}
                messages={messages}
                activeChat={this.state.activeChat}
                setChat={this.setChat}
                sendMessage={this.sendMessage}
                isPrivate={false}
                ref="scenesChat"
                t={this.props.t}
            />
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
    withTranslation(),
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps))(ScenesChatContainer);