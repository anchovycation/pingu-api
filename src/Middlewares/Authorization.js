import { ACTIONS } from '../Constants';
import CustomError from '../Exceptions/CustomError';
import RoomService from '../Services/Room';

const authorization = async ({ socketId, event }) => {
  if (!(event in ACTIONS)) {
    return;
  }
  const user = await RoomService.findUserWithSocketId(socketId);

  if (!ACTIONS[event].includes(user.role)) {
    throw new CustomError(`You do not have permission to ${event}!`, 403);
  }
  return user;
};

export default authorization;
