let socket = io();

const messageForm = document.querySelector('#message-form');
const messageText = document.querySelector('#message-input');
const messageList = document.querySelector('#messages');
const sendLocBtn = document.querySelector('#send-location');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageText.value
  }, function() {
    messageText.value = '';
  });
});

sendLocBtn.addEventListener('click', (e) => {
  if (!navigator.geolocation) {
    return alert('Geolocation non supported by your browser')
  }

  sendLocBtn.setAttribute('disabled', 'disabled');
  sendLocBtn.innerHTML = 'Sending Location...';

  navigator.geolocation.getCurrentPosition(function(position) {
    sendLocBtn.removeAttribute('disabled', 'disabled');
    sendLocBtn.innerHTML = 'Send Location';
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    sendLocBtn.setAttribute('disabled', 'disabled');
    sendLocBtn.innerHTML = 'Send Location';
    alert('Unable to fetch location');
  })
})

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
socket.on('newUser', function(message) {
  console.log(message);
});

// in "ascolto" dell'evento newMessage dal server
socket.on('newMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');

  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  messageList.innerHTML += html;
});

socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');

  const template = document.querySelector('#location-message-template').innerHTML;
  // Mustache.render takes 2 arguments: the template you want to render and the data to be injected in it
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  messageList.innerHTML += html;
});
