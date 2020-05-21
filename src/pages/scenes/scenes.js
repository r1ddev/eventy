import React from 'react';
import './scenes.css'
import withApiService from '../../components/hoc/with-api-service'
import { connect } from 'react-redux';
import { compose } from '../../utils';
import ScenesChat from './scenes-chat-container';
import Stikers from '../../components/stikers';

class Scenes extends React.Component {

    render() {
        return (
            <div id="scenes">
                <div className="scenes-translation">
                    <TranslationHeader />
                    <div className="translation-content">
                        <div className="video-container">
                            <iframe
                                title="translation"
                                src="https://player.vimeo.com/video/186022053"
                                width="800"
                                height="600"
                                frameBorder="0"
                                webkitallowfullscreen="1"
                                mozallowfullscreen="1"
                                allowFullScreen="1">
                            </iframe>
                        </div>
                    </div>
                    <div className="translation-footer">
                        <Stikers />
                    </div>
                </div>
                <div className="scenes-chat">
                    <div className="chat-header">
                        <div style={{ backgroundImage: 'url(https://images.eksmo.ru/upload/iblock/b51/fry_720.jpg)' }}></div>
                    </div>
                    <div className="chat-content">
                        <ScenesChat
                            sponsorChatId={1}
                            generalChatId={2}
                            spikerChatId={3}
                        />
                    </div>
                </div>
            </div >
        )
    }

}

class TranslationHeader extends React.Component {

    render() {
        return (
            <div className="translation-header">

                <div className="scene-item">
                    <div>
                        <div className="scene-btn">СЦЕНА 1</div>
                        <div className="scene-status">идет</div>
                    </div>
                </div>

                <div className="scene-item">
                    <div>
                        <div className="scene-btn">СЦЕНА 2</div>
                        <div className="scene-status">идет</div>
                    </div>
                </div>

                <div className="scene-item">
                    <div>
                        <div className="scene-btn">СЦЕНА 3</div>
                        <div className="scene-status">идет</div>
                    </div>
                </div>

            </div>
        )
    }

}

class ScenesContainer extends React.Component {

    render() {

        return (
            <Scenes />
        )
    }

}

const mapStateToProps = () => {
    return {
    }
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {

    }
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps))(ScenesContainer);