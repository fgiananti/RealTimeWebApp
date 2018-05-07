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
      io = socketIO(server),
      // usato path per conoscenza (è nuts)
      publicPath = path.join(__dirname, './public');

const indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.static(publicPath));

app.use('/', indexRoutes);

io.on('connection', (socket) => {
  console.log('new user connected');

  // from server to client, solo un esempio non reale: quando il client si connette (on connection) ---> (newEmail - emit). Dovrà essere impostato un event listener per questo evento sul client
  socket.emit('newMessage', {
    from: 'Fra',
    text: 'Hey. This is Fra (server)',
    createAt: 123
  });

  // tradotto: server in "ascolto" dell'evento 'createEmail' dal client
  socket.on('createMessage', (message) => {
    console.log('New message', message);
  });

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  })
});

// socket.io richiede server qui
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
