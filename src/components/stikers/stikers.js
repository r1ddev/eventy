import React from 'react';
import "./stikers.css"

class Stikers extends React.Component {

    render() {

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
                                <img alt="" src={require("../../images/stikers/heart.svg")} />
                            </div>
                            <div className="emoji-stikers-item">
                                <img alt="" src={require("../../images/stikers/heart.svg")} />
                            </div>
                            <div className="emoji-stikers-item">
                                <img alt="" src={require("../../images/stikers/heart.svg")} />
                            </div>
                            <div className="emoji-stikers-item">
                                <img alt="" src={require("../../images/stikers/heart.svg")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="language-stikers-wrapper"></div>
            </div>
        )
    }
}


// <div className="stikers-wrapper">
//                     <div className="stikers-caption">
//                         ОЦЕНИТЕ ВЫСТУПЛЕНИЕ СПИКЕРА
//                     </div>
//                     <div className="stiker-list row">
//                         <img className="stiker-list-item col" src={require("../../images/stikers/heart.svg")} />
//                         <img className="stiker-list-item col" src={require("../../images/stikers/fire.svg")} />
//                         <img className="stiker-list-item col" src={require("../../images/stikers/happy.svg")} />
//                         <img className="stiker-list-item col" src={require("../../images/stikers/normal.svg")} />
//                         <img className="stiker-list-item col" src={require("../../images/stikers/sad.svg")} />
//                     </div>
//                 </div>

export default Stikers;
