import React from 'react';
import './quest.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

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

    render() {

        return (
            <Quest />
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