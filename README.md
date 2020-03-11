# Contact Keeper Fullstack App

### 📌Live версия доступна на [sergeyklimenko.com/projects/contact-keeper](https://sergeyklimenko.com/projects/contact-keeper)

#### Учебный проект. Fullstack приложение созданное с Express на back-end и React на front-end. Из функционала доступны: регистрация, авторизация, создание, редактирование м удаление контактов для каждого пользователя.

#### Для front-end использовались: React, React-Router, Axios

#### Для back-end использовались: Express, Mongoose, jsonWebtoken

Для state приложения вместо Redux использовался React Context. Local Storage используется для сохранения auth token.

Для запуска проекта, сначала необходимо запустить back-end сервер:

```javascript
npm run server
```

!!! Back-end серверу необходимы 2 переменные для работы: mongoURI (URI к БД mongoDB по типу `mongodb+srv://<user>:<pwd>@cluster.mongodb.net/`), и jwtSecret. Эти переменные необходимо разместить в файле `config/defaults.json`:

```javascript
{
  "mongoURI": "value",
  "jwtSecret": "value"
}
```

Клиент можно запустить из папки `client`:

```javascript
npm run start
```

Или для запуска из `root` папки:

```javascript
npm run start --prefix client
```

ВАЖНО: npm модули необходимо установить и для сервера (в `project root` папке), и для клиента (в `client` папке).
