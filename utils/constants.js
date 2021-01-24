const FORBIDDEN_MESSAGE = { message: 'Недостаточно прав' };
const NOT_FOUND_ID_MESSAGE = { message: 'Нет новости с таким ID' };
const VALIDATION_ERROR_MESSAGE = { message: 'Ошибка валидации' };
const UNAUTHORIZED_ERROR_MESSAGE = { message: 'Нет авторизации' };
const NOT_FOUND_USER = { message: 'Пользователь не найден' };
const ALREADY_EXIST_USER = { message: 'Такой пользователь уже существует' };
const WRONG_LOGIN_DATA = { message: 'Неправильные логин или пароль' };
const NOT_FOUND = { message: 'Запрашиваемый ресурс не найден' };
const WRONG_URL = { message: 'Неверная ссылка' };
const WRONG_EMAIL = { message: 'Ошибка валидации email' };

const EXPIRES_IN = '7d';
const URL_REGEXP = /^https?:\/\/[a-z0-9\W_^@]+#?$/i;

module.exports = {
  WRONG_EMAIL,
  WRONG_URL,
  NOT_FOUND,
  URL_REGEXP,
  EXPIRES_IN,
  WRONG_LOGIN_DATA,
  ALREADY_EXIST_USER,
  NOT_FOUND_USER,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_ID_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
};
