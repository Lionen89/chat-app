import React from 'react';

export default function User({ id, phone, avatar, handleUserClick }) {
  return (
    <li className="user" onClick={() => handleUserClick(id, phone)}>
      <img className="user__image" src={avatar} alt="avatar of user" />
      <p className="user__name">{phone}</p>
    </li>
  );
}
