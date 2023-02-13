import { ACTIONS } from '../Constants';
import RoomService from '../Services/Room';

const authorization = async ({ socketId, event }) => {
  try {
    if (!(event in ACTIONS)) {
      return;
    }

    // FIXME: This service throw CustomError if user doesnt exit
    //        and this error have huge message body. It should return null
    const user = await RoomService.findUserWithSocketId(socketId);

    if (!ACTIONS[event].includes(user.role)) {
      throw new Error();
    }
    return user;
  } catch (error) {
    throw new Error(`Socket not have permission to ${event}!`);
  }
};

export default authorization;
