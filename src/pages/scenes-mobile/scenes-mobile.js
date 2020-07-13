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
import ScenesChatMobile from '../../components/scenes-mobile-components/scenes-chat-mobile';


class ScenesMobile extends React.Component {

    render() {

        return (
            <div id="scenes-mobile">
                {/* <ScenesChecker /> */}
                <ScenesVideo />
                {/* <ScenesVideoActions>
                    <ScenesReactions />
                    <ScenesLangChecker />
                </ScenesVideoActions>
                <ScenesBanner />
                <ScenesTimetable /> */}
                <ScenesChatMobile />
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