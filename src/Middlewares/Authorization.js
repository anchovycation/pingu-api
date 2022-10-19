import { ACTIONS } from '../Constants';
import CustomError from '../Exceptions/CustomError';
import RoomService from '../Services/Room';

const authorization = async ({socketId, event}) => {
  if(!(event in ACTIONS)){
    return;
  }
  const user = await RoomService.findUserWithSocketId(socketId);

  if(!ACTIONS[event].includes(user.role)){
    throw new CustomError('You must have permission to do this!', 403);
  }
  return user;
}

export default authorization;
