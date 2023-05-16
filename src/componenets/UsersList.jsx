import React from 'react';
import User from './User';
import defaultAvatar from '../images/default-user-photo.png';

export default function UsersList({ users, handleUserClick, handlePopupOpen }) {
  return (
    <ul className="users__list">
      {users.map((user) => (
        <User
          key={user.id}
          id={user.id}
          phone={user.phone}
          avatar={defaultAvatar}
          handleUserClick={handleUserClick}
        />
      ))}
      {users.length < 3 ? (
        <button className="chat-page__button" onClick={handlePopupOpen}></button>
      ) : (
        ''
      )}
    </ul>
  );
}
