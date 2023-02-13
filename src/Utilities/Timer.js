import RoomService from "../Services/Room";

 class Timer {

  static timers = {}

  static startTimer = async (id) =>  {
    let room = await RoomService.findRedisRoom(id);
    if(this.timers[room.id]){
      return;
    }
    
    this.timers[room.id] = setInterval ( async () => {
      let duration = await RoomService.getVideoDuration(id);
      room.video.duration = duration + 1;
      room.save();
    }, 1000);
  }

  static stopTimer(id) {
    if(!this.timers[id]){
      return;
    }

    clearInterval(this.timers[id]);
    delete this.timers[id];
  }
}

export default Timer;
