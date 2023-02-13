import { SOCKET_EVENTS, ACTIONS } from '../../Constants';
import RoomService from '../../Services/Room';

export const kickUserFromRoom = async ({ id, userId }, { socket, io }) => {
  await RoomService.kickUserFromRoom(id, userId);
  socket.disconnect(userId);
  socket.emit(SOCKET_EVENTS.USER_KICKED, { id, userId });
};

export default [
  {
    event: SOCKET_EVENTS.KICK_USER,
    handler: kickUserFromRoom,
  },
];
