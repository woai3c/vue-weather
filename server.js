const http = require('http');
const express = require('express');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

// Create the app, setup the webpack middleware
const app = express();
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  stats: {
        colors: true
    }
}));
app.use(require('webpack-hot-middleware')(compiler));

// You probably have other paths here
app.use(express.static('dist'));

const server = new http.Server(app);
const io = require('socket.io')(server);

const PORT = 8080;

server.listen(PORT);

io.on('connection', socket => {
  // <insert relevant code here>
  socket.on('client', data => {
  	console.log(data)
  	socket.emit('server', '123');
  })
});