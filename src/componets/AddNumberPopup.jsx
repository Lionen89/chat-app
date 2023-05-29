import React from 'react';

import { useEscClose, useClickClose } from '../hooks/UseClose';
import { validationPhoneMessage, regexPhone } from '../utils/Constants';

function AddNumberPopup({ isOpen, onClose, onSubmit }) {
  const [phone, SetPhone] = React.useState('');
  const [isValidPhone, setIsValidPhone] = React.useState(true);
  const [error, setError] = React.useState('');

  function handleChange(e) {
    setIsValidPhone(true);
    setError('');
    SetPhone(e.target.value);
    if (!e.target.validity.valid) {
      setIsValidPhone(false);
      setError(e.target.validationMessage);
    } else if (!e.target.value.match(regexPhone)) {
      setIsValidPhone(false);
      setError(validationPhoneMessage);
    }
  }

  const handleSubmit = (e, phone) => {
    e.preventDefault();
    onSubmit(phone);
    handleClose();
  };
  const handleClose = () => {
    onClose();
    SetPhone('');
    setError('');
  };

  useEscClose(isOpen, handleClose);
  useClickClose(isOpen, handleClose, 'popup_opened');

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">Введите телефонный номер</h2>
        <form
          className="popup__form-field"
          name="add-task-form"
          onSubmit={(e) => handleSubmit(e, phone)}>
          <input
            type="text"
            className={`popup__input popup__text ${!isValidPhone ? 'auth__text_type_error' : ''}`}
            name="phone"
            required
            minLength="3"
            value={phone}
            onChange={handleChange}
          />
          <span
            className={`auth__text-error popup__error ${
              !isValidPhone ? 'auth__text-error_active' : ''
            }`}>
            {error}
          </span>
          <button
            type="submit"
            className={`popup__save-button ${!isValidPhone ? 'popup__save-button_disable' : ''}`}
            disabled={!isValidPhone}>
            Сохранить
          </button>
        </form>
        <button type="button" className="popup__close-button" onClick={handleClose}></button>
      </div>
    </div>
  );
}
export default AddNumberPopup;
