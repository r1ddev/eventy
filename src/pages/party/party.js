import React from 'react';
import './party.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import Spinner from '../../components/spinner';
import NoPermissions from '../../components/no-permissions';
import { fetchUser } from '../../actions/user-actions';

class Party extends React.Component {

    render() {
        return (
            <div>
                Вечеринка
            </div>
        )
    }

}
class PartyContainer extends React.Component {

    componentDidMount() {
        this.props.fetchUser()
    }

    render() {

        const { loading, user, error } = this.props.user;

        let errorUserPermissions = false;
        if (user) errorUserPermissions = error || user.range === 1


        return (

            <div style={{ height: '100%', width: '100%' }}>
                {
                    (!loading && !errorUserPermissions) &&
                    <Party />
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
    connect(mapStateToProps, mapDispatchToProps))(PartyContainer);