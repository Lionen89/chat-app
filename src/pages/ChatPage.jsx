import React from 'react';

import Chat from '../componets/Chat';
import Users from '../componets/Users';

export default function ChatPage({
  users,
  handleMessageSubmit,
  handlePopupOpen,
  handleCurrentUser,
}) {
  return (
    <main className="chat-page">
      {JSON.parse(localStorage.getItem('chats') && localStorage.getItem('chats')).length !== 0 ? (
        <div className="chat-page__container">
          <Users
            users={users}
            handleUserClick={handleCurrentUser}
            handlePopupOpen={handlePopupOpen}
          />
          <Chat users={users} handleMessageSubmit={handleMessageSubmit} />
        </div>
      ) : (
        <div className="chat-page__wrapper">
          <h2 className="chat-page__title">У вас еще нет чатов, пожалуйста, нажмите кнопку</h2>
          <button className="chat-page__button" onClick={handlePopupOpen}></button>
        </div>
      )}
    </main>
  );
}
