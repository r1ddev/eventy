import React from 'react';
import './quest.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import ErrorIndicator from '../../components/error-indicator'
import NoPermissions from '../../components/no-permissions';

class Quest extends React.Component {

    render() {
        return (
            <div>
                Квест
            </div>
        )
    }

}
class QuestContainer extends React.Component {


    componentDidMount() {
    }
    render() {

        return (
            <NoPermissions />

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
    connect(mapStateToProps, mapDispatchToProps))(QuestContainer);