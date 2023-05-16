import React from 'react';

import { useEscClose, useClickClose } from '../utils/UseClose';

function Popup({ isOpen, onClose, textError }) {
  useEscClose(isOpen, onClose);
  useClickClose(isOpen, onClose, 'popup_opened');

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title popup__error">{textError}</h2>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  );
}
export default Popup;
