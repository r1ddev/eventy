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
                        <img className="stiker-list-item" src={require("../../images/stikers/stiker-1.svg")} />
                        <img className="stiker-list-item" src={require("../../images/stikers/stiker-2.svg")} />
                        <img className="stiker-list-item" src={require("../../images/stikers/stiker-3.svg")} />
                        <img className="stiker-list-item" src={require("../../images/stikers/stiker-4.svg")} />
                        <img className="stiker-list-item" src={require("../../images/stikers/stiker-5.svg")} />
                    </div>
                </div>

            </div>
        )
    }
}




export default Stikers;
