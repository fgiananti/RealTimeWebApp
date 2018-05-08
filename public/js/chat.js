let socket = io();

const messageForm = document.querySelector('#message-form');
const messageText = document.querySelector('#message-input');
const messageList = document.querySelector('#messages');
const sendLocBtn = document.querySelector('#send-location');

function scrollToBottom() {
  const newMessage = messageList.querySelector('li:last-child');
  if (!newMessage.previousElementSibling) {
    return
  }
  const clientHeight = messageList.clientHeight;
  const scrollTop = messageList.scrollTop;
  const scrollHeight = messageList.scrollHeight;
  const newMessageHeight = newMessage.clientHeight;
  const lastMessageHeight = newMessage.previousElementSibling.clientHeight;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messageList.scrollTop = scrollHeight;
  };
};

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
// in "ascolto" dell'evento connect dal server
socket.on('connect', function() {

  var urlParams;
  (window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
     })();

  socket.emit('join', urlParams, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    };
  });
});

// in "ascolto" dell'evento disconnect dal server
socket.on('disconnect', function() {
  console.log('Disconnected from server')
});


// in "ascolto" dell'evento newUser dal server
socket.on('newUser', function(message) {
  console.log(message);
});

socket.on('updateUserList', function (users) {
  const ol = document.createElement('ol');
  const usersDiv = document.querySelector('#users');
  usersDiv.innerHTML = '';

  users.forEach(function (user) {
    const li = document.createElement('li');
    li.innerHTML = user;
    ol.append(li);
  })

  usersDiv.append(ol);
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
  scrollToBottom();
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
  // scrollToBottom();
});
