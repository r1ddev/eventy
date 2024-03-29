import React from 'react';
import "./frame.css";
import "./frame-mobile.css";
import Menu from '../menu';
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { checkNotifications } from '../../actions/notifications-actions';
import { fetchTimers } from '../../actions/timers-actions';

import NotifyIndicator from '../notify-indicator';
import { isMobile } from 'react-device-detect';
import HeaderMobile from '../header-mobile';
import FloatVideoTranslation from '../float-video-translation';
import { withTranslation } from "react-i18next";

class Frame extends React.Component {

    render() {
        return (
            <div id="frame">
                <Menu notifications={this.props.notifications} />
                <div className="frame-container">
                    <FloatVideoTranslation />
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}

class FrameMobile extends React.Component {

    render() {
        return (
            <div id="frame-mobile">
                <HeaderMobile />
                <div className="frame-mobile-container">
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

        const { t } = this.props;

        if (prevProps.notifications.newMessages !== this.props.notifications.newMessages && this.props.notifications.newMessages) {
            NotifyIndicator(t('У вас новое сообщение!'), '/messages');
        }

        if (prevProps.notifications.newVipMessages !== this.props.notifications.newVipMessages && this.props.notifications.newVipMessages) {
            NotifyIndicator(t('У вас новое сообщение от персонального ассистента!'), '/vip-assistent');
        }

        if (prevProps.timers !== this.props.timers) {
            // console.log('timers')
            this.setState({
                notifyTime: this.props.timers.notifyTime
            })
        }
    }

    render() {

        return (
            (isMobile) ? <FrameMobile {...this.props} /> : <Frame {...this.props} />
        )
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
    withTranslation(),
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(FrameContainer);
