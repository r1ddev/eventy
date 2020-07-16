import React from 'react';
import './scenes-video.scss';

class ScenesVideo extends React.Component {


  render() {

    const { sceneUrl } = this.props;

    return (
      <div id="scenes-video">
        <div className="translation-content">
          <div className="video-container">
            <iframe
              title="translation"
              src={sceneUrl}
              width="640"
              height="382"
              frameBorder="0"
              webkitallowfullscreen="1"
              mozallowfullscreen="1"
              allowFullScreen="1">
            </iframe>
          </div>
        </div>
      </div >
    )
  }

}

export default ScenesVideo;