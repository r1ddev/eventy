import React from 'react';
import './scenes-reactions.scss';
import IdeaFirstApiService from '../../../services/idea-first-api-service';
import posed from 'react-pose';

const Box = posed.div({
  visible: { 
    opacity: 1,
    scale: 1.3,
    x: -20,
    y: -20,
    transition: { duration: 700 }
  },
  hidden: { 
    opacity: 0,
    scale: 0.8,
    x: 0,
    y: 0,
    transition: { duration: 700 } }
});

class ScenesReactions extends React.Component {

  state={
    isVisible: false,
    current: null,
  }

  reactionUrls = [
    require("../../../images/stikers/heart.svg"),
    require("../../../images/stikers/fire.svg"),
    require("../../../images/stikers/normal.svg"),
    require("../../../images/stikers/sad.svg"),
    require("../../../images/stikers/sad.svg"),
    require("../../../images/stikers/arm.svg"),
  ]

  postReaction = (id) => {
    let api = new IdeaFirstApiService();
    api.postReaction(this.props.sceneNumber, id)
  }

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

  

  render() {


    return (
      <div id="scenes-reactions">
        <div className="stiker-reaction" onClick={() => this.onPressReaction(1)}><img alt="" src={require("../../../images/stikers/heart.svg")} /></div>
        <div className="stiker-reaction" onClick={() => this.onPressReaction(2)}><img alt="" src={require("../../../images/stikers/fire.svg")} /></div>
        <div className="stiker-reaction" onClick={() => this.onPressReaction(3)}><img alt="" src={require("../../../images/stikers/normal.svg")} /></div>
        <div className="stiker-reaction" onClick={() => this.onPressReaction(4)}><img alt="" src={require("../../../images/stikers/sad.svg")} /></div>
        <div className="stiker-reaction" onClick={() => this.onPressReaction(6)}><img alt="" src={require("../../../images/stikers/arm.svg")} /></div>
        <Box
          className="stiker-reaction-float"
          pose={this.state.isVisible ? 'visible' : 'hidden'}>
             <img alt="" src={this.reactionUrls[this.state.current-1]}/>
        </Box>
         
      
      </div >
    )
  }
}


export default ScenesReactions;