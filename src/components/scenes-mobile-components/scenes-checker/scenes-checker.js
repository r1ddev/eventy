import React from 'react';
import './scenes-checker.scss';

class ScenesChecker extends React.Component {

  render() {

    const { isVisible = true, sceneNumber, scenes, setScene, t } = this.props;


    return (
      <div id="scenes-checker" className={(isVisible) ? '' : 'hidden'}>

        <div className={"scenes-checker--item" +
          ((sceneNumber == 0) ? " active" : "") +
          ((scenes[0].status) ? " inprogress" : "")}
          onClick={() => setScene(0)}
        >
          {t('Главная сцена')}
        </div>

        <div className={"scenes-checker--item" +
          ((sceneNumber == 1) ? " active" : "") +
          ((scenes[1].status) ? " inprogress" : "")}
          onClick={() => setScene(1)}
        >
          {t('Умные решения')}
        </div>

      </div >
    )
  }

}

export default ScenesChecker;