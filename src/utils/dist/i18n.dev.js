"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));

var _translations, _translations2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_i18next["default"].use(_i18nextBrowserLanguagedetector["default"]).init({
  // we init with resources
  resources: {
    ru: {
      translations: (_translations = {
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
        "Вам на почту пришла ссылка, пожалуйста перейдите по ней, чтобы завершить регистрацию": "Вам на почту пришла ссылка, пожалуйста перейдите по ней, чтобы завершить регистрацию",
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
        "Хочу ли я делиться контактами?": "Хочу ли я делиться контактами?"
      }, _defineProperty(_translations, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C", "Изменить профиль"), _defineProperty(_translations, "да", "да"), _defineProperty(_translations, "нет", "нет"), _defineProperty(_translations, "\u041B\u043E\u0431\u0431\u0438", "Лобби"), _defineProperty(_translations, "Добро пожаловать на digital Stand-up Smit.Studio", "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u043D\u0430 <br />digital Stand-up Smit.Studio"), _defineProperty(_translations, "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F", "Сообщения"), _defineProperty(_translations, "Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться", "Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться"), _defineProperty(_translations, 'У вас новое сообщение!', 'У вас новое сообщение!'), _defineProperty(_translations, "Связь с организаторами", "\u0421\u0432\u044F\u0437\u044C <br />\u0441 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0442\u043E\u0440\u0430\u043C\u0438"), _defineProperty(_translations, "\u041F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043A\u0438", "Переговорки"), _defineProperty(_translations, "Открытые комнаты", "Открытые комнаты"), _defineProperty(_translations, "\u0447\u0435\u043B\u043E\u0432\u0435\u043A", "человек"), _defineProperty(_translations, "\u0421\u0446\u0435\u043D\u044B", 'Сцены'), _defineProperty(_translations, "\u0421\u0426\u0415\u041D\u0410", 'СЦЕНА'), _defineProperty(_translations, "\u0421\u0446\u0435\u043D\u0430", 'Сцена'), _defineProperty(_translations, "\u0438\u0434\u0435\u0442", 'Идет'), _defineProperty(_translations, "язык трансляции", 'язык трансляции'), _defineProperty(_translations, "\u0427\u0430\u0442", 'Чат'), _defineProperty(_translations, "Общий чат", 'Общий чат'), _defineProperty(_translations, "Чат с организаторами", 'Чат с организаторами'), _defineProperty(_translations, "Вопрос спикеру", 'Вопрос спикеру'), _defineProperty(_translations, "Чат со спикером", 'Чат со спикером'), _defineProperty(_translations, "Опросы", 'Опросы'), _defineProperty(_translations, "Введите ваше сообщение", "Введите ваше сообщение"), _defineProperty(_translations, "Введите сообщение", "Введите сообщение"), _defineProperty(_translations, "\u041F\u0430\u0440\u0442\u043D\u0435\u0440\u044B", "Партнеры"), _defineProperty(_translations, "expo_smit", "SMIT.studio - эксперты в интерактивом маркетинге <br /> Наращивайте своё сообщество лояльными игроками, которых в будущем конвертируете в адвокатов бренда"), _defineProperty(_translations, "expo_smitscreen", "Проект, открывающий для бизнеса новые возможности в мире наружной рекламы"), _defineProperty(_translations, "\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u0438", "Презентации"), _defineProperty(_translations, "Презентация Smit.studio", "Презентация Smit.studio"), _defineProperty(_translations, "\u041D\u0435\u0442\u0432\u043E\u0440\u043A\u0438\u043D\u0433", "Нетворкинг"), _defineProperty(_translations, "\u0432", "в"), _defineProperty(_translations, "\u041E\u0448\u0438\u0431\u043A\u0430", "Ошибка"), _defineProperty(_translations, "\u041D\u0430\u0439\u0442\u0438\u0441\u044C", "Найтись"), _defineProperty(_translations, 'Потерялись на конференции? Давайте вернёмся к стойке регистрации.', "Потерялись на конференции? Давайте вернёмся к стойке регистрации."), _translations)
    },
    en: {
      translations: (_translations2 = {
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
        "Вам на почту пришла ссылка, пожалуйста перейдите по ней, чтобы завершить регистрацию": "You have received a link in your mail, please follow it to complete registration",
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
        "Хочу ли я делиться контактами?": "Do I want to share my contacts?"
      }, _defineProperty(_translations2, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C", "Change profile"), _defineProperty(_translations2, "да", "yes"), _defineProperty(_translations2, "нет", "no"), _defineProperty(_translations2, "\u041B\u043E\u0431\u0431\u0438", "Lobby"), _defineProperty(_translations2, "Добро пожаловать на digital Stand-up Smit.Studio", "Welcome to <br />digital Stand-up Smit.Studio"), _defineProperty(_translations2, "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F", "Messages"), _defineProperty(_translations2, "Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться", "Go to Networking and select a person to start chatting with"), _defineProperty(_translations2, 'У вас новое сообщение!', 'New message!'), _defineProperty(_translations2, "Связь с организаторами", "Contact <br />with organizers"), _defineProperty(_translations2, "\u041F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043A\u0438", "Meetings"), _defineProperty(_translations2, "Открытые комнаты", "Open rooms"), _defineProperty(_translations2, "\u0447\u0435\u043B\u043E\u0432\u0435\u043A", "people"), _defineProperty(_translations2, "\u0421\u0446\u0435\u043D\u044B", 'Stages'), _defineProperty(_translations2, "\u0421\u0446\u0435\u043D\u0430", 'Stage'), _defineProperty(_translations2, "\u0421\u0426\u0415\u041D\u0410", 'STAGE'), _defineProperty(_translations2, "\u0418\u0434\u0435\u0442", 'Live'), _defineProperty(_translations2, "язык трансляции", 'language'), _defineProperty(_translations2, "\u0427\u0430\u0442", 'Chat'), _defineProperty(_translations2, "Общий чат", 'Chat'), _defineProperty(_translations2, "Чат с организаторами", 'Host chat'), _defineProperty(_translations2, "Вопрос спикеру", 'speaker'), _defineProperty(_translations2, "Чат со спикером", 'Chat with speaker'), _defineProperty(_translations2, "Опросы", 'Polls'), _defineProperty(_translations2, "Введите ваше сообщение", "Type something"), _defineProperty(_translations2, "Введите сообщение", "Type something"), _defineProperty(_translations2, "\u041F\u0430\u0440\u0442\u043D\u0435\u0440\u044B", "Expo"), _defineProperty(_translations2, "expo_smit", "SMIT.studio - Experts in Interactive Marketing <br /> Grow your community with loyal players and convert them into brand advocates in the future"), _defineProperty(_translations2, "expo_smitscreen", "A project that opens up new opportunities for business in the world of outdoor advertising"), _defineProperty(_translations2, "\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u0438", "Files"), _defineProperty(_translations2, "Презентация Smit.studio", "Smit.studio presentation"), _defineProperty(_translations2, "\u041D\u0435\u0442\u0432\u043E\u0440\u043A\u0438\u043D\u0433", "Networking"), _defineProperty(_translations2, "\u0432", "in"), _defineProperty(_translations2, "\u041E\u0448\u0438\u0431\u043A\u0430", "Error"), _defineProperty(_translations2, "\u041D\u0430\u0439\u0442\u0438\u0441\u044C", "teleport"), _defineProperty(_translations2, 'Потерялись на конференции? Давайте вернёмся к стойке регистрации.', "Lost at a conference? Let's go back to the front desk."), _translations2)
    }
  },
  fallbackLng: "ru",
  debug: false,
  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  // we use content as keys
  interpolation: {
    escapeValue: false,
    // not needed for react!!
    formatSeparator: ","
  },
  react: {
    wait: true
  }
});

var _default = _i18next["default"];
exports["default"] = _default;