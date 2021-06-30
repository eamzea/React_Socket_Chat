const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const Sockets = require('./Sockets');
const db_connection = require('../db/configDB');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;
    db_connection();
    this.server = http.createServer(this.app);
    this.io = socketIO(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve('public')));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/api/auth', require('../router/auth.routes'));
    this.app.use('/api/messages', require('../router/msg.routes'));
  }

  configSockets() {
    new Sockets(this.io);
  }

  initialize() {
    this.middlewares();

    this.configSockets();

    this.server.listen(this.PORT || 4000, () => {
      console.log(chalk.blue(`Server running on PORT : ${this.PORT} 🚀`));
    });
  }
}

module.exports = Server;
