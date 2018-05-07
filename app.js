require('./config/config');
const express = require('express'),
      app = express(),
      path = require('path'),
      port = process.env.PORT,
      socketIO = require('socket.io'),
      // bisogna creare un server utilizzando la library http. di fatto express utilizza anch'esso la library... quando si fa app.listen, behind the scenes viene chiamato http.createServer
      http = require('http'),
      server = http.createServer(app),
      // io = websockect server
      io = socketIO(server);



const indexRoutes = require('./routes/index');

// usato path per conoscenza (è nuts)
const publicPath = path.join(__dirname, './public');

app.set('view engine', 'ejs');

app.use('/', indexRoutes);

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('user was disconnected')
  })
});

// socket.io richiede server qui
server.listen(process.env.PORT, () => {
  console.log('connected to the server');
});
