export default class Cell {
  constructor(position) {
    this.position = position;
    this.state = 'cell';
    this._nextState = 'cell';
  }

  updateState() {
    this.state = this._nextState;
  }

  setState(state) {
    this.state = state;
    this._nextState = state;
  }

  setNextState(nextState) {
    this._nextState = nextState;
  }

}
