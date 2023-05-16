import React from 'react';
import Message from './Message';

export default function Chat({ users, handleMessageSubmit }) {
  const [inputValue, setInputValue] = React.useState('');
  const currentChat = users.find(
    (user) =>
      user.phone.replace(/[^\d]/g, '') === JSON.parse(localStorage.getItem('currentUser'))?.phone,
  );
  const messages = currentChat ? currentChat.messages : [];

  const handleMessageInput = (e) => {
    let inputValue = e.target.value;
    setInputValue(inputValue);
  };
  const keyListener = (e) => {
    if (e.keyCode === 13) {
      handleMessageSubmit(e, inputValue);
      setInputValue('');
    }
  };
  const handleSubmit = (e) => {
    handleMessageSubmit(e, inputValue);
    setInputValue('');
  };

  return (
    <section className="chat">
      <div className="chat__container">
        <h1 className="chat__title">Чат с {currentChat.phone}</h1>
        <div className="chat__messages-container">
          <ul className="chat__message-list">
            {messages.length === 0 ? (
              <p className="chat__messages-null-text">
                Для начала чата напишите что-нибудь в поле снизу
              </p>
            ) : (
              messages.map((message) => <Message key={message.id} message={message} />)
            )}
          </ul>
        </div>
        <form className="chat__form" onSubmit={(e) => handleSubmit(e)}>
          <textarea
            className="chat__input"
            placeholder="Напишите сообщение"
            type="textarea"
            rows={3}
            onChange={(e) => handleMessageInput(e)}
            value={inputValue}
            wrap="soft"
            cols="10"
            onKeyUp={(e) => keyListener(e)}
          />

          <button
            className="chat__button button"
            type="submit"
            onClick={(e) => handleSubmit(e)}></button>
        </form>
      </div>
    </section>
  );
}
