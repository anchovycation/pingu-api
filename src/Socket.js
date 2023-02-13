/*
Main socket file
Create socket server and inject all events in src/Events folders
*/

import { Server } from 'socket.io';
import { SOCKET_EVENTS } from './Constants';
import eventsHandlers from './Events';
import { connectionEventHandler } from './Events/System';
import Authorization from './Middlewares/Authorization';

let io = null;

const bindSocket = (expressServer) => {
  io = new Server(expressServer);
  listenServer();
};

const listenServer = () => {
  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    // Binds all events and handlers in eventHandlers
    eventsHandlers.forEach((element) => {
      socket.on(element.event, (arg) => {
        Authorization({ socketId: socket.id, event: element.event });
        element.handler(arg, { socket, io });
      });
    });

    /* add here same codes to do when user connects */
    connectionEventHandler({ socket, io });
  });
};

export {
  bindSocket,
};
