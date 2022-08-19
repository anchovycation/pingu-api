import { SOCKET_EVENTS } from '../../Constants';
import RoomService from '../../Services/Room';

export const jumpInVideo = async (
  { id, duration }, { socket, io }
) => {
  let video = await RoomService.jumpInVideo(id, duration);
  io.to(id).emit(SOCKET_EVENTS.VIDEO_DURATION_CHANGED, { video });
};

export default [
  {
    event: SOCKET_EVENTS.CHANGE_VIDEO_DURATION,
    handler: jumpInVideo,
  },
];
