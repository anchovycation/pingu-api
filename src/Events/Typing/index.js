import { SOCKET_EVENTS } from '../../Constants';

export const typing = async ({ id, username }, { socket, io }) => {
  socket.broadcast.to(id).emit(SOCKET_EVENTS.DISPLAY, { username })
};

export default [
  {
    event: SOCKET_EVENTS.TYPING,
    handler: typing,
  },
];