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
			},
		},
		en: {
			translations: {
				Авторизация: "Authorization",
				Пароль: "Password",
				ВОЙТИ: "LOG IN",
				"ВОЙТИ КАК ГОСТЬ": "LOG IN AS GUEST",
				Зарегистрироваться: "Register",
				"забыли пароль?": "Restore password",
				"Пользователя с этими данными не существует": "There is no user with this data",
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
