import React from 'react';
import "./frame.css"
import Menu from '../menu';
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { checkNotifications } from '../../actions/notifications-actions';
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

    componentDidMount() {
        this.props.checkNotifications();
        this.checkNotifications();
    }

    checkNotifications = () => {
        this.props.checkNotifications();
        this.timerId = setTimeout(() => {
            this.checkNotifications()
        }, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.notifications.newMessages !== this.props.notifications.newMessages && this.props.notifications.newMessages) {
            NotifyIndicator('У вас новое сообщение!', '/messages');
        }

        if (prevProps.notifications.newVipMessages !== this.props.notifications.newVipMessages && this.props.notifications.newVipMessages) {
            NotifyIndicator('У вас новое сообщение от персонального ассистента!', '/vip-assistent');
        }
    }

    render() {

        return <Frame {...this.props} />;
    }
}

const mapStateToProps = ({ notifications }) => {
    return {
        notifications,
    };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
        checkNotifications: () => checkNotifications(apiService, dispatch)
    };
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(FrameContainer);
