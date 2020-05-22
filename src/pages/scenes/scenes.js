import React from 'react';
import './scenes.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import ScenesChat from './scenes-chat-container';
import Stikers from '../../components/stikers';
import { fetchScenes } from '../../actions/scenes-actions';


class Scenes extends React.Component {



    render() {

        const {
            sceneUrl,
            scene,
            lang,
            setLang,
            setScene,
            scenes
        } = this.props;

        const { generalChatId, sponsorChatId, spikerChatId } = scenes[scene] || {
            generalChatId: 0,
            sponsorChatId: 0,
            spikerChatId: 0
        }

        console.log(
            'gen', generalChatId,
            'spo', sponsorChatId,
            'spi', spikerChatId
        )

        return (
            <div id="scenes">
                <div className="scenes-translation">
                    <TranslationHeader scene={scene} setScene={setScene} />
                    <div className="translation-content">
                        <div className="video-container">
                            <iframe
                                title="translation"
                                src={sceneUrl}
                                width="800"
                                height="600"
                                frameBorder="0"
                                webkitallowfullscreen="1"
                                mozallowfullscreen="1"
                                allowFullScreen="1">
                            </iframe>
                        </div>
                    </div>
                    <div className="translation-footer">
                        <Stikers lang={lang} setLang={setLang} scenes={scenes} scene={scene} />
                    </div>
                </div>
                <div className="scenes-chat">
                    <div className="chat-header">
                        <div style={{ backgroundImage: 'url(https://images.eksmo.ru/upload/iblock/b51/fry_720.jpg)' }}></div>
                    </div>
                    <div className="chat-content">
                        <ScenesChat
                            sponsorChatId={sponsorChatId}
                            generalChatId={generalChatId}
                            spikerChatId={spikerChatId}
                        />
                    </div>
                </div>
            </div >
        )
    }

}

class TranslationHeader extends React.Component {


    render() {
        const { setScene, scene } = this.props;

        return (
            <div className="translation-header">

                <div className="scene-item">
                    <div>
                        <div className={(scene == 0) ? 'scene-btn-active' : 'scene-btn'} onClick={() => setScene(0)}>СЦЕНА 1</div>
                        <div className="scene-status">идет</div>
                    </div>
                </div>

                <div className="scene-item">
                    <div>
                        <div className={(scene == 1) ? 'scene-btn-active' : 'scene-btn'} onClick={() => setScene(1)}>СЦЕНА 2</div>
                        <div className="scene-status">идет</div>
                    </div>
                </div>

                <div className="scene-item">
                    <div>
                        <div className={(scene == 2) ? 'scene-btn-active' : 'scene-btn'} onClick={() => setScene(2)}>СЦЕНА 3</div>
                        <div className="scene-status">идет</div>
                    </div>
                </div>

            </div>
        )
    }

}

class ScenesContainer extends React.Component {

    state = {
        scene: 0,
        lang: 'rus'
    }

    setScene = (scene) => {

        const { lang } = this.state

        this.setState({
            scene: scene,
            lang: (this.props.scenes.scenes[scene][lang]) ? lang : 'rus'
        })
    }

    setLang = (lang) => {

        const { scene } = this.state

        this.setState({
            lang: this.props.scenes.scenes[scene][lang] ? lang : 'rus'
        })
    }

    componentDidMount() {
        this.props.fetchScenes();
    }

    render() {
        const { scenes } = this.props.scenes
        const { scene, lang } = this.state;

        let sceneUrl = null;

        if (scenes[scene]) {
            sceneUrl = scenes[scene][lang];
        }

        console.log('ЭМ', scenes)

        return (
            <Scenes
                sceneUrl={sceneUrl}
                scenes={scenes}
                scene={scene}
                lang={lang}
                setLang={this.setLang}
                setScene={this.setScene}
            />
        )
    }

}

const mapStateToProps = ({ scenes }) => {
    return {
        scenes: scenes
    }
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
        fetchScenes: fetchScenes(apiService, dispatch),
    }
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps))(ScenesContainer);