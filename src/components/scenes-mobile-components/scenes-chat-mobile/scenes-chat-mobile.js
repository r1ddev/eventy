import React from 'react';
import './scenes-chat-mobile.scss';

import RSC from "react-scrollbars-custom";
import Spinner from '../../spinner';


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
    const { loading } = this.props;


    let chatMobileClasses = '';
    if (isOpen) chatMobileClasses = 'isOpen';
    if (activeInput) chatMobileClasses += ' hidden';

    console.log(loading + '5454');

    return (
      <div id="scenes-chat-mobile" className={chatMobileClasses}> {/* isOpen - Чаты открыты*/}
        <CheckChatPanel
          onOpen={this.onOpen}
          onClose={this.onClose}
          isVisible={!activeInput}
        />

        {(isOpen && !loading) && <MessageBox isVisible={!activeInput} />}
        {(isOpen && loading) && <Spinner />}
        <MessageInput isVisible={isOpen} onFocus={this.onFocusInput} onBlur={this.onBlurInput} />

        {<div style={(activeInput) ? { flexGrow: 1, transition: '10ms' } : { flexGrow: 0, height: 0, transition: '10ms' }}></div>}
      </div >
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

    const messages = ['1', '2', '2323232323', '1', '2', '2323232323',
      '1', '2', '2323232323', '1', '2', '2323232323', '1', '2',
      '2323232323', '1', '2', '2323232323', '1', '2', '2323232323',
      '1', '2', '2323232323', '1', '2', '2323232323', '1', '2', '2323232323']

    const messageList = messages.map((item, index) => {
      return (
        <MessageItem key={index} />
      )
    })

    const { isVisible } = this.props;

    return (
      <div className={(isVisible) ? 'message-box' : 'message-box hidden'}>
        <RSC ref="scrollbar">
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
    return (

      <div className="message-item">
        <img alt="" src={require("../../../images/stikers/heart.svg")} />
        <div className='text'>
          <span>Игнат Васильевич</span>
          <div> Сообщение</div>

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

  onFocusInMessageInput = () => {
    if (this.props.onFocus) this.props.onFocus();
  }

  onFocusOutMessageInput = () => {
    if (this.props.onBlur) this.props.onBlur();
  }

  render() {

    const { isVisible } = this.props;
    const { messageText } = this.state;

    return (

      <div className={(isVisible) ? 'message-input' : 'message-input hidden'}>
        <input
          value={messageText}
          onChange={this.onChangeMessage}
          onFocus={this.onFocusInMessageInput}
          onBlur={this.onFocusOutMessageInput}
          className="message-input"
          placeholder="Введите сообщение">
        </input>
        <div className="send-btn"></div>
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

    if (this.props.onChange) this.props.onChange(); //колбэк при изменении 
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
    const { isVisible } = this.props;


    return (
      <div className={(isVisible) ? 'check-chat-panel' : 'check-chat-panel hidden'}>

        <div
          className={(activeItem === itemList[0]) ? 'item active' : 'item'}
          onClick={() => this.onChangeItem(itemList[0])}
        >
          Опросы
        </div>   {/*active - активная вкладка */}

        <div
          className={(activeItem === itemList[1]) ? 'item active' : 'item'}
          onClick={() => this.onChangeItem(itemList[1])}
        >
          Чат со спикером
        </div>

        <div className={(activeItem === itemList[2]) ? 'item active' : 'item'}
          onClick={() => this.onChangeItem(itemList[2])}
        >
          Чат
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