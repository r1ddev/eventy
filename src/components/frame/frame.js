import React from 'react';
import "./frame.css"
import Menu from '../menu';
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { checkNotifications } from '../../actions/notifications-actions';
import { fetchTimers } from '../../actions/timers-actions';

import NotifyIndicator from '../notify-indicator';


class Frame extends React.Component {

    render() {


        return (
            <div id="frame">
                <Menu notifications={this.props.notifications} />
                <div className="frame-container">
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}




class FrameContainer extends React.Component {

    timerId = null;
    timerTIMERID = null;

    state = {
        notifyTime: this.props.timers.notifyTime
    }


    componentDidMount() {
        this.props.checkNotifications();
        this.checkNotifications();
        this.upTime();
    }

    upTime = () => {
        this.props.fetchTimers();
        this.timerTIMERID = setTimeout(() => {
            this.upTime()
        }, 180000);
    }

    checkNotifications = () => {
        this.props.checkNotifications();
        this.timerId = setTimeout(() => {
            this.checkNotifications()
        }, this.state.notifyTime);
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
        clearTimeout(this.timerTIMERID);

    }

    componentDidUpdate(prevProps) {
        if (prevProps.notifications.newMessages !== this.props.notifications.newMessages && this.props.notifications.newMessages) {
            NotifyIndicator('У вас новое сообщение!', '/messages');
        }

        if (prevProps.notifications.newVipMessages !== this.props.notifications.newVipMessages && this.props.notifications.newVipMessages) {
            NotifyIndicator('У вас новое сообщение от персонального ассистента!', '/vip-assistent');
        }

        if (prevProps.timers !== this.props.timers) {
            console.log('timers')
            this.setState({
                notifyTime: this.props.timers.notifyTime
            })
        }
    }

    render() {

        return <Frame {...this.props} />;
    }
}

const mapStateToProps = ({ notifications, timers }) => {
    return {
        notifications,
        timers
    };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
        checkNotifications: () => checkNotifications(apiService, dispatch),
        fetchTimers: () => fetchTimers(apiService, dispatch)
    };
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(FrameContainer);
