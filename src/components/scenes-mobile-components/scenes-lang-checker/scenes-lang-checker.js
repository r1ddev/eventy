import React from 'react';
import './scenes-lang-checker.scss';

class ScenesLangChecker extends React.Component {


  langtext=(lang)=>{
    switch (lang) {
      case 'rus':
        return 'RU'
  
      case 'SET_NEW_VIP_MESSAGES':
        return {
         
        };
  
      default:
        return lang;
    }
  }

  render() {
    const {lang} = this.props;



    return (
      <div id="scenes-lang-checker">
        {this.langtext(lang)}
      </div >
    )
  }
}


export default ScenesLangChecker;