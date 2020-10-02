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
        // console.log(value);
    }

    render() {
        const { chatIsOpen } = this.state;

        const {
            /*сцены*/
            sceneUrl,
            scene, //порядковый номер сцены
            scenes, //все сцены
            setScene, //установить текущую сцену
            lang, //язык текущей сцены
            setLang, //установить язык
            

            t, //локализация

        } = this.props;

        const { generalChatId, spikerChatId, sponsorChatId} = scenes[scene] || {
            generalChatId: 0,
            spikerChatId: 0,
            sponsorChatId:0
        }

        let langList = [];
        if  (scenes[scene]['eng']) langList.push('eng');
        if  (scenes[scene]['ua']) langList.push('ua');


       

        return (
            <div id="scenes-mobile">

                <ScenesChecker
                    isVisible={!chatIsOpen}
                    sceneNumber={scene}
                    scenes={scenes}
                    setScene={setScene}
                    t={t}
                />

                <ScenesVideo sceneUrl={sceneUrl} />

                <ScenesVideoActions isVisible={!chatIsOpen}>
                    <ScenesReactions sceneNumber={scene} />
                    <ScenesLangChecker lang={lang} setLang={setLang} langList={langList}/>
                </ScenesVideoActions>

                {/* <ScenesBanner isVisible={!chatIsOpen} /> */}
                <ScenesTimetable isVisible={!chatIsOpen} t={t} />

                <ScenesChatMobile
                    onOpen={() => this.onChangeChatIsOpenValue(true)}
                    onClose={() => this.onChangeChatIsOpenValue(false)}
                    generalChatId={generalChatId}
                    spikerChatId={spikerChatId}
                    sponsorChatId={sponsorChatId}
                    t={t}
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