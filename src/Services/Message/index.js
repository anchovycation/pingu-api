import generateId from '../../../Utilities/GenerateId';

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

const MessageService = {
  createMessage,
  createSystemMessage,
};

export default MessageService;
