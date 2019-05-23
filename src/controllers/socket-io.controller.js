const socketio = require('socket.io');
const debug = require('debug')(__filename);

clients = {};
let socketioServer;

// module.exports = httpServer => {
//   debug('starting sockeIO');

//   let socketIoServer = socketio(httpServer, {
//     allowRequest: (req, cb) => {
//       var x = req;
//       cb(null, true);
//     }
//   });

//   socketIoServer.on('connection', s => {
//     debug(`incoming connection: ${s.id}`);
//     clients[s.id] = s;
//   });

//   return (to, msg) => {
//     let clientSocket = clients[to];
//     if (clientSocket) {
//       clientSocket.emit(event, msg);
//     }
//   };
// };

function createSocketServer(httpServer) {
  socketioServer = socketio(httpServer, {
    allowRequest: (req, cb) => {
      cb(null, true);
    }
  });

  socketioServer.on('connection', clientSocket => {
    clients[clientSocket.id] = clientSocket;
    debug(`Socket client ${clientSocket.id} connected. Active socket client ids: ${Object.keys(clients)}`);
    clientSocket.on('disconnect', reason => {
      delete clients[clientSocket.id];
      debug(`Socket client ${clientSocket.id} disconnected. Reason: ${reason}. Active socket client ids: ${Object.keys(clients)}`);
    });
  });

  return eventName => {
    return (target, data) => {
      if (clients[target]) {
        clients[target].emit(eventName, data);
      }
    };
  };
}

createSocketServer.close = function() {
  socketioServer.close();
};

module.exports = createSocketServer;
