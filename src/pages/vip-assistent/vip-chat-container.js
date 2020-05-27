import React from 'react';
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { fetchMessages, fetchAddMessage } from '../../actions/vip-chat-actions';
import ScenesChat from '../../components/scenes-chat';
import replaceBadWords from '../../utils/bad-words-replacer';

class VipChatContainer extends React.Component {

    state = {
        timerId: null
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
            message: replaceBadWords(message)
        }

        this.props.fetchAddMessage(9, mes)
        this.refs.scenesChat.onUpdate(true)
    }

    componentDidMount() {
        this.props.fetchMessages(9);
        this.updateMessages();
    }

    updateMessages = () => {
        let id = setTimeout(() => {
            this.props.fetchMessages(9);
            this.updateMessages();
        }, 5000)

        this.setState({
            timerId: id
        })
    }

    componentWillUnmount() {
        clearTimeout(this.state.timerId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.vipchat.loading !== this.props.vipchat.loading && !this.props.vipchat.loading) {
            this.refs.scenesChat.onUpdate(true)
        }
    }

    render() {
        const {
            messages,
        } = this.props.vipchat

        console.log(this.props)

        return (

            <ScenesChat
                loading={false}
                messages={messages}
                sendMessage={this.sendMessage}
                isPrivate={true}
                ref="scenesChat"
            />
        )
    }
}

const mapStateToProps = ({ vipchat }) => {
    return {
        vipchat: vipchat
    }
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
        fetchMessages: (idUser) => fetchMessages(apiService, dispatch)(idUser),
        fetchAddMessage: (idUser, message) => fetchAddMessage(apiService, dispatch)(idUser, message),
    }
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps))(VipChatContainer);