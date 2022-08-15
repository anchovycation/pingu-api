import { SOCKET_EVENTS } from '../../Constants';
import RoomService from '../../Services/Room';
import MessageService from '../../Services/Message';

export const joinRoom = async ({ id, userId, username }, { socket, io }) => {
  let room = await RoomService.findRoom(id);
  socket.join(room.id);
  let socketId = socket.id;
  room = await RoomService.updateUserId({ id, userId, socketId });

  let message = `${username} joined to room`;
  await MessageService.saveSystemMessage(id, message);
  socket.emit(SOCKET_EVENTS.JOINED, { room, message });
};

export default [
  {
    event: SOCKET_EVENTS.JOIN_ROOM,
    handler: joinRoom,
  },
];
