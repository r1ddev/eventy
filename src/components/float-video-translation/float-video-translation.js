import React from 'react';
import "./float-video-translation.scss";
import { connect } from "react-redux";
import { compose } from "../../utils";
import ScenesVideo from '../scenes-mobile-components/scenes-video';
import { setVideoFrameHidden } from '../../actions/floatvideo-actions';

class FloatVideoTranslation extends React.Component {

  render() {

    const {
      frameIsVisible,
      frameIsFloating,
      currentSceneUrl
    } = this.props.floatvideo;

    // console.log(this.props.floatvideo)

    return (
      <div id="float-video-translation" className={(frameIsVisible ? ((frameIsFloating) ? 'floated' : '') : 'hidden')}>
        <div className="video">
          {(frameIsFloating) && <div className="close-btn" onClick={() => this.props.setVideoFrameHidden()}></div>}
          {(frameIsVisible) && <ScenesVideo sceneUrl={currentSceneUrl} />}


        </div>
        <div className="chat-place">

        </div>


      </div>
    )
  }
}



const mapStateToProps = ({ floatvideo }) => {
  return {
    floatvideo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVideoFrameHidden: () => dispatch(setVideoFrameHidden()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(FloatVideoTranslation);
