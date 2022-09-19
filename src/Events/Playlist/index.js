import { SOCKET_EVENTS, PLAYLIST_STATUS, ACTIONS } from '../../Constants';
import RoomService from '../../Services/Room';

export const updatePlaylist = async (
  { id, videoId, userId, link, playlistStatus }, { socket, io }
) => {
  const user = await RoomService.authorization({userId, event: ACTIONS.UPDATE_PLAYLIST});
  let playlist;
  switch (playlistStatus) {
    case PLAYLIST_STATUS.ADD:
      playlist = await RoomService.addVideoToPLaylist({ id, username: user.name, link });
      break;
    case PLAYLIST_STATUS.MOVE_DOWN:
      playlist = await RoomService.moveDownVideo(id, videoId);
      break;
    case PLAYLIST_STATUS.MOVE_UP:
      playlist = await RoomService.moveUpVideo(id, videoId);
      break;
    case PLAYLIST_STATUS.REMOVE:
      playlist = await RoomService.removeVideoFromPlaylist(id, videoId);
      break;
    default:
      return;
  }
  
  io.to(id).emit(SOCKET_EVENTS.PLAYLIST_UPDATED, { playlist, playlistStatus });
};

export default [
  {
    event: SOCKET_EVENTS.UPDATE_PLAYLIST,
    handler: updatePlaylist,
  },
];

