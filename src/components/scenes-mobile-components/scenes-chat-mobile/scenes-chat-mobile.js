import React from 'react';
import './scenes-chat-mobile.scss';

import RSC from "react-scrollbars-custom";
import Spinner from '../../spinner';
import { isMobileSafari, isIOS } from "react-device-detect";
import api from "./../../../js/api";
import Translit from "../../../components/translit";

class ScenesChatMobile extends React.Component {

  state = {
    isOpen: false,
    activeInput: false
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    })

    if (this.props.onOpen) this.props.onOpen(); //колбэк при открытии
  }

  onClose = () => {
    this.setState({
      isOpen: false,
    })

    if (this.props.onClose) this.props.onClose();//колбэк при закрытии
  }

  onFocusInput = () => {
    this.setState({
      activeInput: true,
    })
  }

  onBlurInput = () => {
    this.setState({
      activeInput: false,
    })
  }

  render() {

    const { isOpen, activeInput } = this.state;
    const { loading, messages, setItem, sendMessage, survey, t } = this.props;

    let chatMobileClasses = '';
    if (isOpen) chatMobileClasses = 'isOpen';
    if (activeInput && (!isIOS || !isMobileSafari)) chatMobileClasses += ' hidden';

    return (
      <>
        {(!isMobileSafari && !isIOS) &&
          <div id="scenes-chat-mobile" className={chatMobileClasses}> {/* isOpen - Чаты открыты*/}
            <CheckChatPanel
              onOpen={this.onOpen}
              onClose={this.onClose}
              isVisible={!activeInput}
              onChangeItem={setItem}
              t={t}
            />

            {(isOpen && !loading && !survey) &&
              <MessageBox
                isVisible={!activeInput}
                messages={messages}
              />}

            {(isOpen && loading) && <Spinner />}

            {(!survey) && <MessageInput
              isVisible={isOpen}
              onFocus={this.onFocusInput}
              onBlur={this.onBlurInput}
              sendMessage={sendMessage}
              t={t}
            />}

            {<div style={(activeInput) ? { flexGrow: 1, transition: '10ms' } : { flexGrow: 0, height: 0, transition: '10ms' }}></div>}
          </div >
        }

        {(isMobileSafari || isIOS) &&
          <div id="scenes-chat-mobile" className={chatMobileClasses}> {/* isOpen - Чаты открыты*/}
            <CheckChatPanel
              onOpen={this.onOpen}
              onClose={this.onClose}
              isVisible={true}
              onChangeItem={setItem}
              t={t}
            />

            {(isOpen && !loading && !survey) &&
              <MessageBox
                isVisible={true}
                messages={messages}
              />}
            {(isOpen && loading) && <Spinner />}
            {(!survey) && <MessageInput
              isVisible={isOpen}
              onFocus={this.onFocusInput}
              onBlur={this.onBlurInput}
              sendMessage={sendMessage}
              t={t}
            />}
          </div >
        }
      </>
    )
  }
}


class MessageBox extends React.Component {

  // state = {
  //   message: ''
  // }

  // onSubmit = (e) => {
  //   const { message } = this.state;
  //   // e.preventDefault();
  //   if (message !== '') {
  //     this.props.sendMessage(message)
  //     this.clearInput();
  //   }
  // }

  onUpdate = (force = false) => {

    if (this.refs.scrollbar) {
      let scrollPosition = this.refs.scrollbar.scrollTop + this.refs.scrollbar.clientHeight
      let delta = this.refs.scrollbar.scrollHeight - scrollPosition

      if (delta < 400 || force) {
        this.refs.scrollbar.scrollToBottom()
      }
    }

  }

  // onChangeMessageValue = (message) => {
  //   this.onUpdate();
  //   this.setState({
  //     message: message
  //   })
  // }

  // clearInput = () => {
  //   this.setState({
  //     message: ''
  //   },
  //     () => this.refs.chatInput.updateHTML()
  //   )
  // }

  componentDidMount() {
    this.onUpdate(true); //Принудительный скролл вниз
  }

  componentDidUpdate(prevProps) {
    if ((!prevProps.messages !== this.props.messages)) {
      this.onUpdate();
    }
  }




  render() {

    const { messages } = this.props;

    const messageList = messages.map((item, index) => {

      console.log(item);

      return (
        <MessageItem key={index} item={item} />
      )
    })

    const { isVisible } = this.props;

    return (
      <div className={(isVisible) ? 'message-box' : 'message-box hidden'}>
        <RSC ref="scrollbar" >
          {
            messageList
          }
        </RSC>
      </div>
    )
  }
}

class MessageItem extends React.Component {

  render() {

    const { id, first_name, last_name, ad, sponsor, message, avatar, time } = this.props.item;

    let origin = api.origin;
    let newAvatar = origin + "/images/avatar/" + avatar;

    return (

      <div className="message-item">
        <img alt="" src={newAvatar} />
        <div className='text'>
          <span><Translit value={first_name + ' ' + last_name} /></span>
          <div className='mes-text'> {message}</div>

        </div>
        <div className="message-reply">
          <div className="message-time">{time}</div>
          <div className="message-reply-btn">ответить</div>
        </div>

      </div >

    )
  }
}


class MessageInput extends React.Component {

  state = {
    messageText: '',
  }

  onChangeMessage = (e) => {
    this.setState({
      messageText: e.target.value
    })
  }

  onSend = () => {
    const text = this.state.messageText;
    if (text) this.props.sendMessage(text);
    this.onFocusOutMessageInput();
    this.clearText();
  }

  clearText = () => {
    this.setState({ messageText: '' })
  }

  onFocusInMessageInput = () => {
    if (this.props.onFocus) this.props.onFocus();
  }

  onFocusOutMessageInput = () => {
    if (this.props.onBlur) this.props.onBlur();
  }

  render() {

    const { isVisible, t } = this.props;
    const { messageText } = this.state;

    return (

      <div
        className={(isVisible) ? 'message-input' : 'message-input hidden'}
        onFocus={this.onFocusInMessageInput}
        onBlur={this.onFocusOutMessageInput}
      >
        <input
          value={messageText}
          onChange={this.onChangeMessage}
          className="message-input"
          placeholder={t("Введите сообщение")}>
        </input>
        <button onClick={this.onSend} className="send-btn"></button>
      </div >

    )
  }
}


class CheckChatPanel extends React.Component {

  state = {
    isOpen: false,
    itemList: ['survey', 'spiker', 'general'],
    activeItem: '',
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    })

    if (this.props.onOpen) this.props.onOpen(); //колбэк при открытии

    if (this.state.activeItem === '') {
      this.onChangeItem(this.state.itemList[2]); //при открытии общий чат
    }
  }

  onClose = () => {
    this.setState({
      isOpen: false,
    })

    if (this.props.onClose) this.props.onClose();//колбэк при закрытии
    this.onChangeItem('');
  }

  onChangeItem = (value) => {

    this.setState({
      activeItem: value,
    })

    if (this.props.onChangeItem) this.props.onChangeItem(value); //колбэк при изменении 
  }

  componentDidUpdate(prevProps, prevState) {

    // if ((this.state.activeItem === prevState.activeItem) && this.state.isOpen) {
    //   this.onClose();
    // }

    if ((!prevState.isOpen) && (this.state.activeItem !== prevState.activeItem)) {
      this.onOpen();
    }
  }


  render() {

    const { isOpen, activeItem, itemList } = this.state;
    const { isVisible, t } = this.props;


    return (
      <div className={(isVisible) ? 'check-chat-panel' : 'check-chat-panel hidden'}>

        <div
          className={(activeItem === itemList[0]) ? 'item active' : 'item'}
          onClick={() => this.onChangeItem(itemList[0])}
        >
          {t('Опросы')}
        </div>   {/*active - активная вкладка */}

        <div
          className={(activeItem === itemList[1]) ? 'item active' : 'item'}
          onClick={() => this.onChangeItem(itemList[1])}
        >
          {t('Чат со спикером')}
        </div>

        <div className={(activeItem === itemList[2]) ? 'item active' : 'item'}
          onClick={() => this.onChangeItem(itemList[2])}
        >
          {t('Чат')}
        </div>

        <div
          className={(isOpen) ? 'arrow-btn opened' : 'arrow-btn'}
          onClick={(isOpen) ? this.onClose : this.onOpen}
        ></div>
      </div >
    )
  }
}


export default ScenesChatMobile;