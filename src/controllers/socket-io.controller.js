const socketIO = require('socket.io');
const debug = require('debug')(__filename);

let socketIoServer;
let socket;

module.exports = httpServer => {
  debug('starting sockeIO');
  socketIoServer = socketIO(httpServer);
  socketIoServer.on('connection', s => {
    debug('incoming connection');
    socket = s;
  });
  return emit;
};

onConnection = emit = event => {
  return msg => {
    if (socket) {
      socket.emit(event, msg, cb=>{
        debug(`message received by ${cb}`);
      });
    }
  };
};
