import React from 'react';
import './exposure.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

class Exposure extends React.Component {

    render() {
        return (
            <div>
                Экспозона
            </div>
        )
    }

}
class ExposureContainer extends React.Component {

    render() {

        return (
            <Exposure />
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
    connect(mapStateToProps, mapDispatchToProps))(ExposureContainer);