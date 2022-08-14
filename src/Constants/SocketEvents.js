const SOCKET_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'join-room',
  JOINED: 'joined',
  SEND_MESSAGE: 'send-message',
  RECEIVE_MESSAGE: 'receive-message',
  TYPING: 'typing',
  DISPLAY: 'display',
  UPDATE_PLAYLIST: 'update-playlist',
  PLAYLIST_UPDATED: 'playlist-updated',
  KICK_USER: 'kick-user',
  USER_KICKED: 'user-kicked',
};

export default SOCKET_EVENTS;
