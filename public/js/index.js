let socket = io();
// CLIENT MESSAGES

// tradotto: client in "ascolto" dell'evento 'connect' dal server
socket.on('connect', function() {
  console.log('Connected to server');

});
// tradotto: client in "ascolto" dell'evento 'disconnect' dal server
socket.on('disconnect', function() {
  console.log('Disconnected from server')
});

// tradotto: client in "ascolto" dell'evento 'newEmail' dal server
socket.on('newMessage', function (message) {
  console.log('New message', message);
});
