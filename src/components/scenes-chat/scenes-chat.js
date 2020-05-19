import React from 'react';
import './scenes-chat.css'
import withApiService from '../hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { fetchMessages, updateMessages, fetchAddMessage } from '../../actions/chat-actions';

class ScenesChat extends React.Component {

    state = {
        message: ''
    }

    onSubmit = (e) => {
        const { message } = this.state;
        e.preventDefault();
        if (message !== '') {
            this.props.sendMessage(message)
            this.clearInput();
        }

    }

    onChangeMessageValue = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    clearInput = () => {
        console.log('clear')
        this.setState({
            message: ''
        })
    }

    render() {

        const {
            messages,
            activeChat,
            setChat
        } = this.props;

        const {
            message
        } = this.state;

        console.log(messages)

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
                    <div onClick={() => setChat('general')} className={(activeChat == 'general') ? "chat-tab-item-active col" : "chat-tab-item col"}>
                        <div className="tab-label">Общий чат</div>
                    </div>
                    <div onClick={() => setChat('sponsor')} className={(activeChat == 'sponsor') ? "chat-tab-item-active col" : "chat-tab-item col"}>
                        <div className="tab-label">Чат с организаторами</div>
                    </div>
                    <div onClick={() => setChat('spiker')} className={(activeChat == 'spiker') ? "chat-tab-item-active col" : "chat-tab-item col"}>
                        <div className="tab-label">Вопрос спикеру</div>
                    </div>
                </div>
                <div className="chat-message-container">
                    <div className="mes-box">
                        {
                            messageList
                        }
                    </div>
                </div>
                <div className="chat-input-container">
                    <form className="chat-form" onSubmit={this.onSubmit}>
                        <input className="chat-input" value={message} onChange={this.onChangeMessageValue}></input>
                        <button className="send-mes-btn">
                            <div className="send-mes-btn-icon"></div>
                        </button>
                    </form>
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
        messages: [
            {
                user_id: 1,
                first_name: "Евгений",
                last_name: "Дубенюк",
                avatar: require("../../images/fry.jpg"),
                range: 4,
                messages_id: 79,
                message: "Аньен хасае"
            }
        ]
    }

    setChat = (chat) => {
        console.log(chat)
        this.setState({
            activeChat: chat
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

        this.props.fetchAddMessage(1, mes)

    }

    componentDidMount() {
        this.props.fetchMessages(1);
        this.updateMessages();
    }

    updateMessages = () => {
        setTimeout(() => {
            this.props.updateMessages(1, this.props.chat.lastApiMessageId);
            this.updateMessages();
        }, 2000)

    }



    render() {
        const {
            messages,
            lastApiMessageId
        } = this.props.chat

        console.log(lastApiMessageId)
        return (
            <ScenesChat
                messages={messages}
                activeChat={this.state.activeChat}
                setChat={this.setChat}
                sendMessage={this.sendMessage}
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