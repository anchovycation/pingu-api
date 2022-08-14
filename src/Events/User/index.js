import { SOCKET_EVENTS } from '../../Constants';
import RoomService from '../../Services/Room';
export const kickUserFromRoom = async ({ id, userId }, { socket, io }) => {
  await RoomService.kickUserFromRoom(id, userId);
  socket.disconnect(userId);
  socket.emit(SOCKET_EVENTS.KICKED_USER, {id, userId});
};

export default [
  {
    event: SOCKET_EVENTS.KICK_USER,
    handler: kickUserFromRoom,
  },
];
