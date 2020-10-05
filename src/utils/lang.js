import i18n from "./i18n";


export default class Langs {
    static getCurrentLang () {
        if (~i18n.language.indexOf("en"))  return "en";
        return "ua";
    }
}