import Model from 'metronom';
import MessageService from '../Message';
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

  const data = {
    id,
    name: roomName,
    video: {
      link: videoUrl,
      duration: 0
    },
    playlist: [],
    users: [{
      id: generateId(),
      username,
      role: USER_TYPES.OWNER,
    }],
    messages: [
      MessageService.createSystemMessage(`Room created by ${username}`)
    ]
  }

  const room = await roomModel.create(data);
  return room;
};

const joinRoom = async ({
  id, username,
}) => {
  const room = await roomModel.findById(id);

  if (!room) {
    throw new Error('Room not find or you dont have a permission!');
  }

  room.users.push({
    id: generateId(),
    username,
    role: USER_TYPES.GUEST,
  });

  room.messages.push(MessageService.createSystemMessage(`${username} joined to room`));
  await room.save();

  return room;
};

const findRoom = async (id) => {
  const room = await roomModel.findById(id);


  if (!room) {
    throw new Error('Room not find or you dont have a permission!');
  }

  return room;
};

const updateUserId = async ({
  id, userId, socketId,
}) => {
  const room = await findRoom(id);
  room.users.forEach(user => {
    if(user.id == userId){
      user.id = socketId;
    }
  });
  await room.save();
  return room;
};

const isExist = async (id) => {
  if(!id){
    throw new Error('id is required!');
  }
  const redisKey = `${roomModel.keyPrefix}:${id}`;
  let isExist = await (await roomModel.redisClient.keys(redisKey)).length;
  return isExist > 0;
};

const addVideoToPLaylist = async ({ id, username, link }) => {
  let room = await findRoom(id);

  room.playlist.push({
    id: room.playlist.length + 1,
    username,
    link,
  });

  await room.save();
  return true;
}

const RoomService = {
  createRoom,
  joinRoom,
  findRoom,
  updateUserId,
  isExist,
  addVideoToPLaylist,
};

export default RoomService;
