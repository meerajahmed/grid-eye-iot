const express = require('express');
const socketio = require('socket.io-client');

const app = express();
const port = process.env.PORT || 3001; // port set by heroku
const io = socketio('https://cosmos-grid-eye.herokuapp.com');

getRandomInt = (max) =>  Math.floor(Math.random() * Math.floor(max));

app.get('/', (req, res) => res.send('Grid Eye IOT'));

io.on('connect', () => {
  console.log('Grid eye iot connected');
  setInterval(() => {
    io.emit('from_grid_eye', {
      time: Date.now(),
      count: getRandomInt(10),
      id: getRandomInt(4)
    });
  }, 2000);
  /*io.emit('from_grid_eye', { time: 1563880469891, count: 4, id: 1 });
  io.emit('from_grid_eye', { time: 1563880469892, count: 2, id: 2 });
  io.emit('from_grid_eye', { time: 1563880469893, count: 6, id: 3 });*/
});

io.on('disconnect', () => console.log('Grid eye iot disconnected'));

app.listen(port, () => {
  console.log(`App is running: 🌎 http://localhost:${port}`)
});
