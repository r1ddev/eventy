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

        Загрузка: "Загрузка",
        Контакты: "Контакты",
        "Изменить профиль": "Изменить профиль",
        "Пользователь не найден": "Пользователь не найден",
        Имя: "Имя",
        Фамилия: "Фамилия",
        Должность: "Должность",
        Телефон: "Телефон",
        "Ссылка на соц. сеть": "Ссылка на соц. сеть",
        "Хочу ли я делиться контактами?": "Хочу ли я делиться контактами?",
        "Изменить профиль": "Изменить профиль",

        Лобби: "Лобби",
        "Добро пожаловать на digital Stand-up Smit.Studio": `Добро пожаловать на <br />digital Stand-up Smit.Studio`,

        Сообщения: "Сообщения",
        "Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться":
          "Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться",

        "Связь с организаторами": `Связь <br />с организаторами`,

        Переговорки: 'Переговорки',
        "Открытые комнаты": "Открытые комнаты",
        человек: "человек",

        Сцены: 'Сцены',
        Сцена: 'Сцена',
        Идет: 'Идет',
        "Язык трансляции": 'Язык трансляции',

        Чат: 'Чат',
        "Общий чат": 'Общий чат',
        "Чат с организаторами": 'Чат с организаторами',
        "Вопрос спикеру": 'Вопрос спикеру',
        "Введите ваше сообщение": "Введите ваше сообщение",

        Партнеры: "Партнеры",

        Презентации: "Презентации",

        Нетворкинг: "Нетворкинг"
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

        Загрузка: "Loading",
        Контакты: "Contacts",
        "Изменить профиль": "Change profile",
        "Пользователь не найден": "User is not found",
        Имя: "Name",
        Фамилия: "Surname",
        Должность: "Position",
        Телефон: "Phone",
        "Ссылка на соц. сеть": "Link to social network",
        "Хочу ли я делиться контактами?": "Do I want to share my contacts?",
        "Изменить профиль": "Change profile",

        Лобби: 'Lobby',
        "Добро пожаловать на digital Stand-up Smit.Studio": `Welcome to <br />digital Stand-up Smit.Studio`,

        Сообщения: 'Messages',
        "Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться":
          "Go to Networking and select a person to start chatting with",

        "Связь с организаторами": `Contact <br />with organizers`,

        Переговорки: 'Meetings',
        "Открытые комнаты": "Open rooms",
        человек: "people",

        Сцены: 'Stages',
        Сцена: 'Stage',
        Идет: 'Live',
        "Язык трансляции": 'language',

        Чат: 'Chat',
        "Общий чат": 'Chat',
        "Чат с организаторами": 'Host chat',
        "Вопрос спикеру": 'speaker',
        "Введите ваше сообщение": "Type something",

        Партнеры: "Expo",

        Презентации: "Files",

        Нетворкинг: "Networking"

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
