import React from 'react';
import './scenes-lang-checker.scss';

class ScenesLangChecker extends React.Component {


  langtext=(lang)=>{
    
    switch (lang) {
      case 'rus':
        return 'RU'
  
      case 'eng':
        return 'ENG';

      case 'ua':
        return 'UKR';  
  
      default:
        return lang;
    }
  }

  render() {
    const {lang,setLang, langList} = this.props;

    let engExists = langList.indexOf('eng')+1;

    return (
      <>
      {(!!engExists)&&<div id="scenes-lang-checker" onClick={()=>setLang(lang =='ua'?'eng':'ua')}>
      {this.langtext(lang)}
      </div >}
      {(!engExists)&&<div id="scenes-lang-checker" className="disabled">
      {this.langtext(lang)}
      </div >}
      </>
    )
  }
}


export default ScenesLangChecker;