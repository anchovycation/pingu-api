import generateId from '../../Utilities/GenerateId';
import RoomService from '../Room';

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

const addMessageToMessages = async (id, text, user) => {
  let room = await RoomService.findRoom(id);

  if(room.messages.length > 100 ){
    room.messages.shift();
  }

  const message = createMessage(text, user);
  message.isSystemMessage = false;

  room.messages.push(message);

  await room.save();
  return true;
};

const MessageService = {
  createMessage,
  createSystemMessage,
  addMessageToMessages,
};

export default MessageService;
