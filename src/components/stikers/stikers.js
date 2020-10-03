import React from 'react';
import "./stikers.scss"
import IdeaFirstApiService from '../../services/idea-first-api-service';
import posed from 'react-pose';
import { fetchTimers } from '../../actions/timers-actions';
import withApiService from "../../components/hoc/with-api-service";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "../../utils";

const Stiker = posed.div({
    draggable: true,
    init: { scale: 1 },
    drag: {
        scale: 1.3,
    },

    dragEnd: {
        x: 0,
        y: 0,
        transition: { type: 'spring' }
    }
});


const Box = posed.div({
    visible: { 
      opacity: 1,
      scale: 1.3,
      x: 20,
      y: 20,
      transition: { duration: 600 }
    },
    hidden: { 
      opacity: 0,
      scale: 0.8,
      x: 0,
      y: 0,
      transition: { duration: 600 } }
  });

  
class Stikers extends React.Component {
    state = {
        banner: null,
        bannerurl: null,
        bannerTime: this.props.timers.bannerTime,
        isVisible: false,
        current: null,
    }
    timerId = null;
    _ismounted = null;

    postReaction = (id) => {
        let api = new IdeaFirstApiService();
        api.postReaction(this.props.scene, id)
    }

    
    reactionUrls = [
        require("../../images/stikers/heart.svg"),
        require("../../images/stikers/fire.svg"),
        require("../../images/stikers/normal.svg"),
        require("../../images/stikers/sad.svg"),
        require("../../images/stikers/sad.svg"),
        require("../../images/stikers/arm.svg"),
    ]


    onPressReaction=(number)=>{
        this.postReaction(number);
        this.setState({
        isVisible: true,
        current: number, 
        }, ()=>{
        setTimeout(()=>{
            this.setState({
            isVisible: false
            })
        },1500)
        })
    }

    componentDidMount() {
        this._ismounted = true;
        this.getBanner();
    }

    getBanner = () => {
        const api = new IdeaFirstApiService();
        const idScene = this.props.scene

        api.getBanner(idScene)
            .then((res) => {
                if (this._ismounted) {
                    this.setState({ banner: res.data.image, bannerurl: res.data.url })
                }
            })

        this.timerId = setTimeout(() => {
            this.getBanner();
        }, this.state.bannerTime)

    }

    componentDidUpdate(prevProps) {
        if (prevProps.scene !== this.props.scene) {
            const api = new IdeaFirstApiService();
            const idScene = this.props.scene
            api.getBanner(idScene)
                .then((res) => {
                    if (this._ismounted) {
                        this.setState({ banner: res.data.image, bannerurl: res.data.url })
                    }
                })
        }


        if (prevProps.timers !== this.props.timers) {
            this.setState({
                bannerTime: this.props.timers.bannerTime
            })
        }
    }

    componentWillUnmount() {
        this._ismounted = false;
        clearTimeout(this.timerId)
    }



    render() {

        const { lang, setLang, scenes, scene, t } = this.props;
        const { banner, bannerurl } = this.state;

        let engExists = 1;
        if (scenes.length) { engExists = scenes[scene]['eng'] }

        const api = new IdeaFirstApiService();

        return (
            <div id="stikers">
                 <Box
                    className="stiker-reaction-float"
                    pose={this.state.isVisible ? 'visible' : 'hidden'}>
                    <img alt="" src={this.reactionUrls[this.state.current-1]}/>
                </Box>
                <div className="wrapper-of-wrappers">

                    {(!banner) && <div className="emoji-stikers-wrapper">
                       
                        <div className="emoji-stikers">
                            {/* <div className="emoji-stikers-caption">
                                ОЦЕНИТЕ ВЫСТУПЛЕНИЕ
                            </div> */}
                            <div className="emoji-stikers-list">

                                <Stiker className="emoji-stikers-item" onClick={() => this.onPressReaction(1)}>
                                    <img alt="" src={require("../../images/stikers/heart.svg")} />
                                </Stiker>
                                <Stiker className="emoji-stikers-item" onClick={() => this.onPressReaction(2)}>
                                    <img alt="" src={require("../../images/stikers/fire.svg")} />
                                </Stiker>
                                <Stiker className="emoji-stikers-item" onClick={() => this.onPressReaction(3)}>
                                    <img alt="" src={require("../../images/stikers/normal.svg")} />
                                </Stiker>
                                <Stiker className="emoji-stikers-item" onClick={() => this.onPressReaction(4)}>
                                    <img alt="" src={require("../../images/stikers/sad.svg")} />
                                </Stiker>
                                <Stiker className="emoji-stikers-item" onClick={() => this.onPressReaction(5)}>
                                    <img alt="" src={require("../../images/stikers/robot.svg")} />
                                </Stiker>
                                <Stiker className="emoji-stikers-item" onClick={() => this.onPressReaction(6)}>
                                    <img alt="" src={require("../../images/stikers/arm.svg")} />
                                </Stiker>

                                
                            </div>
                        </div>
                    </div>}

                    {(banner) && <div className="banner-wrapper">
                        <a onClick={() => api.postUrl(bannerurl)} target="_blank" href={bannerurl} style={{ display: 'block', width: '100%', height: '100%', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(${banner})` }}></a>
                    </div>
                    }

                    <div className="language-stikers-wrapper" style={{ visibility: (engExists ? 'visible' : 'hidden') }}>
                        <div className="language-stikers">
                            <div className="language-stikers-caption">
                                {t('язык трансляции')}
                            </div>
                            <div className="language-stikers-list">
                                <div className="language-stikers-item" onClick={() => setLang('ua')}>
                                    {(lang === 'ua') && <img alt="" src={require("../../images/stikers/UKR-active.svg")} />}
                                    {(lang === 'eng') && <img alt="" src={require("../../images/stikers/UKR.svg")} />}

                                </div>
                                <div className="language-stikers-item" onClick={() => setLang('eng')}>
                                    {(lang === 'eng') && <img alt="" src={require("../../images/stikers/ENG-active.svg")} />}
                                    {(lang === 'ua') && <img alt="" src={require("../../images/stikers/ENG.svg")} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="timetable-wrapper">
                    <a href="https://drive.google.com/file/d/1bmXC2Ar2q_FtwcAthTF8NlsybVLf2Mll/view?usp=sharing" target="_blank" style={{ display: 'block', width: '100%' }}><img className='timetable' src={require("../../images/program.svg")}></img></a>
                </div> */}
            </div>
        )
    }
}


const mapStateToProps = ({ notifications, timers }) => {
    return {
        notifications,
        timers
    };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {

        fetchTimers: () => fetchTimers(apiService, dispatch)
    };
};

export default compose(
    withTranslation(),
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Stikers);

