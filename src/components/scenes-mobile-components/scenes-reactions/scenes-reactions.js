import React from 'react';
import './scenes-reactions.scss';

class ScenesReactions extends React.Component {

  render() {


    return (
      <div id="scenes-reactions">
        <div className="stiker-reaction"><img alt="" src={require("../../../images/stikers/heart.svg")} /></div>
        <div className="stiker-reaction"><img alt="" src={require("../../../images/stikers/fire.svg")} /></div>
        <div className="stiker-reaction"><img alt="" src={require("../../../images/stikers/happy.svg")} /></div>
        <div className="stiker-reaction"><img alt="" src={require("../../../images/stikers/normal.svg")} /></div>
        <div className="stiker-reaction"><img alt="" src={require("../../../images/stikers/sad.svg")} /></div>
      </div >
    )
  }
}


export default ScenesReactions;