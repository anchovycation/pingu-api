import { SOCKET_EVENTS } from '../../Constants';
import RoomService from '../../Services/Room';

export const joinRoom = async ({ id, userId }, { socket, io }) => {
  let room = await RoomService.findRoom(id);
  socket.join(room.id);
  let socketId = socket.id;
  console.log(`USER: ${socketId} connected with: ${room.id}`);
  room = await RoomService.updateUserId({ id, userId, socketId });

  socket.emit('joined', { room });
};

export default [
  {
    event: SOCKET_EVENTS.JOIN_ROOM,
    handler: joinRoom,
  },
];
