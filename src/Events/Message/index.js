import { SOCKET_EVENTS } from '../../Constants';

export const message = async ({id, text, user }, { socket, io }) => {
  io.to(id).emit(SOCKET_EVENTS.RECEIVE_MESSAGE, {text, user});
};

export default [
  {
    event: SOCKET_EVENTS.SEND_MESSAGE,
    handler: message,
  },
];