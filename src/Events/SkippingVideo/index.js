import { SOCKET_EVENTS } from '../../Constants';
import RoomService from '../../Services/Room';

export const skipVideo = async (
  { id }, { socket, io }
) => {
  let room = await RoomService.skipVideo(id);
  io.to(id).emit(SOCKET_EVENTS.VIDEO_SKIPPED, { video: room.video, playlist: room.playlist });
};

export default [
  {
    event: SOCKET_EVENTS.SKIP_VIDEO,
    handler: skipVideo,
  },
];
