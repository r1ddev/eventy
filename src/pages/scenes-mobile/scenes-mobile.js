import React from 'react';
import './scenes-mobile.scss'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';

import ScenesChecker from '../../components/scenes-mobile-components/scenes-checker';
import ScenesVideo from '../../components/scenes-mobile-components/scenes-video';
import ScenesVideoActions from '../../components/scenes-mobile-components/scenes-video-actions';
import ScenesReactions from '../../components/scenes-mobile-components/scenes-reactions';
import ScenesLangChecker from '../../components/scenes-mobile-components/scenes-lang-checker';
import ScenesBanner from '../../components/scenes-mobile-components/scenes-banner';
import ScenesTimetable from '../../components/scenes-mobile-components/scenes-timetable';
import ScenesChatMobile from './scenes-chat-mobile-container';



class ScenesMobile extends React.Component {

    state = {
        chatIsOpen: false,
    }

    onChangeChatIsOpenValue = (value) => {
        this.setState({ chatIsOpen: value })
        console.log(value);
    }

    render() {
        const { chatIsOpen } = this.state;

        return (
            <div id="scenes-mobile">

                <ScenesChecker isVisible={!chatIsOpen} />
                <ScenesVideo />

                <ScenesVideoActions isVisible={!chatIsOpen}>
                    <ScenesReactions />
                    <ScenesLangChecker />
                </ScenesVideoActions>

                <ScenesBanner isVisible={!chatIsOpen} />
                <ScenesTimetable isVisible={!chatIsOpen} />

                <ScenesChatMobile
                    onOpen={() => this.onChangeChatIsOpenValue(true)}
                    onClose={() => this.onChangeChatIsOpenValue(false)}
                />

            </div >
        )
    }

}









class ScenesMobileContainer extends React.Component {

    render() {

        return (
            <ScenesMobile {...this.props} />
        )
    }

}

const mapStateToProps = ({ }) => {
    return {

    }
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
    }
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps))(ScenesMobileContainer);