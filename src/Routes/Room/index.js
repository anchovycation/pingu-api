import RoomService from '../../Services/Room';

const toJSON = (record) => {
  delete record._Model; // remove circular structure and system info
  return record;
};

const createRoom = async (req, res) => {
  const { username, roomName, videoUrl } = req.body;
  if (!username || !roomName || !videoUrl) {
    return res.status(400).send({
      message: '"username", "roomName" and "videoUrl" must be in to the body and dont be empty!',
    });
  }
  if (!username || !roomName || !videoUrl) {
    return res.status(400).send({
      message: '"username", "roomName" and "videoUrl" must be in to the body and dont be empty!',
    });
  }
  if (!videoUrl.startsWith('https://www.youtube.com/watch?v=') && !videoUrl.startsWith('https://youtu.be/')) {
    return res.status(400).send({
      message: 'video url must start with "https://www.youtube.com/watch?v=" or "https://youtu.be/"',
    });
  }
  const room = await RoomService.createRoom({ username, roomName, videoUrl });
  return res.send({ room: toJSON(room), user: room.users[0] });
};

export default [{
  prefix: '/create-room',
  inject: (router) => {
    router.post('', createRoom);
  },
}];
