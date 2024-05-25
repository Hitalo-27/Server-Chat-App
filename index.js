const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Rota para servir uma página HTML estática
app.get('/', (req, res) => {
  res.send('<h1>Olá, mundo!</h1>');
});

io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  socket.on('message', (data) => {
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
