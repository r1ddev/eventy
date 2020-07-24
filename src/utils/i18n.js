import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    ru: {
      translations: {
        Авторизация: "Авторизация",
        Пароль: "Пароль",
        ВОЙТИ: "ВОЙТИ",
        "ВОЙТИ КАК ГОСТЬ": "ВОЙТИ КАК ГОСТЬ",
        Зарегистрироваться: "Зарегистрироваться",
        "забыли пароль?": "забыли пароль?",
        "Пользователя с этими данными не существует": "Пользователя с этими данными не существует",

        Регистрация: "Регистрация",
        "Подтверждение пароля": "Подтверждение пароля",
        "Пароли должны быть одинаковыми": "Пароли должны быть одинаковыми",
        "Название компании": "Название компании",
        РЕГИСТРАЦИЯ: "РЕГИСТРАЦИЯ",
        Компания: "Компания",
        Агентство: "Агентство",
        "Вам на почту пришла ссылка, пожалуйста перейдите по ней, чтобы завершить регистрацию":
          "Вам на почту пришла ссылка, пожалуйста перейдите по ней, чтобы завершить регистрацию",

        "Восстановление пароля": "Восстановление пароля",
        ВОССТАНОВИТЬ: "ВОССТАНОВИТЬ",
      },
    },
    en: {
      translations: {
        Авторизация: "Login",
        Пароль: "Password",
        ВОЙТИ: "SIGN IN",
        "ВОЙТИ КАК ГОСТЬ": "SIGN IN AS GUEST",
        Зарегистрироваться: "Sign up now",
        "забыли пароль?": "Forgot Password?",
        "Пользователя с этими данными не существует": "There is no user with this data",

        Регистрация: "SIGN UP",
        "Подтверждение пароля": "Password confirmation",
        "Пароли должны быть одинаковыми": "The password and confirm password must match",
        "Название компании": "Company Name",
        РЕГИСТРАЦИЯ: "CREATE ACCOUNT",
        Компания: "Company",
        Агентство: "Agency",
        "Вам на почту пришла ссылка, пожалуйста перейдите по ней, чтобы завершить регистрацию":
          "You have received a link in your mail, please follow it to complete registration",

        "Восстановление пароля": "Password recovery",
        ВОССТАНОВИТЬ: "RESET PASSWORD",
      },
    },
  },
  fallbackLng: "ru",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ",",
  },

  react: {
    wait: true,
  },
});

export default i18n;
