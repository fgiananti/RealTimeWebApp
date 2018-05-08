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
      {generateMessage, generateLocationMessage} = require('./modules/chat/server/message'),
      {isRealString} = require('./modules/chat/server/validation'),
      {Users} = require('./modules/chat/server/users'),
      users = new Users();

const indexRoutes = require('./routes/index');
const chatRoutes = require('./routes/chat');

app.set('view engine', 'ejs');
app.use(express.static(publicPath));

app.use('/', indexRoutes);
app.use('/chat', chatRoutes);


io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} joined`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('New message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) =>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
