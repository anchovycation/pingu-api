import { SOCKET_EVENTS } from '../../Constants';

export const connectionEventHandler = ({ socket, io }) => {
  console.log(`USER: ${socket.id} connected`);
};

const disconnectHandler = (_, { socket, io }) => {
  console.log(`USER: ${socket.id} disconnected`);
  socket.disconnect();
};

export default [
  {
    event: SOCKET_EVENTS.DISCONNECT,
    handler: disconnectHandler,
  },
];
