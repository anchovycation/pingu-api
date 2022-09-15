import RoomService from "../Services/Room";

 class Timer {

  static timers = {};

  static startTimer = async (id) =>  {
    let room = await RoomService.findRedisRoom(id);
    this.timers[room.id] = setInterval ( async () => {
      let duration = await RoomService.getVideoDuration(id);
      room.video.duration = duration + 1;
      room.save();
    }, 1000);
  }

  static stopTimer(id) {
    clearInterval(this.timers[id]);
    delete this.timers[id];
  }
}

export default Timer;
