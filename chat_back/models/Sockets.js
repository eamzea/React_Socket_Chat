const { verifyJWT } = require('../helpers/jwt');
const {
  userConnected,
  userDisconnected,
  getUsers,
  saveMsgs,
} = require('../controllers/sockets.controller');

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', async socket => {
      //TODO

      const token = socket.handshake.query['x-token'];

      const [valid, uid] = verifyJWT(token);

      if (!valid) {
        console.log(chalk.red(`Something wrong happened : Invalid Socket`));
        return socket.disconnect();
      }

      await userConnected(uid);
      socket.join(uid);

      console.log(chalk.yellow('Client connected', uid));

      this.io.emit('list_users', await getUsers());

      socket.on('individual_msg', async msg => {
        const message = await saveMsgs(msg);

        this.io.to(msg.to).emit('individual_msg', message);
        this.io.to(msg.from).emit('individual_msg', message);
      });

      socket.on('disconnect', async () => {
        await userDisconnected(uid);
        this.io.emit('list_users', await getUsers());

        console.log(chalk.magenta('Client disconnected', uid));
      });
    });
  }
}

module.exports = Sockets;
