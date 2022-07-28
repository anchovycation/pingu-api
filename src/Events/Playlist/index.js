import { SOCKET_EVENTS } from '../../Constants';
import RoomService from '../../Services/Room';

export const addVideoToPLaylist = async ({ id, username, link }, { socket, io }) => {
  io.to(id).emit(SOCKET_EVENTS.PLAYLIST_UPDATED, { id, username, link });
  await RoomService.addVideoToPLaylist({ id, username, link })
};

export default [
  {
    event: SOCKET_EVENTS.ADD_VIDEO_TO_PLAYLIST,
    handler: addVideoToPLaylist,
  },
];
