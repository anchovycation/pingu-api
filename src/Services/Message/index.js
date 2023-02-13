import generateId from '../../Utilities/GenerateId';
import RoomService from '../Room';
import { SOCKET_EVENTS } from '../../Constants';

const createMessage = (text, user) => ({
  id: `m${generateId()}`,
  text,
  userId: user.id,
  date: new Date(),
  isSystemMessage: false,
});

const createSystemMessage = (text) => {
  const message = createMessage(text, { id: null });
  delete message.userId;
  message.isSystemMessage = true;
  return message;
};

const saveMessage = async (id, text, user) => {
  const room = await RoomService.findRedisRoom(id);

  if (room.messages.length > 100) {
    room.messages.shift();
  }

  const message = createMessage(text, user);
  message.isSystemMessage = false;
  message.username = (await RoomService.findUserWithId(message.userId)).username;
  room.messages.push(message);

  await room.save();
  return message;
};

const createJoinMessage = (username) => {
  const text = `${username} joined to room`;
  const message = createSystemMessage(text);
  return message;
};

const createLeaveMessage = (username) => {
  const text = `${username} left the room`;
  const message = createSystemMessage(text);
  return message;
};

const saveSystemMessage = async ({ id, status, username }) => {
  const room = await RoomService.findRedisRoom(id);
  let message;
  switch (status) {
  case SOCKET_EVENTS.JOIN_ROOM:
    message = createJoinMessage(username);
    break;
  case SOCKET_EVENTS.DISCONNECT:
    message = createLeaveMessage(username);
    break;
  default:
    return;
  }

  room.messages.push(message);

  await room.save();
  return message;
};

const MessageService = {
  createMessage,
  createSystemMessage,
  saveMessage,
  createJoinMessage,
  createLeaveMessage,
  saveSystemMessage,
};

export default MessageService;
