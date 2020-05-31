import React from 'react';
import './vip-assistent.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import Header from '../../components/header/header';
import ScenesChat from './vip-chat-container';
import Spinner from '../../components/spinner';
import NoPermissions from '../../components/no-permissions';
import { fetchUser } from '../../actions/user-actions';
import { Link } from 'react-router-dom';

class VipAssistent extends React.Component {

    render() {

        const {
            user
        } = this.props
        return (
            <div id="vip-assistent">

                <div className="ass-header">
                    <Header data={user}>
                        <></>
                        <div className="col d-flex align-items-center p-0">
                            <Link to="/messages/5" className="action-link">
                                Связь <br />с организаторами
                            </Link>
                        </div>
                    </Header>
                </div>

                <div className="ass-info">
                    <div className="ass-photo"></div>
                    <div className="ass-label">Ваш персональный <br /> ассистент</div>
                </div>

                <div className="ass-chat">
                    <ScenesChat user={user} />
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
        if (user) errorUserPermissions = error || user.range === 1 || user.range === 2 || user.range === 6;


        return (

            <div style={{ height: '100%', width: '100%' }}>
                {
                    (!loading && !errorUserPermissions) &&
                    <VipAssistent user={user} />
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