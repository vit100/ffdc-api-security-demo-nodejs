const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const expressBearerToken = require('express-bearer-token');
const debug = require('debug')(__filename);
const helmet = require('helmet');

const auth = require('./auth');
const swagger = require('./swagger');
const apiRouter = require('./routes');
const healthzReadyzRouter = require('./health');
const socketIoController = require('./controllers/socket-io.controller');

const { extractRequestData } = require('./core/utils');

const expressApp = express();

expressApp.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

expressApp.use(cors());
expressApp.use(helmet());
expressApp.use(express.json());
expressApp.use(expressBearerToken());

expressApp.use((req, res, next) => {
  if(req.headers['socketid']){
  try {
    socketIoEmmiter(req.headers['socketid'], extractRequestData(req));
  } catch (error) {
    debug('Error: Send to socket failed', error)    
  }}
  next();
});

expressApp.use('/_status', healthzReadyzRouter);
expressApp.use('/api/', auth(), apiRouter, (req, res) => {
  /* dead end. no more middlewares */
});
expressApp.use('/', swagger);

const httpServer = http.createServer(expressApp);
const socketIoEmmiter = socketIoController(httpServer)('data');

module.exports = () => {
  httpServer.listen(process.env.PORT || 100, () => {
    console.info(`Server listening on port: ${process.env.PORT || 100}`);
  });
};

stopServer = httpServer => {
  console.info('stopping server');
  socketIoController.close();
  httpServer.close(() => {
    console.info('server stopped');
    process.exit(0);
  });
};

process.on('SIGINT', () => stopServer(httpServer));
process.on('SIGTERM', () => stopServer(httpServer));
