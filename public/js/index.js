let socket = io();
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
  console.log('New message', message);
});
