import React from 'react';
import './scenes-chat.css'
import withApiService from '../hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class ScenesChat extends React.Component {

    state = {
        message: ''
    }

    onSubmit = (e) => {
        const { message } = this.state;
        e.preventDefault();
        if (message !== '') {
            console.log(message);
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
            setActiveChat,
            sendMessage
        } = this.props;

        const {
            message
        } = this.state;

        console.log(message)

        const messageList = messages.map((mes) => {
            return (
                <MessageItem
                    name={mes.first_name + ' ' + mes.last_name}
                    ad={mes.id == 3553535 ? true : false}
                />
            )
        })


        return (
            <div id="scenes-chat" >
                <div className="chat-tabs row m-0">
                    <div className="chat-tab-item col">
                        <div className="tab-label">Общий чат</div>
                    </div>
                    <div className="chat-tab-item-active col">
                        <div className="tab-label">Чат с организаторами</div>
                    </div>
                    <div className="chat-tab-item col">
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

        const { name } = this.props;
        return (
            <div className="message-item">
                <div className="mes-photo-wrapper">

                    <div className="mes-photo"></div>
                </div>

                <div className="mes-info">
                    <div className="mes-info-name">{name}<span className="mes-info-status">Организатор</span></div>
                    <div className="mes-info-content">
                        {this.props.text}Привет всем участникам, рады приветствовать вас на обзоре платформы Smit.events
                    </div>
                </div>
            </div>
        )
    }

}


class ScenesChatContainer extends React.Component {

    render() {



        let messages = [
            {
                user_id: 1,
                first_name: "Евгений",
                last_name: "Дубенюк",
                avatar: "123.png",
                range: 1,
                messages_id: 79,
                message: "Аньен хасае"
            },
            {
                user_id: 355,
                first_name: "Александр",
                last_name: "Александрович",
                avatar: "123.png",
                range: 1,
                messages_id: 32,
                message: "Камса хам нии да"
            },

        ]

        return (
            <ScenesChat messages={messages} />
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
    connect(mapStateToProps, mapDispatchToProps))(ScenesChatContainer);