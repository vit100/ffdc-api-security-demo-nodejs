const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const debug = require('debug')(__filename);
const expressBearerToken = require('express-bearer-token');

const auth = require('./auth')
const swagger = require('./swagger');
const apiRouter = require('./routes');
const healthzReadyzRouter = require('./health');
const socketIO = require('./controllers/socket-io.controller');

const { extractRequestData } = require('./core/utils');

const expressApp = express();

expressApp.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')
);

expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(expressBearerToken());

expressApp.use('/_status', healthzReadyzRouter);
expressApp.use('/api/', auth(), apiRouter, (req,res)=>{/* dead end. no more middlewares */});
expressApp.use('/', swagger);

expressApp.use((req, res, next) => {
  const socketIoEmmiter = socket('data');
  socketIoEmmiter(extractRequestData(req));
  next();
});

const httpServer = http.createServer(expressApp);
const socket = socketIO(httpServer);

module.exports = () => {
  httpServer.listen(process.env.PORT || 100, () => {
    console.info(`Server listening on port: ${process.env.PORT || 100}`);
  });
};

stopServer = (httpServer) => {
  console.info('stopping server');
  httpServer.close(()=>{
    console.info('server stopped');
    process.exit(0);
  });
};

process.on('SIGINT',()=> stopServer(httpServer)); 
process.on('SIGTERM',()=> stopServer(httpServer));
