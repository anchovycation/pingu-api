import Model from 'metronom';
import MessageService from '../Message';
import generateId from '../../Utilities/GenerateId';
import { USER_TYPES, VIDEO_STATUS } from '../../Constants';
import axios from 'axios';

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
      duration: 0,
      status: VIDEO_STATUS.STOPPED,
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

const YOUTUBE_PLAYLIST_ITEMS_API = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&";

const addVideoToPLaylist = async ({ id, username, link }) => {
  let room = await findRoom(id);
  const word = 'playlist';
  let isPlaylist = link.includes(word);

  if(isPlaylist) {
    let playlistId = link.split('list=')[1];
    let response = await axios.get(`${YOUTUBE_PLAYLIST_ITEMS_API}playlistId=${playlistId}&maxResults=500&key=${process.env.API_KEY}`);

    let playlist = response.data.items;
    console.log(response);
    room.playlist.concat( 
      playlist.map( video => {
        return {
          id: generateId(),
          username,
          link: `https://www.youtube.com/watch?v=${video.contentDetails.videoId}`,
        }
      })
    );
  }
  else{
    room.playlist.push({
      id: generateId(),
      username,
      link,
    });
  }

  await room.save();
  return room.playlist;
};

const moveDownVideo  = async (roomId, videoId) => {
  let room = await findRoom(roomId);

  const index = room.playlist.findIndex(video => video.id === videoId); 

  if (room.playlist.length === index) {
    return;
  }

  const element = room.playlist.splice(index, 1)[0];
  room.playlist.splice(index + 1, 0, element);

  await room.save();

  return room.playlist;
};

const moveUpVideo = async (roomId, videoId) => {
  let room = await findRoom(roomId);

  const index = room.playlist.findIndex(video => video.id === videoId); 

  if (index === 0) {
    return;
  }

  const element = room.playlist.splice(index, 1)[0];

  room.playlist.splice(index - 1, 0, element);
  await room.save();
  
  return room.playlist;
};

const removeVideoFromPlaylist = async (roomId, videoId) => {
  let room = await findRoom(roomId);

  const index = room.playlist.findIndex(video => video.id === videoId);

  room.playlist.splice(index, 1);
  await room.save();

  return room.playlist;
}

const kickUserFromRoom = async (roomId, userId) => {
  let room = await findRoom(roomId);

  const index = room.users.findIndex(user => {
    return user.id === userId;
  });

  room.users.splice(index, 1);
  await room.save();
};

const playVideo = async (roomId) => {
  let room = await findRoom(roomId);

  room.video.status = VIDEO_STATUS.PLAYED;
  await room.save();
  return room.video;
};

const stopVideo = async (roomId) => {
  let room = await findRoom(roomId);

  room.video.status = VIDEO_STATUS.STOPPED;
  await room.save();
  return room.video;
};

const jumpInVideo = async (roomId, duration) => {
  let room = await findRoom(roomId);

  room.video.duration = duration;
  await room.save();
  return room.video;
};

const skipVideo = async (roomId) => {
  let room = await findRoom(roomId);

  if(room.playlist.length == 0 )
    return;

  room.video.duration = 0;
  room.video.status = VIDEO_STATUS.STOPPED;
  room.video.link = room.playlist.shift().link;

  room.save();
  return room;
};

const RoomService = {
  createRoom,
  joinRoom,
  findRoom,
  updateUserId,
  isExist,
  addVideoToPLaylist,
  moveDownVideo,
  moveUpVideo,
  removeVideoFromPlaylist,
  kickUserFromRoom,
  playVideo,
  stopVideo,
  jumpInVideo,
  skipVideo,
};

export default RoomService;
