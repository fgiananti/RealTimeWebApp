let socket = io();
// CLIENT MESSAGES

// tradotto: client in "ascolto" dell'evento 'connect' dal server
socket.on('connect', function() {
  console.log('Connected to server');


  // from client to server, solo un esempio non reale: quando il client si connette (on connect) ---> (createEmail - emit). Dovrà essere impostato un event listener per questo evento sul server
  socket.emit('createMessage', {
    from: 'Pippo',
    text: 'Hey. This is Pippo (client)'
  });
});
// tradotto: client in "ascolto" dell'evento 'disconnect' dal server
socket.on('disconnect', function() {
  console.log('Disconnected from server')
});

// tradotto: client in "ascolto" dell'evento 'newEmail' dal server
socket.on('newMessage', function (message) {
  console.log('New message', message);
});
