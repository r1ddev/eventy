import React from "react";
import "./alley.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import api from "../../js/api";
import Header from "../../components/header";
import Spinner from "../../components/spinner";
import NoPermissions from "../../components/no-permissions";
import { isMobile } from "react-device-detect";
import { fetchUser } from "../../actions/user-actions";
import { conversationRoomsLoading, conversationRoomsLoaded } from "../../actions/conversations-actions";

import posed, { PoseGroup } from "react-pose";

import { withTranslation } from "react-i18next";
import Langs from '../../utils/lang';
import { Collapse } from "react-collapse";
import { fetchAlleyRooms, openRooms } from "../../actions/conversations-alley-actions";
import IdeaFirstApiService from "../../services/idea-first-api-service";
import Rules from './../../utils/rules';

const Modal = posed.div({
    enter: {
        opacity: 1,
        transition: {
            default: { duration: 300 }
        }
    },
    exit: {
        opacity: 0,
        transition: { duration: 150 }
    }
});

const Shade = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
});

class Alley extends React.Component {

    state = {
        reserveError: null,
        reserveConfirm: null,
        reserveCancel: null,
        isModer: false
    }

    componentDidMount() {
        let isModer = new Rules().isModeratorHere(this.props.user.data.rules)
        this.setState({
            isModer: isModer
        })
    }

    ReserveAlleyRoom=(room, slot)=>{

        new IdeaFirstApiService().reserveAlleyRoom(room, slot).then(res => {
            this.props.getRooms();
        }).catch(e => {
            api.errorHandler(e, {
                "limit_user_places": () => {
                    this.setState({
                        reserveError: "Можно забронировать только 6 слотов"
                    })
                },
                "limit_user_in_room": () => {
                    this.setState({
                        reserveError: "Вы уже записаны в данную комнату"
                    })
                },
                "place_already_taken": () => {
                    this.setState({
                        reserveError: "Место уже занято"
                    })
                }
            })
        })
    }

    cancelAlleyRoom = (room, slot) => {
        new IdeaFirstApiService().cancelAlleyRoom(room, slot).then(res => {
            this.props.getRooms();
        }).catch(e => {
            api.errorHandler(e, {
                "user_not_in_place": () => {
                    this.setState({
                        reserveError: "Пользователь не найден"
                    })
                }
            })
        })
    }

    openConfirmPopup = (roomId, placeId, name, time) => {
        if (this.props.userSlots.length < this.props.maxReserveCount) {
            this.setState({
                reserveConfirm: {
                    roomId: roomId,
                    placeId: placeId,
                    name: name,
                    time: time,
                }
            })
        } else {
            this.setState({
                reserveError: "Можно забронировать только 3 слота"
            })
        }
        
    }

    closeConfirmPopup = () => {
        this.setState({
            reserveConfirm: null
        })
    }
    
    closeCancelPopup = () => {
        this.setState({
            reserveCancel: null
        })
    }

    closeErrorPopup = () => {
        this.setState({
            reserveError: null
        })
    }

    reserve = () => {
        this.closeConfirmPopup()
        this.ReserveAlleyRoom(this.state.reserveConfirm.roomId, this.state.reserveConfirm.placeId)
    }
    
    cancel = () => {
        this.closeCancelPopup()
        this.cancelAlleyRoom(this.state.reserveCancel.roomId, this.state.reserveCancel.placeId)
    }

    openCancelPopup = (e, roomId, placeId) => {
        this.setState({
            reserveCancel: {
                roomId: roomId,
                placeId: placeId,
            }
        })
        e.preventDefault()
    }

    isModerOnRoom = (roomUrl) => {
        return new Rules().isModeratorOn(roomUrl, this.props.user.data.rules)
    }

    render() {
        const { data } = this.props.user;
        const {rooms, userSlots} = this.props;
        const t = this.props.t;

        const roomlist = rooms.map((item)=>{

            let reservedData = this.props.userSlots.filter(s => s.room.id == item.id)
            let isReserved = reservedData.length > 0

            return(
                <div className="room-item">
                    <div className="room-content">
                        <img src={require("../../images/default-avatar.svg")} alt="" className="avatar"/>
                        <div className="title">{item.title}</div>
                        <div className="desc">Описание ментора и почему с ним должны хотеть говорить с (развёрнутым списком для брони)</div>
                    </div>
                    
                
                    {
                        reservedData.map(reserve => {
                            if (reserve.flazhok) {
                                return (
                                    <div className="reserve-info">
                                        <Link className="reserve-time" to="/desc">Перейти в гостиную</Link>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="reserve-info">
                                        <a className="reserve-time disabled">Забронировано на {reserve.time}</a>
                                        <a
                                            className="reserve-cancel"
                                            href="#"
                                            onClick={
                                                (e) => this.openCancelPopup(e, reserve.room.id, reserve.id)
                                            }
                                        >Отменить</a>
                                    </div>
                                )
                                
                            }
                        })
                    }
                    
                    {/* {
                        !isReserved &&
                        (    */}
                            <div className="select-time">
                                <div
                                    className={"select-time-title" + (item.open ? " open" : "")}
                                    onClick={()=>this.props.openRooms(item.id)}
                                    >Выбрать время</div>

                                <Collapse isOpened={item.open} className="reserve-wrapper">
                                    <div className="reserve-list">
                                        <div className="time-list">
                                            {
                                                item.chedule.map(time => {
                                                    return (
                                                        <button
                                                            className="time-button"
                                                            disabled={!time.available}
                                                            onClick={
                                                                ()=>{this.openConfirmPopup(item.id, time.place_id, item.title, time.time)}
                                                            }
                                                            >{time.time}</button>
                                                    )
                                                })
                                            }
                                        </div>
                                        {/* {reserveList(item.chedule, item.id, item.title)} */}
                                    </div>
                                </Collapse>
                            </div>
                        {/* )
                    } */}
                        
                </div>
            )
        })


        return (
            <div id="alley">
                {!isMobile && (
                    <Header data={data}>
                        <></>
                    </Header>
                )}

                <div className="container">
                    <div className="room-count">Количество оставшихся броней {this.props.maxReserveCount - this.props.userSlots.length}/{this.props.maxReserveCount}</div>
                    <div className="room-list">
                        {roomlist}
                    </div>

                </div>

                <PoseGroup>
                    {this.state.reserveError && [
                        // If animating more than one child, each needs a `key`
                        <Shade key="shade" className="alley-shade" onClick={this.closeErrorPopup}></Shade>,
                        <Modal key="modal" className="alley-modal-wrap">
                            <div className="alley-modal">
                                <div className="modal-close-btn" onClick={this.closeErrorPopup}></div>
                                <div className="alley-modal-container">
                                    {/* <div className="error-title">Ошибка :(</div> */}
                                    <div className="error-desc">{this.state.reserveError}</div>
                                </div>
                                
                            </div>
                        </Modal>
                    ]}
                </PoseGroup>

                <PoseGroup>
                    {this.state.reserveConfirm && [
                        // If animating more than one child, each needs a `key`
                        <Shade key="shade" className="alley-shade" onClick={this.closeConfirmPopup}/>,
                        <Modal key="modal" className="alley-modal-wrap">
                            <div className="alley-modal">
                                <div className="alley-modal-container">
                                    <div className="confirm-title">Подтверждение брони</div>
                                    <div className="confirm-desc">
                                        <div className="">Подтвердите бронирование времени видеовстречи</div>
                                        <div className="">Ментор: {this.state.reserveConfirm.name}</div>
                                        <div className="">Время: {this.state.reserveConfirm.time}</div>
                                    </div>
                                    <div className="confirm-buttons">
                                        <button className="e-button primary expand" onClick={this.reserve}>Да</button>
                                        <button className="e-button expand bordered cancel" onClick={this.closeConfirmPopup}>Отмена</button>
                                    </div>
                                </div>
                                
                            </div>
                        </Modal>
                    ]}
                </PoseGroup>

                <PoseGroup>
                    {this.state.reserveCancel && [
                        // If animating more than one child, each needs a `key`
                        <Shade key="shade" className="alley-shade" onClick={this.closeCancelPopup}/>,
                        <Modal key="modal" className="alley-modal-wrap">
                            <div className="alley-modal">
                                <div className="alley-modal-container">
                                    <div className="confirm-title">Отменить бронирование</div>
                                        <div className="confirm-buttons">
                                        <button className="e-button primary expand" onClick={this.cancel}>Отменить</button>
                                        <button className="e-button expand bordered cancel" onClick={this.closeCancelPopup}>Закрыть</button>
                                    </div>
                                </div>
                                
                            </div>
                        </Modal>
                    ]}
                </PoseGroup>
            </div>
        );
    }
}
class AlleyContainer extends React.Component {
    state = {
        rooms: []
    };

    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchAlleyRooms();
    }

    
    render() {
        let loading = true;

        const {user, rooms, maxReserveCount, loading: alleyLoading, error} = this.props.alley;
        const { loading: userLoading, data: userData  } = this.props.user;

        loading = !rooms || !userData;

        console.log(this.props.alley);

        return (
            <>
                {!loading &&
                 <Alley 
                    {...this.props} 
                    rooms={rooms} 
                    userSlots={user} 
                    maxReserveCount={maxReserveCount} 
                    openRooms={this.props.openRooms} 
                    getRooms={this.props.fetchAlleyRooms}
                    reserveAlleyRoom={this.props.reserveAlleyRoom}
                    
                    />}
                {loading && <Spinner big={1} />}
            </>
        );
    }
}

const mapStateToProps = ({ user, conversations,alley }) => {
    return {
        user,
        conversations,
        alley,
    };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
        conversationRoomsLoading: () => conversationRoomsLoading(dispatch),
        conversationRoomsLoaded: (rooms) => conversationRoomsLoaded(dispatch)(rooms),
        fetchUser: fetchUser(apiService, dispatch),
        fetchAlleyRooms: fetchAlleyRooms(apiService, dispatch),
        openRooms: (id)=>dispatch(openRooms(id)),
        reserveAlleyRoom: apiService.reserveAlleyRoom,
    };
};

export default compose(
    withTranslation(),
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(AlleyContainer);