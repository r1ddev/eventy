import React from 'react';
import './scenes-video-actions.scss';

class ScenesVideoActions extends React.Component {

  render() {
    return (
      <div id="scenes-video-actions">
        {this.props.children}
      </div>
    )
  }
}


export default ScenesVideoActions;