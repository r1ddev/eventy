import React from "react";
import "./desk.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { fetchUser } from "../../actions/user-actions";
import IdeaFirstApiService from "../../services/idea-first-api-service";
import { isMobile } from "react-device-detect";

import { Trans, withTranslation } from "react-i18next";
import LangChecker from "../../components/lang-checker";

class Desk extends React.Component {
    
    state = {

        titles:[
            "Поток №1. Подбор, стратегия и бизнес",
            "Поток №2. Развитие карьеры в HR",
            "Поток №3. Личная эффективность и хорошее самочувствие"
        ],
        timetable: [
            [
                {
                    time: "12:00",
                    descTitle: "Вступительное слово",
                    desc: "",
                    names: [
                        {
                            nameTitle: "Артем Кумпель",
                            name: (<span>Управляющий директор Авито&nbsp;Работы</span>),
                            avatar: require("../../images/default-avatar.svg"),
                        }
                    ],
                }, {
                    time: "12:10",
                    descTitle: "HR-стратегия — системный подход к управлению опытом кандидатов и сотрудников",
                    desc: "",
                    names: [
                        {
                            nameTitle: "Сергей Худовеков",
                            name: (<span>Старший партнёр консалтингового агентства Paper Planes</span>),
                            avatar: require("../../images/default-avatar.svg"),


                        }
                    ],
                    
                }, {
                    time: "12:40",
                    descTitle: "Самозанятые в 2021: что нужно знать",
                    desc: "",
                    names: [
                        {
                            nameTitle: "Владислав Ильтяков",
                            name: (<span>Руководитель продуктового направления Авито&nbsp;Услуги</span>),
                            avatar: require("../../images/default-avatar.svg"),


                        },{
                            nameTitle: "Дмитрий Сен",
                            name: (<span>Продуктовый менеджер банка Точка</span>),
                            avatar: require("../../images/default-avatar.svg"),
                        }


                    ],
                }, {
                    time: "13:10",
                    descTitle: (<span>Новости Авито&nbsp;Работы</span>),
                    desc: "",
                    names: [
                        {
                            nameTitle: "Дмитрий Пучков",
                            name: (<span>Руководитель по развитию Авито&nbsp;Работы</span>),
                            avatar: require("../../images/default-avatar.svg"),


                        }, {
                            nameTitle: "Константин Шадрин",
                            name: (<span>Ведущий менеджер продукта Авито&nbsp;Работы</span>),
                            avatar: require("../../images/default-avatar.svg"),


                        }, {
                            nameTitle: "Анна Осьмак",
                            name: (<span>Руководитель направления по работе с ключевыми клиентами Авито&nbsp;Работы</span>),
                            avatar: require("../../images/default-avatar.svg"),


                        },
                    ],
                }, {
                    time: "13:30",
                    descTitle: "Правильная команда. Почему важно нанимать инклюзивных сотрудников",
                    desc: "",
                    names: [
                        {
                            nameTitle: "Денис Роза",
                            name: (<span>Директор российского отделения Всемирного института проблем инвалидности</span>),
                            avatar: require("../../images/default-avatar.svg"),


                        }
                    ],
                }, {
                    time: "14.10",
                    descTitle: "Завершение конференции и розыгрыш призов",
                    desc: "",
                    type: "end",
                    names: [
                       
                    ],
                }, 
                {
                    time: "14:30",
                    descTitle: "Работа менторской гостиной",
                    desc: "",
                    type: "end",
                    names: [
                       
                    ],
                },{
                    time: "14:00",
                    type: "final",
                    descTitle: "",
                    desc: "",
                    names: [
                        
                    ],
                },
            ],
            [
                {
                    time: "12:10",
                    descTitle: "Как вдохновляться работой и вдохновлять сотрудников",
                    desc: "",
                    names: [
                        {
                            nameTitle: "Наталья Бурлай",
                            name: "HR бизнес-партнёр Авито",
                            avatar: require("../../images/default-avatar.svg"),


                        }
                    ],
                }, {
                    time: "12:40",
                    descTitle: "Аргументируй это: как добиться результата словами",
                    desc: "",
                    names: [
                        {
                            nameTitle: "Юлия Глазкова",
                            name: (<span>Партнер бюро публичных выступлений “Глагол”</span>),
                            avatar: require("../../images/default-avatar.svg"),

                            
                        }
                    ],
                    
                }, 
                {
                    time: "13:10",
                    descTitle: (<span>Новости Авито&nbsp;Работы</span>),
                    desc: "",
                    names: [
                        {
                            nameTitle: "Дмитрий Пучков",
                            name: (<span>Руководитель по развитию Авито&nbsp;Работы</span>),
                            avatar: require("../../images/default-avatar.svg"),


                        },{
                            nameTitle: "Константин Шадрин",
                            name: (<span>Ведущий менеджер продукта Авито&nbsp;Работы</span>),
                            avatar: require("../../images/default-avatar.svg"),


                        },{
                            nameTitle: "Анна Осьмак",
                            name: (<span>Руководитель направления по работе с ключевыми клиентами Авито&nbsp;Работы</span>),
                            avatar: require("../../images/default-avatar.svg"),


                        },

                    ],
                }, {
                    time: "13:30",
                    descTitle: "Карьерные перспективы в HR: история успеха",
                    desc: "",
                    names: [
                        {
                            nameTitle: "Анастасия Хрисанфова",
                            name: (<span>HRD, Независимый директор, партнер BOD.digital</span>),
                            avatar: require("../../images/default-avatar.svg"),


                        }, 
                    ],
                }, {
                    time: "14:00",
                    type: "final",
                    descTitle: "",
                    desc: "",
                    names: [
                        
                    ],
                },
            ],
            [{
                time: "12:10",
                descTitle: "Как развивать креативность в бизнес-процессах",
                desc: "",
                names: [
                    {
                        nameTitle: "Иван Дьяченко",
                        name: (<span>Партнёр школы инноваций "Икра"</span>),
                        avatar: require("../../images/default-avatar.svg"),


                    }, 
                ],
            },{
                    time: "12:40",
                    descTitle: "Когда можно перестать копить и отправиться на пенсию?",
                    desc: "",
                    names: [
                        {
                            nameTitle: "Александр Вотяков",
                            name: (<span>Исполнительный директор “Школково”</span>),
                            avatar: require("../../images/default-avatar.svg"),


                        }, 
                    ],
                }, {
                    time: "13:10",
                    descTitle: (<span>Новости Авито&nbsp;Работы</span>),
                    desc: "",
                    names: [
                        {
                            nameTitle: "Дмитрий Пучков",
                            name: (<span>Руководитель по развитию Авито&nbsp;Работы</span>),
                            avatar: require("../../images/default-avatar.svg"),

                        }, {
                            nameTitle: "Константин Шадрин",
                            name: (<span>Ведущий менеджер продукта Авито&nbsp;Работы</span>),
                            avatar: require("../../images/default-avatar.svg"),

                        }, {
                            nameTitle: "Анна Осьмак",
                            name: (<span>Руководитель направления по работе с ключевыми клиентами Авито&nbsp;Работы</span>),
                            avatar: require("../../images/default-avatar.svg"),

                        },
                    ],
                }, {
                    time: "13:30",
                    descTitle: "Выгорание 2020: как себя беречь и заниматься профилактикой на работе, когда истощение неизбежно",
                    desc: "",
                    names: [
                        {
                            nameTitle: "Оля Полищук",
                            name: (<span>Коуч, бизнес-фасилитатор</span>),
                            avatar: require("../../images/default-avatar.svg"),

                        }
                    ],
                },{
                    time: "14:00",
                    type: "final",
                    descTitle: "",
                    desc: "",
                    names: [
                        
                    ],
                },
            ]
        ],
        activeTab: 0
    }

    componentDidMount () {
        this.filterTimetable()
    }

    setSctiveTab = (n) => {
        this.setState({
            activeTab: n
        })
    }

    getTimestamp = () => {
        let date = new Date();
        let ts = date.getTime() - (date.getTimezoneOffset()/60)
        return Math.round(ts/1000)
    }

    filterTimetable = () => {
        // let timestamp = this.getTimestamp();
        // let allTimetable = this.state.timetable;

        // let date = new Date()
        // date.setDate(7)
        // date.setMonth(11)
        // date.setFullYear(2020)

        // allTimetable.map((timetable, timetableIndex) => {
            
        //     timetable = timetable.filter(t => {
        //         let time = t.time.split(":")

        //         date.setHours(time[0])
        //         date.setMinutes(time[1])
        //         date.setSeconds(0)

        //         return Math.round(date.getTime() / 1000) > timestamp
        //     })
        //     allTimetable[timetableIndex] = timetable
        // })

        // this.setState({
        //     timetable: allTimetable
        // })
        
        
    }

    isPlayingNow(t1, t2){
        let timestamp = this.getTimestamp();
        let time1 = t1.split(":");
        let time2
        if (t2) time2=t2.split(":");

        let date = new Date()
        date.setDate(15)
        date.setMonth(11)
        date.setFullYear(2020)
        date.setHours(time1[0])
        date.setMinutes(time1[1])
        date.setSeconds(0)

        let date2 = new Date()
       

        if (t2){ 
            date2.setDate(15)
            date2.setMonth(11)
            date2.setFullYear(2020)
            date2.setHours(time2[0])
            date2.setMinutes(time2[1])
             date2.setSeconds(0)
        }
        console.log(date, date2)
        console.log(Math.round(date.getTime() / 1000) < timestamp, (t2==null||(t2&&(Math.round(date2.getTime() / 1000)) < timestamp)))

        return((Math.round(date.getTime() / 1000) < timestamp)&&(t2==null||(t2&&(Math.round(date2.getTime() / 1000)) > timestamp)))

    }

    render() {
        const t = this.props.t;
        const { timetable, activeTab } = this.state;
        return (
            <div id="desk" className="h-100">
                {!isMobile && (
                    <Header className="transparented" data={this.props.user.data} expand>
                        
                    </Header>
                )}
                <section
                    className="first-section"
                  >
                    <div className="wrapper-of-wrapper">
                    
                        {(!isMobile)&&<div className="title-header"> 
                            <div className="title">
                                <h1>Smit.events&nbsp;</h1>
                                {/* <p>15 декабря, 12:00 МСК</p>
                                <p>Online</p> */}
                            </div>
                            
                        </div>}
                        <div className="time-panel">

                            {(!isMobile)&&<div className="title">Программа</div>}
                            <div className="checker">
                                <div onClick={() => this.setSctiveTab(0)} className={"check-item " + (activeTab == 0 ? " active" : "")}>Про дела</div>
                                <div onClick={() => this.setSctiveTab(1)} className={"check-item " + (activeTab == 1 ? " active" : "")}>Про карьеру</div>
                                <div onClick={() => this.setSctiveTab(2)} className={"check-item " + (activeTab == 2 ? " active" : "")}>Про себя</div>
                            </div>

                        </div>

                        <div className="timetable">

                            <h3 className="stream-title">{this.state.titles[this.state.activeTab]}</h3>
                            <div className="time-list">

                                {
                                    timetable[activeTab].map((s, i) => {
                                        return (
                                            <>
                                            {(s?.type!=='final')&&<div className="time-item">
                                                <div className="time">{s.time}</div>
                                                <div className="desc">
                                                    <p>{s.descTitle}</p>

                                                    {s.names.map(n => {
                                                        return (
                                                        <div style={{display: 'flex'}}>
                                                            <img style={{marginRight: '20px', objectFit: 'cover',width: '40px', height: '40px', borderRadius: '20px',float: 'left'}}src={n.avatar}/>
                                                            <div><p className="first-name">{n.nameTitle}</p><span style={{color:"#73787C"}}>{n.name}</span></div>
                                                        </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className="name">
                                                    {(this.isPlayingNow(s.time, 
                                                        timetable[activeTab][i+1]?.time||null 
                                                        ))&&(s?.type!='end')&&<Link to={`/scenes?scene=${activeTab}`}>
                                                        <div style={{paddingLeft: '20px'}}className="to-scene-btn">
                                                            {!isMobile&&<img style={{width:'80%'}}src={require('../../images/to-scene-btn.png')}/>}
                                                            {isMobile&&<img style={{width:'100%'}}src={require('../../images/to-scene-mob-btn.svg')}/>}

                                                        </div>
                                                    </Link>}
                                                 </div>   
                                               
                                            </div>}
                                            </>
                                        )
                                    })
                                }


                            </div>
                        </div>
                    
                    </div>


                    
                 
                </section>
            </div>
        );
    }
}
class DeskContainer extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        let range = 1;

        if (this.props.user.user) {
            range = this.props.user.user.range;
        }

        return <Desk {...this.props} range={range} />;
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user,
    };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return {
        fetchUser: fetchUser(apiService, dispatch),
    };
};

export default compose(
    withTranslation(),
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(DeskContainer);
