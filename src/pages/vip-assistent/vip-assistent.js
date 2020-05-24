import React from 'react';
import './vip-assistent.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import Spinner from '../../components/spinner'
import NoPermissions from '../../components/no-permissions'

class VipAssistent extends React.Component {

    render() {
        return (
            <div>
                Вип ассистент
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

        const errorUserPermissions = error || user.range !== 3


        return (

            <div style={{ height: '100%', width: '100%' }}>
                {
                    (!loading && !error) &&
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

const mapStateToProps = () => {
    return {
    }
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {

    }
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps))(VipAssistentContainer);