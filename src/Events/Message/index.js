import { SOCKET_EVENTS } from '../../Constants';
import MessageService from '../../Services/Message'

export const message = async ({id, text, user }, { socket, io }) => {
  await MessageService.saveMessage(id, text, user);
  io.to(id).emit(SOCKET_EVENTS.RECEIVE_MESSAGE, {text, user});
};

export default [
  {
    event: SOCKET_EVENTS.SEND_MESSAGE,
    handler: message,
  },
];
