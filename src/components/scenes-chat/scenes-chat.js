import React from 'react';
import './scenes-chat.css'
import withApiService from '../hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class ScenesChat extends React.Component {

    render() {
        return (
            <div id="scenes-chat">
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
                        <MessageItem text="1" />
                        <MessageItem text="2" />
                        <MessageItem text="3" />
                        <MessageItem text="4" />
                        <MessageItem text="5" />
                        <MessageItem text="6" />
                        <MessageItem text="7" />
                        <MessageItem text="8" />
                        <MessageItem text="9" />
                    </div>

                </div>
                <div className="chat-input-container">
                    <form className="chat-form">
                        <input className="chat-input"></input>
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

        return (
            <div className="message-item">
                <div className="mes-photo-wrapper">

                    <div className="mes-photo"></div>
                </div>

                <div className="mes-info">
                    <div className="mes-info-name">Евгений Дубенюк<span className="mes-info-status">Организатор</span></div>
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

        return (
            <ScenesChat />
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