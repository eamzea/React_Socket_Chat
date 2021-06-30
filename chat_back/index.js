require('dotenv').config();
global.chalk = require('chalk');
const Server = require('./models/Server');

const server = new Server();

server.initialize();
