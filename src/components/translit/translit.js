import React from "react";
import "./translit.scss";

import i18n from "../../utils/i18n";
import cyrillicToTranslit from "cyrillic-to-translit-js";

class Translit extends React.Component {
  translit = new cyrillicToTranslit();

  t = (str) => {
    if (~i18n.language.indexOf("en")) {
      return this.translit.transform(str);
    }
    return str
  };

  render() {
    return <>{this.t(this.props.value)}</>;
  }
}

export default Translit;
