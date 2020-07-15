import React from 'react';
import './scenes-banner.scss';

class ScenesBanner extends React.Component {

  render() {

    const { isVisible = true } = this.props;

    return (
      <div id="scenes-banner" className={(isVisible) ? '' : 'hidden'}>
        <img alt="" src={"http://demo.smit.events/images/smitbanner.png"} />
      </div >
    )
  }
}

export default ScenesBanner;