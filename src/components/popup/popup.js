import React from "react";
import './popup.scss';
import posed, { PoseGroup } from "react-pose";

class Popup extends React.Component {

	state = {
		open: false
	}

	render () {
		return (
			<PoseGroup>
				{this.state.open && [
					<Shade key="shade" className="alley-shade"/>,
					<Modal key="modal" className="alley-modal-wrap" style={{maxWidth: '600px'}}>
						<div className="alley-modal">
							<div className="alley-modal-container">
								<div className="confirm-title">Добро пожаловать в менторские гостинные</div>
								<div className="confirm-desc">
									<div className="">Забронируйте время и поучаствуйте в персональной видеовстрече с выбранным ментором. </div>
									<div className="mt-3">Для этого:</div>
									<div className="">1. Выберите ментора</div>
									<div className="">2. Нажмите на стрелку на его карточке и выберите время встречи</div>
									<div className="">3. В назначено время вернитесь в этот раздел, на карточке ментора появится кнопка «Перейти в гостиную». Кликнув на неё, вы перейдёте в персональную видеоконференцию.</div>
									<div className="mt-3">Вы можете забронировать не более трёх встреч</div>
								</div>
								<div className="confirm-buttons">
									<button className="e-button primary cancel" onClick={this.closeIntroPopup}>Понятно</button>
								</div>
							</div>
							
						</div>
					</Modal>
				]}
			</PoseGroup>
		)
	}
}

export default Popup;