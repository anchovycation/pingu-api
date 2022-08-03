import { SOCKET_EVENTS } from '../../Constants';
import MessageService from '../../Services/Message'

export const message = async ({id, text, user }, { socket, io }) => {
  io.to(id).emit(SOCKET_EVENTS.RECEIVE_MESSAGE, {text, user});
  await MessageService.addMessageToMessages(id, text, user);
};

export default [
  {
    event: SOCKET_EVENTS.SEND_MESSAGE,
    handler: message,
  },
];
