import React from 'react';
import './scenes-chat.css'
import withApiService from '../hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { fetchMessages, updateMessages, fetchAddMessage } from '../../actions/chat-actions';
import InputEmoji from 'react-input-emoji';
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

            if (delta < 200 || force) {
                this.refs.scrollbar.scrollToBottom()
            }
        }

    }

    onChangeMessageValue = (message) => {
        this.onUpdate();
        this.setState({
            message: message
        })
    }

    clearInput = () => {
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
            loading,
            isPrivate
        } = this.props;

        const { message } = this.state;

        const messageList = messages.map((mes, index) => {
            return (
                <MessageItem
                    key={index}
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
                {!isPrivate && <div className="chat-tabs row m-0">
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
                }
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
                    <div className="chat-input-wrapper">
                        <InputEmoji
                            value={message}
                            onChange={this.onChangeMessageValue}
                            cleanOnEnter
                            className="chat-input"
                            placeholder="Введите ваше сообщение"
                            onEnter={this.onSubmit}
                            borderRadius={10}
                            ref="chatInput"
                        />
                    </div>
                    <button className="send-mes-btn" onClick={this.onSubmit}>
                        <div className="send-mes-btn-icon" onClick={this.onSubmit}></div>
                    </button>
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

export default ScenesChat;