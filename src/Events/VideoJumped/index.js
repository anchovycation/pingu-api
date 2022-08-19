import { SOCKET_EVENTS } from '../../Constants';
import RoomService from '../../Services/Room';

export const jumpInVideo = async (
  { id, video, duration }, { socket, io }
) => {
  await RoomService.jumpInVideo(id, duration);
  io.to(id).emit(SOCKET_EVENTS.VIDEO_JUMPED, { video });
};

export default [
  {
    event: SOCKET_EVENTS.JUMP_VIDEO,
    handler: jumpInVideo,
  },
];
