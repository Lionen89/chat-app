import React from 'react';

import { validationIdMessage, regexId } from '../utils/Constants';

function AuthPage({ hadleLogin }) {
  const [id, setId] = React.useState('');
  const [token, setToken] = React.useState('');
  const [isValidId, setIsValidId] = React.useState(true);
  const [errorId, setErrorId] = React.useState('');
  const [isValidToken, setIsValidToken] = React.useState(true);
  const [errorToken, setErrorToken] = React.useState('');
  const [isFormValid, setValidityForm] = React.useState(false);

  function handleIdChange(e) {
    const currentId = e.target.value;
    setId(currentId);
    setIsValidId(true);
    setErrorId('');
    if (!e.target.validity.valid) {
      setIsValidId(false);
      setErrorId(e.target.validationMessage);
    } else if (!currentId.match(regexId)) {
      setIsValidId(false);
      setErrorId(validationIdMessage);
    }
  }
  function handleTokenChange(e) {
    setToken(e.target.value);
    if (!setIsValidToken(e.target.validity.valid)) {
      setErrorToken(e.target.validationMessage);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    hadleLogin(id, token);
  }
  React.useEffect(() => {
    if (isValidId && id && token && isValidToken) {
      setValidityForm(true);
    } else {
      setValidityForm(false);
    }
  }, [isValidId, id, token, isValidToken]);

  return (
    <div className="auth">
      <h2 className="auth__title">Рады видеть вас&#33;</h2>
      <p className="auth__subtitle">Пожалуйста, введите необходимые данные</p>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__form-field">
          <span className="auth_form-name">idInstance</span>
          <input
            type="text"
            className={`auth__text ${!isValidId ? 'auth__text_type_error' : ''}`}
            name="id"
            required
            minLength="1"
            maxLength="10"
            value={id}
            onChange={handleIdChange}
          />
          <span className={`auth__text-error ${!isValidId ? 'auth__text-error_active' : ''}`}>
            {errorId}
          </span>
        </label>
        <label className="auth__form-field">
          <span className="auth_form-name">apiTokenInstance</span>
          <input
            type="password"
            className={`auth__text ${!isValidToken ? 'auth__text_type_error' : ''}`}
            id="token-input"
            name="token"
            required
            value={token}
            onChange={handleTokenChange}
            minLength="50"
            maxLength="50"
          />
          <span className={`auth__text-error ${!isValidToken ? 'auth__text-error_active' : ''}`}>
            {errorToken}
          </span>
        </label>
        <button
          type="submit"
          className={`auth__save-button ${!isFormValid ? 'auth__save-button_disable' : ''}`}
          disabled={!isFormValid}>
          Войти
        </button>
      </form>
    </div>
  );
}

export default AuthPage;
