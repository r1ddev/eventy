import React from "react";
import "./exposure-landing.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import { isMobile } from "react-device-detect";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/navigation/navigation.scss';



class ExposureLanding extends React.Component {
  state = {};

  render() {
    const { data } = this.props.user;
    const members = [1,2,3];
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);
    

    const memberList = members.map((item)=>{
      return(
        <div className="segment">
        <div className="header">

          <img src = "https://thumbs.dfs.ivi.ru/storage8/contents/d/4/aa05891d3647b35ee578145bb3c135.jpg"/>
          <div className="name">
            <div className="first-name">Константин</div>
            <div className="last-name">Константинопольский</div>
            <div className="tag">креативный директор</div>
          </div>
        </div>

        <div className="contacts">
          <p className="label">Контакты</p>
            <div className="email">example.smit@mail.ru</div>
            <div className="phone">+79 899 456 38 59</div>
        </div>

        <div className="btns row">
        
            <button className="video-btn col">Видеозвонок <span> </span></button>
            <button className="chat-btn col">Чат <span> </span></button>
        </div>
      </div>
      )
    })

    return (
      <div id="exposure-landing">
        {!isMobile && (
          <Header data={data}>
            <></>
          </Header>
        )}
        <div className="expo-header" style={{
          backgroundImage: `url(${"https://lh3.googleusercontent.com/proxy/_G3trgvGqRH2mKDxoUITrrPjmwADbxEIPlxeqi9jMhnNyXqFijz_JE_47XgAjqmJN260VPNbnTOTYVnXucGwhb-r7vB4FvyZwA"})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}>
           <div className="img-wrap">
            <img src="https://www.google.com/logos/doodles/2020/teachers-day-2020-october-05-6753651837108570-l.png"/>
          </div>
        </div>
        <div className="content">
           

            <div className="segment right">
              <img src="https://thumbs.dfs.ivi.ru/storage8/contents/d/4/aa05891d3647b35ee578145bb3c135.jpg"/>
              <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquam placerat volutpat. Duis interdum est cursus, cursus tellus ac, efficitur lacus. Vivamus mollis pellentesque diam, in rhoncus ex. Praesent elementum nulla vel lobortis elementum. Ut nulla justo, vestibulum a turpis non, blandit dapibus ante. Nulla sagittis tortor sed fermentum convallis. In semper efficitur ipsum a posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nisi diam, sodales vitae ligula eu, faucibus egestas nisi. Integer accumsan dictum tristique. Quisque at interdum eros.

              </p>
            </div>

            <h3>Предcтавители</h3>

            <div className="card-list">
             
              
            {memberList}
            
         
            </div>
           
            <div className="segment">       
            <div className="visual">

                <div>
                  <img/>
                </div>

                <div>
                  <img/>
                </div>

                <div>
                  <img/>
                </div>

              </div>
              <p className="text"> описание технического решения</p>
            </div> 

            <div className="segment">
              <h3>Контакты</h3>
                <p className="text">Телефон</p>
                <p className="text">почта</p>
                <p className="text">email</p>
            </div>
            

            <h4> Дополнительные материалы</h4>
            <a  href = "#" className="segment">
              <p className="text">Презентация 1</p>
            </a>
            <a href="#" className="segment">
              <p className="text">Презентация 2</p>
            </a>
          
        </div>
      </div>
    );
  }
}
class ExposureLandingContainer extends React.Component {
  render() {
    return <ExposureLanding {...this.props} />;
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
  return {};
};

export default compose(withApiService(), connect(mapStateToProps, mapDispatchToProps))(ExposureLandingContainer);
