let socket = io();

const messageForm = document.querySelector('#message-form');
const messageText = document.querySelector('#message-input');
const messageList = document.querySelector('#message-list');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'Fra',
    text: messageText.value
  }, function() {
  });
});

// CLIENT MESSAGES
// in "ascolto" dell'evento disconnect dal server
socket.on('connect', function() {
  console.log('Connected to server');
});

// in "ascolto" dell'evento disconnect dal server
socket.on('disconnect', function() {
  console.log('Disconnected from server')
});

// in "ascolto" dell'evento newUser dal server
socket.on('newUser', function (message) {
  console.log(message);
});

// in "ascolto" dell'evento newMessage dal server
socket.on('newMessage', function (message) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(`${message.from}: ${message.text}`));
  messageList.appendChild(li);
  console.log('New message', message);
});
