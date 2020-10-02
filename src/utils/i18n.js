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
        "Забыли пароль?": "Забыли пароль?",
        "Пользователя с этими данными не существует": "Пользователя с этими данными не существует",

        Регистрация: "Регистрация",
        "Подтверждение пароля": "Подтверждение пароля",
        "Пароли должны быть одинаковыми": "Пароли должны быть одинаковыми",
        "Название компании": "Название компании",
        "Я согласен с условиями обработки персональных данных": "Я согласен с условиями обработки персональных данных",
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
        "Выберите теги": "Выберите теги",
        Телефон: "Телефон",
        "Ссылка на соц. сеть": "Ссылка на соц. сеть",
        "Ссылка на LinkedIn": "Ссылка на LinkedIn",
        "Что ищете?": "Что ищете?",
        "Что предлагаете?": "Что предлагаете?",
        "Хочу ли я делиться контактами?": "Хочу ли я делиться контактами?",
        "Сохранить": "Сохранить",
        "да": "да",
        "нет": "нет",
        "Нет данных для отображения": "Нет данных для отображения",

        "Инноватор": "Инноватор",
        "Бизнес": "Бизнес",
        "Медиа": "Медиа",
        "Администрация": "Администрация",
        "Ченжмейкер": "Ченжмейкер",
        "Урбанист": "Урбанист",
        "Активист": "Активист",
        "Предприниматель": "Предприниматель",
        "Горожанин": "Горожанин",
        "Госслужащий": "Госслужащий",

        "Что ищу": "Что ищу",
        "Что предлагаю": "Что предлагаю",

        Лобби: "Лобби",
        "Добро пожаловать на digital Stand-up Smit.Studio": `Добро пожаловать на <br />digital Stand-up Smit.Studio`,
        "Добро пожаловать!": "Добро пожаловать!",
        "Главный партнер": "Главный партнер",

        Сообщения: "Сообщения",
        "Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться":
          "Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться",
        'У вас новое сообщение!': 'У вас новое сообщение!',

        "Связь с организаторами": `Связь <br />с организаторами`,

        Переговорки: "Переговорки",
        "Открытые комнаты": "Открытые комнаты",
        человек: "человек",

        Сцены: 'Сцены',
        СЦЕНА: 'СЦЕНА',
        Сцена: 'Сцена',
        идет: 'Идет',
        "язык трансляции": 'язык трансляции',

        Чат: 'Чат',
        "Общий чат": 'Общий чат',
        "Чат с организаторами": 'Чат с организаторами',
        "Чат с организатором": 'Чат с организатором',
        "Вопросы спикеру": 'Вопросы спикеру',
        "Чат со спикером": 'Чат со спикером',
        "Опросы": 'Опросы',
        "Введите ваше сообщение": "Введите ваше сообщение",
        "Введите сообщение": "Введите сообщение",
        "ответить": "ответить",


        Партнеры: "Партнеры",
        Экспозона: "Экспозона",
        expo_smit:
          "SMIT.studio - эксперты в интерактивом маркетинге <br /> Наращивайте своё сообщество лояльными игроками, которых в будущем конвертируете в адвокатов бренда",
        expo_smitscreen: "Проект, открывающий для бизнеса новые возможности в мире наружной рекламы",

        Презентации: "Презентации",
        "Презентация Smit.studio": "Презентация Smit.studio",

        Нетворкинг: "Нетворкинг",
        в: "в",

        Ошибка: "Ошибка",
        Найтись: "Найтись",
        'Потерялись на конференции? Давайте вернёмся к стойке регистрации.': "Потерялись на конференции? Давайте вернёмся к стойке регистрации.",

        Программа:"Программа",

        "Пользователи онлайн": "Пользователи онлайн",
        "Комната недоступна": "Комната недоступна",
        "Выгнать пользователя": "Выгнать пользователя",
        "Заблокировать пользователю доступ к разделу?": "Заблокировать пользователю доступ к разделу?",
      },
    },
    en: {
      translations: {
        Авторизация: "Login",
        Пароль: "Password",
        ВОЙТИ: "SIGN IN",
        "ВОЙТИ КАК ГОСТЬ": "SIGN IN AS GUEST",
        Зарегистрироваться: "Sign up now",
        "Забыли пароль?": "Forgot Password?",
        "Пользователя с этими данными не существует": "There is no user with this data",

        Регистрация: "SIGN UP",
        "Подтверждение пароля": "Password confirmation",
        "Пароли должны быть одинаковыми": "The password and confirm password must match",
        "Название компании": "Company Name",
        "Я согласен с условиями обработки персональных данных": "I agree with the terms of processing personal data",
        РЕГИСТРАЦИЯ: "CREATE ACCOUNT",
        Компания: "Company",
        Агентство: "Agency",
        "Вам на почту пришла ссылка, пожалуйста перейдите по ней, чтобы завершить регистрацию":
          "You have received a link in your E-mail, please follow it to complete registration",

        "Восстановление пароля": "Password recovery",
        ВОССТАНОВИТЬ: "RESET PASSWORD",

        Загрузка: "Loading",
        Контакты: "Contacts",
        "Изменить профиль": "Change profile",
        "Пользователь не найден": "User is not found",
        Имя: "Name",
        Фамилия: "Surname",
        Должность: "Position",
        "Выберите теги": "Select tags",
        Телефон: "Phone",
        "Ссылка на соц. сеть": "Link to social network",
        "Ссылка на LinkedIn": "Link to LinkedIn",
        "Что ищете?": "What are you looking for?",
        "Что предлагаете?": "What do you offer?",
        "Хочу ли я делиться контактами?": "Do I want to share my contacts?",
        "Сохранить": "Save",
        "да": "yes",
        "нет": "no",
        "Нет данных для отображения": "No data to display",

        "Инноватор": "Innovator",
        "Бизнес": "Business",
        "Медиа": "Media",
        "Администрация": "Administration",
        "Ченжмейкер": "Changemaker",
        "Урбанист": "Urbanist",
        "Активист": "Activist",
        "Предприниматель": "Entrepreneur",
        "Горожанин": "Citizen",
        "Госслужащий": "StateServant",
        
        "Что ищу": "What am I looking for",
        "Что предлагаю": "What do I suggest",

        Лобби: "Lobby",
        "Добро пожаловать на digital Stand-up Smit.Studio": `Welcome to <br />digital Stand-up Smit.Studio`,
        "Добро пожаловать!": "Welcome!",
        "Главный партнер": "Partner",

        Сообщения: "Messages",
        "Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться":
          "Go to Networking and select a person to start chatting with",
        'У вас новое сообщение!': 'New message!',

        "Связь с организаторами": `Contact <br />with organizers`,

        Переговорки: "Meetings",
        "Открытые комнаты": "Open rooms",
        человек: "people",

        Сцены: 'Stages',
        Сцена: 'Stage',
        СЦЕНА: 'STAGE',
        Идет: 'Live',
        "язык трансляции": 'Language',

        Чат: 'Chat',
        "Общий чат": 'Chat',
        "Чат с организаторами": 'Host chat',
        "Чат с организатором": 'Host chat',
        "Вопросы спикеру": 'speaker',
        "Чат со спикером": 'Chat with speaker',
        "Опросы": 'Polls',
        "Введите ваше сообщение": "Type something",
        "Введите сообщение": "Type something",
        "ответить": "reply",


        Партнеры: "Expo",
        Экспозона: "Expo",

        expo_smit:
          "SMIT.studio - Experts in Interactive Marketing <br /> Grow your community with loyal players and convert them into brand advocates in the future",
        expo_smitscreen: "A project that opens up new opportunities for business in the world of outdoor advertising",

        Презентации: "Files",
        "Презентация Smit.studio": "Smit.studio presentation",

        Нетворкинг: "Networking",
        в: "in",

        Ошибка: "Error",
        Найтись: "teleport",
        'Потерялись на конференции? Давайте вернёмся к стойке регистрации.': "Lost at a conference? Let's go back to the front desk.",

        Программа:"Program",

        "Пользователи онлайн": "Online Users",
        "Комната недоступна": "Room unavailable",
        "Выгнать пользователя": "Kick User",
        "Заблокировать пользователю доступ к разделу?": "Block user access to the section?",
      },
    },
    ua: {
      translations: {
        Авторизация: "Вхід",
        Пароль: "Пароль",
        ВОЙТИ: "Вхід",
        "ВОЙТИ КАК ГОСТЬ": "ВОЙТИ КАК ГОСТЬ",
        Зарегистрироваться: "Зареєструватися",
        "Забыли пароль?": "Забули пароль?",
        "Пользователя с этими данными не существует": "Користувач з цими даними не існує",

        Регистрация: "Реєстрація",
        "Подтверждение пароля": "Підтвердження пароля",
        "Пароли должны быть одинаковыми": "Паролі повинні бути одинаковими",
        "Название компании": "Компанiя",
        "Я согласен с условиями обработки персональных данных": "Я згоден з умовами обробки персональних даних",
        РЕГИСТРАЦИЯ: "РЕЄСТРАЦІЯ",
        Компания: "Компания",
        Агентство: "Агентство",
        "Вам на почту пришла ссылка, пожалуйста перейдите по ней, чтобы завершить регистрацию":
          "Вам на пошту прийшла посилання, будь ласка перейдіть по ній, щоб завершити реєстрацію",

        "Восстановление пароля": "Відновлення паролю",
        ВОССТАНОВИТЬ: "ВІДНОВИТИ",

        Загрузка: "Загрузка",
        Контакты: "Контакти",
        "Изменить профиль": "Змінити профіль",
        "Пользователь не найден": "Пользователь не найден",
        Имя: "Iмэ’я",
        Фамилия: "Прiзвище",
        Должность: "Посада",
        "Выберите теги": "Оберiть теги",
        Телефон: "Телефон",
        "Ссылка на соц. сеть": "Посилання на facebook",
        "Ссылка на LinkedIn": "Посилання на LinkedIn",
        "Что ищете?": "Що шукаю?",
        "Что предлагаете?": "Що пропоную",
        "Хочу ли я делиться контактами?": "Чи бажаю я подiлитися контактом?",
        "Сохранить": "Зберегти",
        "да": "Так",
        "нет": "Нi",
        "Нет данных для отображения": "Немає даних для відображення",

        "Инноватор": "Інноватор",
        "Бизнес": "Бізнес",
        "Медиа": "Медіа",
        "Администрация": "Адміністрація",
        "Ченжмейкер": "Ченжмейкер",
        "Урбанист": "Урбаніст",
        "Активист": "Активіст",
        "Предприниматель": "Підприємець",
        "Горожанин": "Містянин",
        "Госслужащий": "Держслужбовець",
        
        "Что ищу": "Що шукаю",
        "Что предлагаю": "Що пропоную",

        Лобби: "Welcome",
        "Добро пожаловать на digital Stand-up Smit.Studio": `Добро пожаловать на <br />digital Stand-up Smit.Studio`,
        "Добро пожаловать!": "Вітаємо!",
        "Главный партнер": "Титульний партнер",

        Сообщения: "Чати",
        "Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться":
          "Перейдите в нетворкинг и выберите человека, чтобы начать с ним общаться",
        'У вас новое сообщение!': 'У вас новое сообщение!',

        "Связь с организаторами": `Зв’язатися <br /> з організаторами`,

        Переговорки: "Кімнати",
        "Открытые комнаты": "Открытые комнаты",
        человек: "человек",

        Сцены: 'Сцены',
        СЦЕНА: 'СЦЕНА',
        Сцена: 'Сцена',
        идет: 'В ефірі',
        "язык трансляции": 'Мова трансляції',

        Чат: 'Чат',
        "Общий чат": 'Загальний чат',
        "Чат с организаторами": 'Чат з організаторами',
        "Чат с организатором": 'Чат з організаторами',
        "Вопросы спикеру": 'Запитання спікеру',
        "Чат со спикером": 'Запитання спікеру',
        "Опросы": 'Опросы',
        "Введите ваше сообщение": "Введите ваше сообщение",
        "Введите сообщение": "Введите сообщение",
        "ответить": "ответить",


        Партнеры: "Партнеры",
        Экспозона: "Expo-зона",

        expo_smit:
          "SMIT.studio - эксперты в интерактивом маркетинге <br /> Наращивайте своё сообщество лояльными игроками, которых в будущем конвертируете в адвокатов бренда",
        expo_smitscreen: "Проект, открывающий для бизнеса новые возможности в мире наружной рекламы",

        Презентации: "Підкасти",
        "Презентация Smit.studio": "Презентация Smit.studio",

        Нетворкинг: "Нетворкінг",
        в: "у",

        Ошибка: "Ошибка",
        Найтись: "Знайтися",
        'Потерялись на конференции? Давайте вернёмся к стойке регистрации.': "Загубилися на конференції? Давайте повернемося до стійки реєстрації.",

        Программа:"Програма",

        "Пользователи онлайн": "Користувачі онлайн",
        "Комната недоступна": "Кімната недоступна",
        "Выгнать пользователя": "Вигнати користувача",
        "Заблокировать пользователю доступ к разделу?": "Заблокувати користувачеві доступ до розділу?",
      },
    },
  },
  fallbackLng: "uk",
  debug: false,

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
