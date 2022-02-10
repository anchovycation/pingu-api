import Model from 'metronom';
import MessageService from './Message';
import generateId from '../../Utilities/GenerateId';
import { USER_TYPES } from '../../Constants';

const schema = {
  id: '',
  name: '',
  video: {
    link: '',
    duration: 0,
  },
  playlist: [],
  users: [],
  messages: [],
};

const roomModel = new Model(schema, 'rooms', { keyUnique: 'id' });

const createRoom = async ({
  id, username, roomName, videoUrl,
}) => {
  if (!id) {
    id = generateId();
  }

  const data = roomModel.schema;
  data.id = id;
  data.name = roomName;
  data.video.link = videoUrl;
  data.users[0] = {
    id: generateId(),
    name: username,
    role: USER_TYPES.OWNER,
  };
  data.messages[0] = MessageService.createSystemMessage(`Room created by ${username}`);

  const room = await roomModel.create(data);
  return room;
};

const RoomService = {
  createRoom,
};

export default RoomService;
