import RoomService from '../../Services/Room';

const toJSON = (record) => {
  delete record._Model; // remove circular structure and system info
  return record;
};

const joinRoom = async (req, res) => {
  const { username } = req.body;
  const { id } = req.params;

  if (!username) {
    return res.status(400).send({
      message: 'Username must be in to the body and dont be empty!',
    });
  }

  const room = await RoomService.joinRoom({ id, username });
  return res.status(201).send({ room: toJSON(room) });
};

export default [{
  prefix: '/join-room',
  inject: (router) => {
    router.post('/:id', joinRoom);
  },
}];
