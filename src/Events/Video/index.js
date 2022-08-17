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

export default [
  {
    event: SOCKET_EVENTS.UPDATE_VIDEO_STATUS,
    handler: updateVideoStatus,
  },
];
