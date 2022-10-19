import { SOCKET_EVENTS, VIDEO_STATUS, ACTIONS} from '../../Constants';
import RoomService from '../../Services/Room';
import Timer from '../../Utilities/Timer';

export const updateVideoStatus = async (
  { id, userId, video, videoStatus }, { socket, io }
) => {
  await RoomService.authorization({userId, event: ACTIONS.UPDATE_VIDEO_STATUS});
  switch (videoStatus) {
    case VIDEO_STATUS.PLAYED:
      video = await RoomService.playVideo(id);
      Timer.startTimer(id);
      break;
    case VIDEO_STATUS.STOPPED:
      video = await RoomService.stopVideo(id);
      Timer.stopTimer(id);
      break;
    default:
      return;
  }
  
  io.to(id).emit(SOCKET_EVENTS.VIDEO_STATUS_UPDATED, { video });
};

export const jumpInVideo = async (
  { id, userId, duration }, { socket, io }
) => {
  await RoomService.authorization({userId, event: ACTIONS.CHANGE_VIDEO_DURATION});
  let video = await RoomService.jumpInVideo(id, duration);
  io.to(id).emit(SOCKET_EVENTS.VIDEO_DURATION_CHANGED, { video });
};

export const skipVideo = async (
  { id, userId }, { socket, io }
) => {
  await RoomService.authorization({userId, event: ACTIONS.SKIP_VIDEO});
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
