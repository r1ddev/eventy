import React from 'react';
import './scenes-timetable.scss';

class ScenesTimetable extends React.Component {

  render() {
    return (
      <div id="scenes-timetable">
        <span className="caption">Расписание</span>
        <span className="current">10:10 | 1 спикер</span>
        <span>10:20 | 2 спикер</span>
        <span>10:30 | 3 спикер</span>
        <span>10:40 | 4 спикер</span>
        <span>10:50 | 5 спикер</span>
        <span>10:60 | 6 спикер</span>
        <span>11:10 | 7 спикер</span>
      </div >
    )
  }
}


export default ScenesTimetable;