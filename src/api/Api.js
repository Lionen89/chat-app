async function handleResponse(res) {
  const result = await res.json();
  return res.ok ? result : Promise.reject(result);
}

const sendMessageApi = (currentUser, message) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatId: `${currentUser.phone}@c.us`,
      message: `${message}`,
    }),
    redirect: 'follow',
  };
  return fetch(
    `https://api.green-api.com/waInstance${localStorage.getItem(
      'id',
    )}/SendMessage/${localStorage.getItem('token')}`,
    requestOptions,
  ).then((response) => handleResponse(response));
};

const getMessageApi = () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(
    `https://api.green-api.com/waInstance${localStorage.getItem(
      'id',
    )}/receiveNotification/${localStorage.getItem('token')}`,
    requestOptions,
  ).then((response) => handleResponse(response));
};

const deleteMessageApi = (id) => {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow',
  };
  return fetch(
    `https://api.green-api.com/waInstance${localStorage.getItem(
      'id',
    )}/deleteNotification/${localStorage.getItem('token')}/${id}`,
    requestOptions,
  ).then((response) => handleResponse(response));
};

export { sendMessageApi, getMessageApi, deleteMessageApi };
