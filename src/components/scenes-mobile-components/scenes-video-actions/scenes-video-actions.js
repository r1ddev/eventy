import React from 'react';
import './scenes-video-actions.scss';

class ScenesVideoActions extends React.Component {

  render() {

    const { isVisible = true } = this.props;

    return (
      <div id="scenes-video-actions" className={(isVisible) ? '' : 'hidden'}>
        {this.props.children}
      </div>
    )
  }
}


export default ScenesVideoActions;