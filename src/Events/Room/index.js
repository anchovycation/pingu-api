import { SOCKET_EVENTS } from '../../Constants';
import RoomService from '../../Services/Room';
import MessageService from '../../Services/Message';

export const joinRoom = async ({ id, userId, username }, { socket, io }) => {
  let room = await RoomService.findRoom(id);
  socket.join(room.id);
  let socketId = socket.id;
  room = await RoomService.updateUserId({ id, userId, socketId });

  const message = await MessageService.saveSystemMessage({ id, status: SOCKET_EVENTS.JOIN_ROOM, username });
  socket.emit(SOCKET_EVENTS.JOINED, { room });
  io.to(id).emit(SOCKET_EVENTS.RECEIVE_MESSAGE, { message });
};

export default [
  {
    event: SOCKET_EVENTS.JOIN_ROOM,
    handler: joinRoom,
  },
];
