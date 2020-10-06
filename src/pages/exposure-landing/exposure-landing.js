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
import parse from 'html-react-parser';



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
            {(partner.email)&&<div className="email">{partner.email}</div>}
            {(partner.phone)&&<div className="phone">{partner.phone}</div>}
        </div>

        <div className="btns row">
            <button className="video-btn col">{t('Видеозвонок')} <span> </span></button>
            <button className="chat-btn col">{t('Чат')} <span></span></button>
        </div>
      </div>
      )
    })

    const descriptionList = partner.description.map((item)=>{
      return(
        <>
        {(item.type == 'image')&& <div className="description-visual">
          <img src={item.value}/>
        </div>}
        {(item.type =='video') &&
            <iframe 
            title="video"
              width="100%" 
              height='300px'
              src={item.value} 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
        }
        </>
       
      )
    })

    const contactList = partner.contacts.map((item)=>{
    return(<p className="mb-1 mt-1" style={{marginLeft: '20px', overflowWrap: 'break-word'}}><span style={{fontWeight:'bold'}}>{item.label}</span>{': '+item.value}</p>)
    })

    return (
      <div id="exposure-landing">
        {!isMobile && (
          <Header data={data}>
            <></>
          </Header>
        )}
        {/* <div className="expo-header" style={{
          backgroundImage: `url(${partner.logo_bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}>
           <div className="img-wrap">
             <img src={partner.logo}/>
          </div>
        </div> */}

        <div className="expo-header2">
             <img src={partner.logo_bg}/> 
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


           
            <div className="segment" style={{overflow:"hidden"}}>    

            <h3 style={{paddingTop: '20px'}}>{t('Описание технического решения')}</h3>  
            {(!isMobile)&&<div className="visual">{descriptionList}
            </div> }
            
            {(partner.description_text)&&<p className="text pb-2">
                {parse(partner.description_text)}
            </p>}

            {(isMobile)&&<div className="visual-mob">{descriptionList}
            </div> }
            </div> 

            {(partner.contacts.length !== 0)&&<div className="segment pb-2">
              <h3 className={'pt-2'}>{t('Контакты')}</h3>
              {contactList}
            </div>}

             

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

    return (
    <>
      {(!loading && !error) && <ExposureLanding {...this.props} partner={partner}/>}
      {(loading || error) && <Spinner big={1} center={true}/>}
    </>
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
