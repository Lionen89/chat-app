import React from 'react';
import UsersList from './UsersList';

export default function Users({ users, handleUserClick, handlePopupOpen }) {
  return (
    <section className="users">
      <div className="users__container">
        <h2 className="users__container-title">Чаты</h2>
        <form className="users__search-form">
          <input
            className="users__search-input"
            id="users__search-input"
            type="text"
            placeholder="Search contact"
            name="users__search-input"
          />
        </form>
        <UsersList
          users={users}
          handleUserClick={handleUserClick}
          handlePopupOpen={handlePopupOpen}
        />
      </div>
    </section>
  );
}
