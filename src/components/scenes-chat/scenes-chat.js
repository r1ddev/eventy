import React from 'react';
import './scenes-chat.css'
import withApiService from '../hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { fetchMessages, updateMessages, fetchAddMessage } from '../../actions/chat-actions';
import InputEmoji from 'react-input-emoji';
import { Scrollbars } from 'react-custom-scrollbars';
import RSC from "react-scrollbars-custom";

class ScenesChat extends React.Component {

    state = {
        message: ''
    }

    onSubmit = (e) => {
        const { message } = this.state;
        // e.preventDefault();
        if (message !== '') {
            this.props.sendMessage(message)
            this.clearInput();
        }
    }

    onUpdate = (force = false) => {

        if (this.refs.scrollbar) {
            let scrollPosition = this.refs.scrollbar.scrollTop + this.refs.scrollbar.clientHeight
            let delta = this.refs.scrollbar.scrollHeight - scrollPosition
            console.log(delta);

            if (delta < 200 || force) {
                this.refs.scrollbar.scrollToBottom()
            }
        }


        // this.refs.scrollbar.scrollToBottom()
    }

    onChangeMessageValue = (message) => {
        this.onUpdate();
        this.setState({
            message: message
        })
    }

    clearInput = () => {
        console.log('clear')
        this.setState({
            message: ''
        },
            () => this.refs.chatInput.updateHTML()
        )
    }

    render() {

        const {
            messages,
            activeChat,
            setChat,
            loading
        } = this.props;

        const { message } = this.state;

        console.log('dd', message)

        const messageList = messages.map((mes) => {
            return (
                <MessageItem
                    name={mes.first_name + ' ' + mes.last_name}
                    ad={mes.range === 4}
                    sponsor={mes.range === 5}
                    message={mes.message}
                    avatar={mes.avatar}
                />
            )
        })


        return (
            <div id="scenes-chat" >
                <div className="chat-tabs row m-0">
                    <div onClick={() => setChat('general')} className={(activeChat === 'general') ? "chat-tab-item-active col" : "chat-tab-item col"}>
                        <div className="tab-label">Общий чат</div>
                    </div>
                    <div onClick={() => setChat('sponsor')} className={(activeChat === 'sponsor') ? "chat-tab-item-active col" : "chat-tab-item col"}>
                        <div className="tab-label">Чат с организаторами</div>
                    </div>
                    <div onClick={() => setChat('spiker')} className={(activeChat === 'spiker') ? "chat-tab-item-active col" : "chat-tab-item col"}>
                        <div className="tab-label">Вопрос спикеру</div>
                    </div>
                </div>
                <div className="chat-message-container">

                    {!loading &&
                        <RSC ref="scrollbar" className="mes-box">
                            {
                                messageList
                            }
                        </RSC>
                    }

                    {loading &&
                        <div class="d-flex justify-content-center chat-spinner">
                            <div class="spinner-border text-success" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    }

                </div>
                <div className="chat-input-container">
                    {/* <form className="chat-form" onSubmit={this.onSubmit}> */}
                    {/* <input className="chat-input" value={message} onChange={this.onChangeMessageValue}></input> */}
                    <div className="chat-input-wrapper">
                        <InputEmoji
                            value={message}
                            onChange={this.onChangeMessageValue}
                            cleanOnEnter
                            className="chat-input"
                            placeholder="Введите ваше сообщение"
                            onEnter={this.onSubmit}
                            borderRadius='10px'
                            ref="chatInput"
                        />
                    </div>
                    <button className="send-mes-btn" onClick={this.onSubmit}>
                        <div className="send-mes-btn-icon" onClick={this.onSubmit}></div>
                    </button>
                    {/* </form> */}
                </div>
            </div>
        )
    }

}


class MessageItem extends React.Component {

    render() {

        const {
            name,
            ad,
            sponsor,
            message,
            avatar
        } = this.props;

        let origin = "http://116.203.213.27";

        let newAvatar = origin + "/images/avatar/" + avatar;


        return (
            <div className="message-item" style={{ backgroundColor: `${(sponsor ? '#FFE800' : 'white')}` }}>
                <div className="mes-photo-wrapper">
                    <div className="mes-photo" style={{ backgroundImage: `url(${newAvatar})` }}></div>
                </div>

                <div className="mes-info">
                    <div className="mes-info-name">{name}<span className="mes-info-status">{(sponsor ? 'UMF' : '')}</span></div>
                    <div className="mes-info-content">
                        {message}
                    </div>
                </div>
            </div>
        )
    }

}


class ScenesChatContainer extends React.Component {

    state = {
        activeChat: 'sponsor',
        currentChatId: this.props.sponsorChatId,
        sponsorChatId: this.props.sponsorChatId,
        generalChatId: this.props.generalChatId,
        spikerChatId: this.props.spikerChatId
    }

    setChat = (chat) => {
        console.log(chat)
        this.setState({
            activeChat: chat,
            currentChatId: (chat === 'general' ? this.state.generalChatId : (chat === 'sponsor' ? this.state.sponsorChatId : this.state.spikerChatId))
        }, () => {
            this.props.fetchMessages(this.state.currentChatId)
        })
    }

    sendMessage = (message) => {

        const mes = {
            user_id: 1,
            first_name: "Софья",
            last_name: "Сергеевна",
            avatar: "ab70bd0a37b1153c1109a198f3d4c386.png",
            range: 1,
            messages_id: 1,
            message: message
        }

        this.props.fetchAddMessage(this.state.currentChatId, mes)
        this.refs.scenesChat.onUpdate(true)
    }

    componentDidMount() {
        this.setState({
            activeChat: 'sponsor',
            currentChatId: this.props.sponsorChatId,
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
        setTimeout(() => {
            this.props.updateMessages(this.state.currentChatId, this.props.chat.lastApiMessageId);
            this.updateMessages();
        }, 2000)

    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate", prevProps, this.props);

        if (prevProps.chat.updateLoading != this.props.chat.updateLoading && !this.props.chat.updateLoading) {
            this.refs.scenesChat.onUpdate()
        }

        if (prevProps.chat.loading != this.props.chat.loading && !this.props.chat.loading) {
            console.log("prevProps.chat.loading", prevProps.chat.loading);

            this.refs.scenesChat.onUpdate(true)
        }


        // console.log(prevProps.chat.updateLoading);
        // console.log(this.props.chat.updateLoading);

    }

    render() {
        const {
            messages,
            lastApiMessageId,
            loading
        } = this.props.chat

        console.log("this.props.chat.updateLoading", this.props.chat);


        console.log(lastApiMessageId)
        return (

            <ScenesChat
                loading={loading}
                messages={messages}
                activeChat={this.state.activeChat}
                setChat={this.setChat}
                sendMessage={this.sendMessage}
                ref="scenesChat"
            />
        )
    }

}

const mapStateToProps = ({ chat }) => {
    return {
        chat
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