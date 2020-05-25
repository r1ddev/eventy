import React from 'react';
import './vip-assistent.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import Header from '../../components/header/header';
import ScenesChat from '../../components/scenes-chat/scenes-chat';

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