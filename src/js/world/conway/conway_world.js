import BaseWorld from '../base_world';

// World Cell States
let DEAD = 'dead';
let LIVE = 'live';

export default class ConwayWorld extends BaseWorld {

  constructor(rows, columns) {
    super(rows, columns);
  }

  getWorldStates() {
    return [DEAD, LIVE];
  }

  getDefaultCellState() {
    return DEAD;
  }

  scheduleCellState(cell) {
    let numberOfLiveNeighbours = this._getNumberOfLiveNeighboursOfCell(cell);

    if (numberOfLiveNeighbours < 2 || numberOfLiveNeighbours > 3) {
      cell.setNextState(DEAD);
    } else if (numberOfLiveNeighbours === 3) {
      cell.setNextState(LIVE);
    }
  }

  _getNumberOfLiveNeighboursOfCell(cell) {
    return this.getNeighboursCellsOfCell(cell)
            .filter(cell => cell.hasState(LIVE))
            .length;
  }

}
