# API для новостной ленты

## Routers

- POST https://api.cycymah.students.nomoreparties.space/signup
    Пример запроса: 
  ```
  {
  "email": "string",
  "password": "string"
  }
  ```
   Пример ответа:
  ```
  {
  "name": "NewUser",
  "email": "email@email.com",
  "_id": "23425672345678"
  }
  ```
- POST https://api.cycymah.students.nomoreparties.space/signin
  Пример запроса:
  ```
  {
  "email": "string",
  "password": "string"
  }
  ```
  Пример ответа: 
  ```
  {
  "token": "JWT_TOKEN",
  "name": "NewUser",
  "email": "email@email.ru"
  }
  ```
- POST https://api.cycymah.students.nomoreparties.space/articles
  Пример запроса:
  
```
  {
  "keyword": "string",
  "title": "string",
  "text": "string",
  "date": "date",
  "source": "string",
  "image": "url",
  "link": "string"
}
```

- GET https://api.cycymah.students.nomoreparties.space/articles
  
- DELETE https://api.cycymah.students.nomoreparties.space/articles/id
    Пример ответа:
  
  ```
  {
  "_id": "id",
  "keyword": "string",
  "title": "string",
  "text": "string",
  "date": "date",
  "source": "string",
  "image": "url",
  "link": "url",
  "owner": "owner",
  }
