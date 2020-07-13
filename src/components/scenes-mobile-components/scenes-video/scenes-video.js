import React from 'react';
import './scenes-video.scss';

class ScenesVideo extends React.Component {

  render() {
    return (
      <div id="scenes-video">
        <div className="translation-content">
          <div className="video-container">
            <iframe
              title="translation"
              src={'https://player.vimeo.com/video/123538098'}
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