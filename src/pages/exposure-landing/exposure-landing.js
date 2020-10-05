import React from "react";
import "./exposure-landing.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import { isMobile } from "react-device-detect";
import { Trans, withTranslation } from "react-i18next";

import Spinner from "../../components/spinner";
import LangChecker from "../../components/lang-checker";
import Langs from "../../utils/lang";



class ExposureLanding extends React.Component {
  state = {};



  render() {
    const t = this.props.t;
    const { data} = this.props.user;
    const {partner} = this.props;
    console.log(partner)
    const members = partner.members || [];

    

    const memberList = members.map((item)=>{
      return(
        <div className="segment">
        <div className="header">

          <img src = {item.avatar}/>
          <div className="name">
            <div className="first-name">{item.first_name}</div>
            <div className="last-name">{item.last_name}</div>
            <div className="tag">{item.position}</div>
          </div>
        </div>

        <div className="contacts">
          <p className="label">{t('Контакты')}</p>
            <div className="email"></div>
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
          backgroundImage: `url(${partner.logo_bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}>
           <div className="img-wrap">
            {/* <img src={partner.logo}/> */}
          </div>
        </div>
        <div className="content">
           

            <div className="segment right">
              <img src={partner.logo}/>
              <p className="text">
              {partner.title_text}

              </p>
            </div>

            <h3>{t('Предcтавители')}</h3>

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

  state = {
    loading: true,
    error: false,
    partner: null,
  }

  componentDidMount(){

    this.fetchPartner();
  }

  fetchPartner=()=>{
    const partnerId= this.props.match.params.id;
    this.props.getExpoPartnerInfo(partnerId)
    .then((data)=>{
      console.log('ppp'+data[Langs.getCurrentLang()])
      this.setState({
        partner: data[Langs.getCurrentLang()],
        loading: false,
        error: false
      })
    })
    .catch(()=>{
       this.setState({
        error: true,
        loading: false,
        partner: null,
      })
    }
    )
  }

  render() {

    const {loading, error, partner} = this.state;
    console.log(this.state)

    return (
    <div style={{ height: "100vh", width: "100%" }}>
      {!loading && <ExposureLanding {...this.props} partner={partner}/>}
      {loading && <Spinner big={1} />}
    </div>
    )
   
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
  return {
    getExpoPartnerInfo:(id)=>apiService.getExpoPartnerInfo(id)
  };
};

export default compose(withApiService(),  withTranslation(), connect(mapStateToProps, mapDispatchToProps))(ExposureLandingContainer);
