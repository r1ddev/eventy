import React from 'react';
import "./frame.css"
import Menu from '../menu';
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { checkNotifications } from '../../actions/notifications-actions';


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
        }, 15000);
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
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
