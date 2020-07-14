import React from 'react';
import './scenes-checker.scss';

class ScenesChecker extends React.Component {

  render() {

    const { isVisible = true } = this.props;

    return (
      <div id="scenes-checker" className={(isVisible) ? '' : 'hidden'}>
        <div className="scenes-checker--item active inprogress">Сцена 1</div>
        <div className="scenes-checker--item">Сцена 2</div>
        <div className="scenes-checker--item inprogress">Сцена 3</div>
        <div className="scenes-checker--item">Сцена 4</div>
        <div className="scenes-checker--item">Сцена 5</div>
        <div className="scenes-checker--item">Сцена 6</div>
      </div >
    )
  }

}

export default ScenesChecker;