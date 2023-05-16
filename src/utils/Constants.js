const validationIdMessage = 'Введите только цифры';
const validationPhoneMessage = 'Введите валидный телефонный номер, например: +7-000-000-00-00';
const textError = 'У вас уже есть чат с данным номером. Пожалуйста введите другой номер';

const regexId = /^\d+$/g;
const regexPhone = /^\+?[7][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/g;

export { validationIdMessage, validationPhoneMessage, regexId, regexPhone, textError };
