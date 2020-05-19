import React from 'react';
import "./stikers.css"

class Stikers extends React.Component {

    render() {

        return (
            <div id="stikers">
                <div className="stikers-wrapper">
                    <div className="stikers-caption">
                        ОЦЕНИТЕ ВЫСТУПЛЕНИЕ СПИКЕРА
                    </div>
                    <div className="stiker-list">
                        <img className="stiker-list-item" src={require("../../images/stikers/heart.svg")} />
                        <img className="stiker-list-item" src={require("../../images/stikers/fire.svg")} />
                        <img className="stiker-list-item" src={require("../../images/stikers/happy.svg")} />
                        <img className="stiker-list-item" src={require("../../images/stikers/normal.svg")} />
                        <img className="stiker-list-item" src={require("../../images/stikers/sad.svg")} />
                    </div>
                </div>

            </div>
        )
    }
}




export default Stikers;
