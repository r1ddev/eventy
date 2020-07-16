import React from 'react';
import './scenes-reactions.scss';
import IdeaFirstApiService from '../../../services/idea-first-api-service';

class ScenesReactions extends React.Component {

  postReaction = (id) => {
    let api = new IdeaFirstApiService();
    api.postReaction(this.props.sceneNumber, id)
  }

  render() {


    return (
      <div id="scenes-reactions">
        <div className="stiker-reaction" onClick={() => this.postReaction(1)}><img alt="" src={require("../../../images/stikers/heart.svg")} /></div>
        <div className="stiker-reaction" onClick={() => this.postReaction(2)}><img alt="" src={require("../../../images/stikers/fire.svg")} /></div>
        <div className="stiker-reaction" onClick={() => this.postReaction(3)}><img alt="" src={require("../../../images/stikers/happy.svg")} /></div>
        <div className="stiker-reaction" onClick={() => this.postReaction(4)}><img alt="" src={require("../../../images/stikers/normal.svg")} /></div>
        <div className="stiker-reaction" onClick={() => this.postReaction(5)}><img alt="" src={require("../../../images/stikers/sad.svg")} /></div>
      </div >
    )
  }
}


export default ScenesReactions;