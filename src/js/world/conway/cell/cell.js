// export default class Cell {
//
//   constructor(position) {
//     this.position = position;
//     this._stateClass = 'cell'
//   }
//
// }

export default class Cell {
  constructor(position) {
    this.position = position;
    this.setDead();
  }

  updateState() {
    this._isLive = this._willChangeToLive;
  }

  isLive() {
    return this._isLive;
  }

  toogleState() {
    this._isLive = !this._isLive;
  }

  setDead() {
    this._isLive = false;
  }

  scheduleLiveState() {
    this._willChangeToLive = true;
  }

  scheduleDeadState() {
    this._willChangeToLive = false;
  }

  cancelStateChange() {
    this._willChangeToLive = this._isLive;
  }

}
