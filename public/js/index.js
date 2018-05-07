let socket = io();
// CLIENT MESSAGES
// event listener: on connect (di un client al socket) -> console.log sulla console del client (browser)
socket.on('connect', function() {
  console.log('Connected to server');
});
// event listener: on disconnect
socket.on('disconnect', function() {
  console.log('Disconnected form server')
});
