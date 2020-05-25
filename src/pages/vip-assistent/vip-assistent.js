import React from 'react';
import './vip-assistent.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import Header from '../../components/header/header';
import ScenesChat from '../../components/scenes-chat/scenes-chat';
import Spinner from '../../components/spinner';
import NoPermissions from '../../components/no-permissions';
import { fetchUser } from '../../actions/user-actions';

class VipAssistent extends React.Component {

    render() {
        return (
            <div id="vip-assistent">

                <div className="ass-header"><Header /></div>

                <div className="ass-info">
                    <div className="ass-photo"></div>
                    <div className="ass-label">Ваш персональный <br /> ассистент</div>
                </div>

                <div className="ass-chat">
                    <ScenesChat
                        loading={false}
                        messages={[]}
                        sendMessage={this.sendMessage}
                        isPrivate={true}
                        ref="scenesChat"
                    />
                </div>
            </div>
        )
    }

}
class VipAssistentContainer extends React.Component {

    componentDidMount() {
        this.props.fetchUser()
    }

    render() {

        const { loading, user, error } = this.props.user;

        let errorUserPermissions = false;
        if (user) errorUserPermissions = error || user.range === 1 || user.range === 2


        return (

            <div style={{ height: '100%', width: '100%' }}>
                {
                    (!loading && !errorUserPermissions) &&
                    <VipAssistent />
                }
                {
                    (loading) && <Spinner big={1} />
                }
                {
                    (!loading && errorUserPermissions) && <NoPermissions />
                }
            </div>
        )
    }

}

const mapStateToProps = ({ user }) => {
    return {
        user: user
    }
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
        fetchUser: fetchUser(apiService, dispatch)
    }
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps))(VipAssistentContainer);