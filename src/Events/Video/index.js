import { SOCKET_EVENTS, VIDEO_STATUS } from '../../Constants';
import RoomService from '../../Services/Room';

export const updateVideoStatus = async (
  { id, video, videoStatus }, { socket, io }
) => {
  switch (videoStatus) {
    case VIDEO_STATUS.PLAYED:
      video = await RoomService.playVideo(id);
      break;
    case VIDEO_STATUS.STOPPED:
      video = await RoomService.stopVideo(id);
      break;
    default:
      return;
  }
  
  io.to(id).emit(SOCKET_EVENTS.VIDEO_STATUS_UPDATED, { video });
};

export const jumpInVideo = async (
  { id, duration }, { socket, io }
) => {
  let video = await RoomService.jumpInVideo(id, duration);
  io.to(id).emit(SOCKET_EVENTS.VIDEO_DURATION_CHANGED, { video });
};

export const skipVideo = async (
  { id }, { socket, io }
) => {
  let room = await RoomService.skipVideo(id);
  io.to(id).emit(SOCKET_EVENTS.VIDEO_SKIPPED, { video: room.video, playlist: room.playlist });
};

export default [
  {
    event: SOCKET_EVENTS.UPDATE_VIDEO_STATUS,
    handler: updateVideoStatus,
  },
  {
    event: SOCKET_EVENTS.CHANGE_VIDEO_DURATION,
    handler: jumpInVideo,
  },
  {
    event: SOCKET_EVENTS.SKIP_VIDEO,
    handler: skipVideo,
  },
];
