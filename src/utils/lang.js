import i18n from "./i18n";


export default class Langs {
    static getCurrentLang () {
        if (~i18n.language.indexOf("en"))  return "en";
        if (~i18n.language.indexOf("ua"))  return "ua";
        return "ru";
    }
}