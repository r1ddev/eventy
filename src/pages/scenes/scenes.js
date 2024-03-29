import React from "react";
import "./scenes.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import ScenesChat from "./scenes-chat-container";
import Stikers from "../../components/stikers";
import { fetchScenes } from "../../actions/scenes-actions";
import { fetchUser } from "../../actions/user-actions";
import { withTranslation } from "react-i18next";

import { setVideoFrameVisible } from "../../actions/floatvideo-actions";
import { setVideoFixed } from "../../actions/floatvideo-actions";
import { setVideoFloated } from "../../actions/floatvideo-actions";
import { setCurrentSceneUrl } from "../../actions/floatvideo-actions";

import Spinner from "../../components/spinner";
import api from "./../../js/api";
import Header from "../../components/header/header";
import { isMobile } from "react-device-detect";
import ScenesMobile from "../scenes-mobile";
import ScenesVideo from "../../components/scenes-mobile-components/scenes-video";

import posed from 'react-pose';

const Box = posed.div({
  visible: { 
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: { duration: 400 }
  },
  hidden: { 
    opacity: 0,
    scale: 0.6,
    x: 0,
    y: -50,
    transition: { duration: 400 } }
});

class Scenes extends React.Component {
  componentDidMount() {
    this.props.setCurrentSceneUrl(this.props.sceneUrl);
  }

  getChatName = () =>{
    if (this.props.scene === 0) return "Про дела";
    if (this.props.scene === 1) return "Про карьеру";
    if (this.props.scene === 2) return "Про себя";

  }

  render() {
    const { sceneUrl, scene, lang, setLang, setScene, scenes, user, t } = this.props;

    const { generalChatId, sponsorChatId, spikerChatId } = scenes[scene] || {
      generalChatId: 0,
      sponsorChatId: 0,
      spikerChatId: 0,
    };

    let origin = api.origin;
    let newAvatar = api.auth.getAvatarLocation() + user.avatar;

    // console.log(user);

    return (
      <div id="scenes">
         <div className="chat-header">
            <Header data={user} expand>
              <></>
            </Header>
            {/* <Link to='/profile'><div style={{ backgroundImage: `url(${newAvatar})` }}></div></Link> */}
          </div>

        <div className="content-wrapper">
          <div className="scenes-translation">
            <TranslationHeader scene={scene} setScene={setScene} scenes={scenes} t={t} />
            <div className="translation-content">
              <div className="video-container">
                {/* <iframe
                                  title="translation"
                                  src={sceneUrl}
                                  width="640"
                                  height="382"
                                  frameBorder="0"
                                  webkitallowfullscreen="1"
                                  mozallowfullscreen="1"
                                  allowFullScreen="1">
                              </iframe> */}
              </div>
            </div>
            <div className="translation-footer">
              <Stikers lang={lang} setLang={setLang} scenes={scenes} scene={scene} />
            </div>
            
            
          </div>
          <div className="scenes-chat">
            {/* {scenes[scene]['frame_url']!==null&&<div className={'pull'}>
              <ScenesVideo sceneUrl={scenes[scene]['frame_url']}/>
            </div>} */}

            <Box
              className="pull"
              pose={scenes[scene]['frame_url']!==null? 'visible' : 'hidden'}>
                 <ScenesVideo sceneUrl={scenes[scene]['frame_url']}/>
            </Box>

            <div className="chat-content">
              <ScenesChat
                sponsorChatId={sponsorChatId}
                generalChatId={generalChatId}
                spikerChatId={spikerChatId}
                user={user}
                chatname={this.getChatName()}
              />
            </div>
          </div>
          
          </div> 
      </div>
    );
  }
}

class TranslationHeader extends React.Component {
  render() {
    const { setScene, scene, scenes, t } = this.props;

    return (
      <div className="translation-header">
        <div className="scene-item">
          <div>
            <div className={scene === 0 ? "scene-btn-active" : "scene-btn"} onClick={() => setScene(0)}>
              {t('Про дела')}
            </div>
            {/* <div className="scene-status" style={{ visibility: scenes[0].status ? "visible" : "hidden" }}>
              {t('Идет')}
            </div> */}
          </div>
        </div>

        <div className="scene-item">
          <div>
            <div className={scene === 1 ? "scene-btn-active" : "scene-btn"} onClick={() => setScene(1)}>
              {t('Про карьеру')}
            </div>
            {/* <div className="scene-status" style={{ visibility: scenes[1].status ? "visible" : "hidden" }}>
              {t('Идет')}
            </div> */}
          </div>
        </div>

        <div className="scene-item">
          <div>
            <div className={scene === 2 ? "scene-btn-active" : "scene-btn"} onClick={() => setScene(2)}>
              {t('Про себя')}
            </div>
            {/* <div className="scene-status" style={{ visibility: scenes[1].status ? "visible" : "hidden" }}>
              {t('Идет')}
            </div> */}
          </div>
        </div>

        {/* <div className="scene-item">
                    <div>
                        <div className={(scene === 1) ? 'scene-btn-active' : 'scene-btn'} onClick={() => setScene(1)}>СЦЕНА 2</div>
                        <div className="scene-status" style={{ visibility: (scenes[1].status ? 'visible' : 'hidden') }}>идет</div>
                    </div>
                </div>

                <div className="scene-item">
                    <div>
                        <div className={(scene === 2) ? 'scene-btn-active' : 'scene-btn'} onClick={() => setScene(2)}>СЦЕНА 3</div>
                        <div className="scene-status" style={{ visibility: (scenes[2].status ? 'visible' : 'hidden') }}>идет</div>
                    </div>
                </div> */}
      </div>
    );
  }
}

class ScenesContainer extends React.Component {
  state = {
    scene: 0,
    lang: "rus",
  };

  timerId = null;

  setScene = (scene) => {
    const { scenes } = this.props.scenes;
    const { lang } = this.state;

    this.setState({
      scene: scene,
      lang: this.props.scenes.scenes[scene][lang] ? lang : "rus",
    });
    this.props.setCurrentSceneUrl(scenes[scene][lang]);

  };

  setLang = (lang) => {
    const { scenes } = this.props.scenes;
    const { scene } = this.state;

    this.setState({
      lang: this.props.scenes.scenes[scene][lang] ? lang : "rus",
    });
    this.props.setCurrentSceneUrl(scenes[scene][lang]);
  };

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const scene = params.get('scene');
    console.log(scene)

    if (scene){
      this.setState({
        scene: +scene
      })
    }

    this.getScenes();
    this.props.fetchUser();
    this.props.setVideoFrameVisible();
    this.props.setVideoFixed();
  }

  getScenes = () => {
    this.props.fetchScenes();

    this.timerId = setTimeout(() => {
      this.getScenes();
    }, this.props.timers.sceneTime);
  };

  componentWillUnmount() {
    clearTimeout(this.timerId);
    this.props.setVideoFloated();
  }

  render() {
    const { scenes } = this.props.scenes;
    const { scene, lang } = this.state;
    const { user } = this.props.user;
    const scenesLoading = this.props.scenes.loading;
    const userLoading = this.props.user.loading;
    const t = this.props.t;


    const loading = userLoading || scenes.length === 0;

    return (
      <div style={{ height: "100%", width: "100%" }}>
        {!loading && !isMobile && (
          <Scenes
            sceneUrl={scenes[scene][lang]}
            scenes={scenes}
            scene={scene}
            lang={lang}
            setLang={this.setLang}
            setScene={this.setScene}
            user={user}
            t={t}
            setCurrentSceneUrl={this.props.setCurrentSceneUrl}
          />
        )}
        {!loading && isMobile && (
          <ScenesMobile
            sceneUrl={scenes[scene][lang]}
            scenes={scenes}
            scene={scene}
            lang={lang}
            setLang={this.setLang}
            setScene={this.setScene}
            user={user}
            t={t}
          />
        )}
        {loading && <Spinner big={1} />}
      </div>
    );
  }
}

const mapStateToProps = ({ scenes, user, timers }) => {
  return {
    scenes: scenes,
    user: user,
    timers: timers,
  };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
  return {
    fetchScenes: fetchScenes(apiService, dispatch),
    fetchUser: fetchUser(apiService, dispatch),
    setVideoFrameVisible: () => dispatch(setVideoFrameVisible()),
    setVideoFixed: () => dispatch(setVideoFixed()),
    setVideoFloated: () => dispatch(setVideoFloated()),
    setCurrentSceneUrl: (url) => dispatch(setCurrentSceneUrl(url)),
  };
};

export default compose(withTranslation(), withApiService(), connect(mapStateToProps, mapDispatchToProps))(ScenesContainer);
