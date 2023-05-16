import React from 'react';

import defaultAvatar from '../images/default-user-photo.png';

export default function Message({ message }) {
  const transformTime = (time) => {
    let timeStamp = new Date(time);
    return `${timeStamp.getHours().toString()}:${timeStamp.getMinutes().toString()}`;
  };

  return (
    <li
      className={`message 
        ${!message.userId ? 'message-my' : ''}
      `}>
      <img className="message__user-avatar" src={defaultAvatar} alt="avatar of user" />
      <div
        className={`message__text-container
          ${!message.userId ? 'message__text-container-my' : ''}
          `}>
        <p
          className={`message-text
            ${!message.userId ? ' message-text-my' : ''}
            `}>
          {message.message}
        </p>
        <p
          className={`message__time ${!message.userId ? ' message__time-my' : ''}
          `}>
          {transformTime(message.date)}
        </p>
      </div>
      {message?.isSent ? (
        <span className="message__error" title="Не удалось отправить сообщение"></span>
      ) : (
        ''
      )}
    </li>
  );
}
