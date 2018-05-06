require('./config/config');
const express = require('express'),
      app = express(),
      path = require('path'),
      port = process.env.PORT;

const indexRoutes = require('./routes/index');

// usato path per conoscenza (è nuts)
const publicPath = path.join(__dirname, './public');

app.set('view engine', 'ejs');

app.use('/', indexRoutes);

app.listen(process.env.PORT, () => {
  console.log('connected to the server');
});
