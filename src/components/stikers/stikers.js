import React from 'react';
import "./stikers.css"

class Stikers extends React.Component {

    render() {

        const { lang, setLang, scenes, scene } = this.props;

        let engExists = 1;
        if (scenes.length) { engExists = scenes[scene]['eng'] }

        return (
            <div id="stikers">
                <div className="emoji-stikers-wrapper">
                    <div className="emoji-stikers">
                        <div className="emoji-stikers-caption">
                            ОЦЕНИТЕ ВЫСТУПЛЕНИЕ СПИКЕРА
                        </div>
                        <div className="emoji-stikers-list">
                            <div className="emoji-stikers-item">
                                <img alt="" src={require("../../images/stikers/heart.svg")} />
                            </div>
                            <div className="emoji-stikers-item">
                                <img alt="" src={require("../../images/stikers/fire.svg")} />
                            </div>
                            <div className="emoji-stikers-item">
                                <img alt="" src={require("../../images/stikers/happy.svg")} />
                            </div>
                            <div className="emoji-stikers-item">
                                <img alt="" src={require("../../images/stikers/normal.svg")} />
                            </div>
                            <div className="emoji-stikers-item">
                                <img alt="" src={require("../../images/stikers/sad.svg")} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="language-stikers-wrapper" style={{ visibility: (engExists ? 'visible' : 'hidden') }}>
                    <div className="language-stikers">
                        <div className="language-stikers-caption">
                            язык трансляции
                        </div>
                        <div className="language-stikers-list">
                            <div className="language-stikers-item" onClick={() => setLang('rus')}>
                                {(lang == 'rus') && <img alt="" src={require("../../images/stikers/RU-active.svg")} />}
                                {(lang == 'eng') && <img alt="" src={require("../../images/stikers/RU.svg")} />}

                            </div>
                            <div className="language-stikers-item" onClick={() => setLang('eng')}>
                                {(lang == 'eng') && <img alt="" src={require("../../images/stikers/ENG-active.svg")} />}
                                {(lang == 'rus') && <img alt="" src={require("../../images/stikers/ENG.svg")} />}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Stikers;
