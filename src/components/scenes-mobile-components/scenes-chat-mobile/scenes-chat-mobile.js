import React from 'react';
import './scenes-chat-mobile.scss';

class ScenesChatMobile extends React.Component {

  render() {
    return (
      <div id="scenes-chat-mobile" className="isOpen">

        <CheckChatPanel />
        <MessageBox />
        <MessageInput />
      </div >
    )
  }
}


class MessageBox extends React.Component {

  render() {
    return (
      <div className="message-box">
        Список сообщений
      </div >
    )
  }
}

class MessageInput extends React.Component {

  render() {
    return (

      <div className="message-input">
        <input
          // value={}
          // onChange={}
          className="message-input"
          placeholder="Введите сообщение">
        </input>
        <div className="send-btn"></div>
      </div >

    )
  }
}


class CheckChatPanel extends React.Component {

  render() {
    return (
      <div className="check-chat-panel">
        <div className="item active">Опросы</div>
        <div className="item">Чат со спикером</div>
        <div className="item">Чат</div>
        <div className="close-btn"></div>
      </div >
    )
  }
}


export default ScenesChatMobile;