require('./config/config');
const express = require('express'),
      app = express(),
      path = require('path'),
      port = process.env.PORT,
      socketIO = require('socket.io'),
      http = require('http'),
      server = http.createServer(app),
      io = socketIO(server),
      publicPath = path.join(__dirname, './public'),
      {generateMessage, generateLocationMessage} = require('./modules/chat/server/message')

const indexRoutes = require('./routes/index');
const chatRoutes = require('./routes/chat');

app.set('view engine', 'ejs');
app.use(express.static(publicPath));

app.use('/', indexRoutes);
app.use('/chat', chatRoutes);


io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('New message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) =>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
