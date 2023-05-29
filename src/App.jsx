import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import AddNumberPopup from './componets/AddNumberPopup';
import ErrorPopup from './componets/ErrorPopup';
import { textError } from './utils/Constants';
import { sendMessageApi, getMessageApi, deleteMessageApi } from './api/Api';

function App() {
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const [users, setUsers] = React.useState(
    localStorage.getItem('chats') ? JSON.parse(localStorage.getItem('chats')) : [],
  );
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(
    localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {},
  );

  const navigate = useNavigate();

  const deleteMessage = (id) => {
    deleteMessageApi(id).catch((error) => console.log('error', error));
  };

  const phoneHandler = (phone) => {
    return phone.replace(/[^\d]/g, '');
  };

  const getMessage = () => {
    getMessageApi()
      .then((result) => {
        if (result !== null) {
          let message =
            result.body.messageData?.textMessageData?.textMessage ||
            result.body.messageData?.extendedTextMessageData?.text;
          let userId = result.body.senderData?.sender?.split('@')[0];
          users.forEach((element) => {
            if (userId === phoneHandler(element.phone)) {
              saveNewUser(message, true, userId);
            }
          });
          deleteMessage(result.receiptId);
        }
      })
      .catch((error) => console.log('error', error));
  };

  const tokenCheck = React.useCallback(() => {
    if (localStorage.getItem('token') && localStorage.getItem('id')) {
      setIsAuthorized(true);
      navigate('/chat');
    } else navigate('/');
  }, [navigate]);

  const handleLogin = (id, token) => {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    setIsAuthorized(true);
    navigate('/chat');
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handleMessageSubmit = (e, message) => {
    e.preventDefault();
    sendMessageApi(currentUser, message)
      .then(() => saveNewUser(message, true))
      .catch((error) => {
        saveNewUser(message, false);
        console.log('error', error);
      });
  };
  const saveNewUser = (message, isSent, userId) => {
    const newUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        const id = user.messages ? user.messages.length + 1 : 1;
        const newMessage = {
          message: message,
          id: id,
          date: Date.now(),
        };
        if (!isSent) {
          newMessage.isSent = 'false';
        } else if (userId) {
          newMessage.userId = userId;
        }
        user.messages.push(newMessage);
      }
      return user;
    });
    setUsers(newUsers);
    localStorage.setItem('chats', [JSON.stringify(newUsers)]);
  };

  const handleCurrentUser = (id, phone) => {
    const newPhone = phoneHandler(phone);
    setCurrentUser({
      id: id,
      phone: newPhone,
    });
    localStorage.setItem('currentUser', JSON.stringify({ id, phone: newPhone }));
  };

  const handleUserSubmit = (phone) => {
    const id = users ? users.length + 1 : 1;
    const newPhone = phoneHandler(phone);
    if (users.find((phone) => phoneHandler(phone.phone) === newPhone)) {
      setIsErrorPopupOpen(true);
      return;
    } else {
      const userDetail = {
        phone: phone,
        id: id,
        messages: [],
      };
      localStorage.setItem('chats', [
        JSON.stringify(users ? [userDetail, ...users] : [userDetail]),
      ]);
      setCurrentUser(users.unshift(userDetail));
      handleCurrentUser(id, newPhone);
    }
  };

  React.useEffect(() => {
    tokenCheck();
    const interval =
      isAuthorized && localStorage.getItem('currentUser') ? setInterval(getMessage, 6000) : '';
    return () => clearInterval(interval);
  }, [tokenCheck, isAuthorized]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/chat"
          element={
            <ChatPage
              users={users}
              handlePopupOpen={handlePopupOpen}
              handleMessageSubmit={handleMessageSubmit}
              handleCurrentUser={handleCurrentUser}
            />
          }
        />
        <Route path="/" element={<AuthPage handleLogin={handleLogin} />} />
      </Routes>
      <AddNumberPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleUserSubmit}
      />
      <ErrorPopup
        isOpen={isErrorPopupOpen}
        onClose={() => setIsErrorPopupOpen(false)}
        textError={textError}
      />
    </div>
  );
}

export default App;
