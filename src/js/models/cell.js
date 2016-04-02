export default class Cell {
  constructor(position) {
    this.position = position;
    this.state = 'cell';
    this._nextState = 'cell';
  }

  updateState() {
    this.state = this._nextState;
  }

  hasState(state) {
    return this.state == state;
  }

  hasStateContained(states) {
    return states.indexOf(this.state) !== -1;
  }

  setState(state) {
    this.state = state;
    this._nextState = state;
  }

  setNextState(nextState) {
    this._nextState = nextState;
  }

}
