import React from "react";
import "./lang-checker.scss";
import { withTranslation } from "react-i18next";
import i18next from "i18next";
import { compose } from "../../utils";
import Select from "react-select";
import i18n from "../../utils/i18n";

import sassVars from "../../variables.scss"

const colourStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = "#22d671";
    return {
      ...styles,
      backgroundColor: isDisabled ? null : isSelected ? sassVars.baseColor : isFocused ? color : null,
      color: isDisabled ? "#ccc" : isSelected ? (color ? "black" : "black") : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? data.color : color),

      },
    };
  },
};

class LangChecker extends React.Component {
  state = {
    lang: "en",
  };

  options = [
    { value: "en", label: "English" },
    { value: "ru", label: "Русский" },
    { value: "uk", label: "український" },
  ];

  onChangeLang = (e) => {
    this.setState({ lang: e.value });
    this.setLang(e.value);
  };

  setLang = (lang) => {
    i18next.changeLanguage(lang);
  };

  componentDidMount() {
    // console.log("i18n.language", i18n.language);
    if (~i18n.language.indexOf("en")) {
      this.setState({
        lang: "en",
      });
    } else {
      this.setState({
        lang: "ru",
      });
    }
  }

  render() {
    const { lang } = this.state;
    const def = lang == "en" ? this.options[0] : this.options[1];
    const { type } = this.props;

    return (
      <div id="lang-checker" className={(type == 'mini') ? 'mini' : ''}>
        <Select
          isSearchable={false}
          options={this.options}
          styles={colourStyles}
          onChange={this.onChangeLang}
          value={def}
          theme={theme => ({
            ...theme,
            borderRadius: 8,
            colors: {
              ...theme.colors,
              primary: '#1dd673',
            },
          })} />



      </div>
    );
  }
}

export default compose(withTranslation())(LangChecker);
