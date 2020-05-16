import React from 'react';
import './presentations.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class Presentations extends React.Component {

    render() {
        return (
            <div>
                Презентации
            </div>
        )
    }

}
class PresentationsContainer extends React.Component {

    render() {

        return (
            <Presentations />
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
    connect(mapStateToProps, mapDispatchToProps))(PresentationsContainer);