import React from 'react';
import "./stikers.css"
import IdeaFirstApiService from '../../services/idea-first-api-service';
import posed from 'react-pose';

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

class Stikers extends React.Component {
    state = {
        banner: null,
        bannerurl: null,

    }
    timerId = null;
    _ismounted = null;

    postReaction = (id) => {
        let api = new IdeaFirstApiService();
        api.postReaction(this.props.scene, id)
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
        }, 30000)

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
    }

    componentWillUnmount() {
        this._ismounted = false;
        clearTimeout(this.timerId)
    }



    render() {

        const { lang, setLang, scenes, scene } = this.props;
        const { banner, bannerurl } = this.state;

        let engExists = 1;
        if (scenes.length) { engExists = scenes[scene]['eng'] }

        return (
            <div id="stikers">
                <div className="wrapper-of-wrappers">

                    {(!banner) && <div className="emoji-stikers-wrapper">
                        <div className="emoji-stikers">
                            <div className="emoji-stikers-caption">
                                ОЦЕНИТЕ ВЫСТУПЛЕНИЕ
                        </div>
                            <div className="emoji-stikers-list">

                                <Stiker className="emoji-stikers-item" onClick={() => this.postReaction(1)}>
                                    <img alt="" src={require("../../images/stikers/heart.svg")} />
                                </Stiker>
                                <Stiker className="emoji-stikers-item" onClick={() => this.postReaction(2)}>
                                    <img alt="" src={require("../../images/stikers/fire.svg")} />
                                </Stiker>
                                <Stiker className="emoji-stikers-item" onClick={() => this.postReaction(3)}>
                                    <img alt="" src={require("../../images/stikers/happy.svg")} />
                                </Stiker>
                                <Stiker className="emoji-stikers-item" onClick={() => this.postReaction(4)}>
                                    <img alt="" src={require("../../images/stikers/normal.svg")} />
                                </Stiker>
                                <Stiker className="emoji-stikers-item" onClick={() => this.postReaction(5)}>
                                    <img alt="" src={require("../../images/stikers/sad.svg")} />
                                </Stiker>
                            </div>
                        </div>
                    </div>}

                    {(banner) && <div className="banner-wrapper">
                        <a href={bannerurl} style={{ display: 'block', width: '100%' }}><img className="banner" alt='' src={(banner ? banner : '')}></img></a>
                    </div>
                    }
                    <div className="language-stikers-wrapper" style={{ visibility: (engExists ? 'visible' : 'hidden') }}>
                        <div className="language-stikers">
                            <div className="language-stikers-caption">
                                язык трансляции
                        </div>
                            <div className="language-stikers-list">
                                <div className="language-stikers-item" onClick={() => setLang('rus')}>
                                    {(lang === 'rus') && <img alt="" src={require("../../images/stikers/RU-active.svg")} />}
                                    {(lang === 'eng') && <img alt="" src={require("../../images/stikers/RU.svg")} />}

                                </div>
                                <div className="language-stikers-item" onClick={() => setLang('eng')}>
                                    {(lang === 'eng') && <img alt="" src={require("../../images/stikers/ENG-active.svg")} />}
                                    {(lang === 'rus') && <img alt="" src={require("../../images/stikers/ENG.svg")} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="timetable-wrapper">
                    <a href="https://drive.google.com/file/d/1bmXC2Ar2q_FtwcAthTF8NlsybVLf2Mll/view?usp=sharing" target="_blank" style={{ display: 'block', width: '100%' }}><img className='timetable' src={require("../../images/program.svg")}></img></a>
                </div>
            </div>
        )
    }
}


export default Stikers;
