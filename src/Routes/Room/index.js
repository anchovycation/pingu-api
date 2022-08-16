import RoomService from '../../Services/Room';

const createRoom = async (req, res) => {
  const { username, roomName, videoUrl } = req.body;

  if (!username || !roomName || !videoUrl) {
    return res.status(400).send({
      message:
        '"username", "roomName" and "videoUrl" must be in to the body and dont be empty!',
    });
  }
  if (
    !videoUrl.startsWith('https://www.youtube.com/watch?v=') &&
    !videoUrl.startsWith('https://youtu.be/')
  ) {
    return res.status(400).send({
      message:
        'video url must start with "https://www.youtube.com/watch?v=" or "https://youtu.be/"',
    });
  }
  const room = await RoomService.createRoom({ username, roomName, videoUrl });
  return res
    .status(201)
    .send({ room: room.getPureData(), user: room.users[0] });
};

const joinRoom = async (req, res, next) => {
  try {
    const { username } = req.body;
    const { id } = req.params;

    if (!username) {
      return res.status(400).send({
        message: 'Username must be in to the body and dont be empty!',
      });
    }
    const room = await RoomService.joinRoom({ id, username });
    return res.status(200).send({ room: room.getPureData() });
  } catch (error) {
    next(error);
  }
};

const findRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await RoomService.findRoom(id);
    return res.status(200).send({ room: room.getPureData() });
  } catch (error) {
    next(error);
  }
};

const roomIsExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isExist = await RoomService.isExist(id);
    return res.status(200).send({ isExist });
  } catch (error) {
    next(error);
  }
};

export default [
  {
    prefix: '/create-room',
    inject: (router) => {
      router.post('', createRoom);
    },
  },
  {
    prefix: '/join-room',
    inject: (router) => {
      router.post('/:id', joinRoom);
    },
  },
  {
    prefix: '/rooms',
    inject: (router) => {
      router.get('/:id', findRoom);
      router.get('/:id/is-exist', roomIsExist);
    },
  },
];
