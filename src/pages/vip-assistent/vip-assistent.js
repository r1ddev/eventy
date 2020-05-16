import React from 'react';
import './vip-assistent.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

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

    render() {

        return (
            <VipAssistent />
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