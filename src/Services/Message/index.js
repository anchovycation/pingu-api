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
  let room = await RoomService.findRoom(id);

  if(room.messages.length > 100 ){
    room.messages.shift();
  }

  const message = createMessage(text, user);
  message.isSystemMessage = false;

  room.messages.push(message);

  await room.save();
  return message;
};

const saveJoinMessage = (username) => {
  const text = `${username} joined to room`;
  const message = createSystemMessage(text);
  return message;
};

const saveLeaveMessage = (username) => {
  const text = `${username} left the room`;
  const message = createSystemMessage(text);
  return message;
};

const saveSystemMessage = async ({id, status, username}) => {
  let room = await RoomService.findRoom(id);
  let message;
  switch(status) {
    case SOCKET_EVENTS.JOIN_ROOM:
      message = saveJoinMessage(username);
      break;
    case SOCKET_EVENTS.DISCONNECT: 
      message = saveLeaveMessage(username);
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
  saveJoinMessage,
  saveLeaveMessage,
  saveSystemMessage,
};

export default MessageService;
