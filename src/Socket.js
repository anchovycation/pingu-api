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

const errorHandler = (socket, handler) => {
  const handleError = (err) => {
    console.error({ socketError: err, socketId: socket.id });
    socket.emit('socket-error', { error: err.message });
  };

  return (...args) => {
    try {
      const ret = handler.apply(this, args);
      if (ret && typeof ret.catch === "function") {
        // async handler
        ret.catch(handleError);
      }
    } catch (e) {
      // sync handler
      handleError(e);
    }
  };
};

const listenServer = () => {
  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    // Binds all events and handlers in eventHandlers
    eventsHandlers.forEach((element) => {
      socket.on(element.event, errorHandler(socket, async (arg) => {
        // Add middlewares here
        await Authorization({ socketId: socket.id, event: element.event });

        // Event handler
        element.handler(arg, { socket, io });
      }));
    });

    /* add here same codes to do when user connects */
    connectionEventHandler({ socket, io });
  });
};

export {
  bindSocket,
};
