import Position from '../../value_objects/position';

import Cell from '../../models/cell';
import CellMap from '../../models/cell_map';

// World Cell States
let DEAD = 'dead';
let LIVE = 'live';

export default class ConwayWorld {

  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.states = [DEAD, LIVE];

    this._buildCellMap();
  }

  _buildCellMap() {
    this.cellMap = new CellMap(this.rows, this.columns, Cell);
  }

  update() {
    this._scheduleAllCells();
    this._updateAllCells();
  }

  _scheduleAllCells() {
    this.cellMap.forEachCell(cell => {
      this._scheduleCellState(cell);
    });
  }

  _scheduleCellState(cell) {
    let numberOfLiveNeighbours = this._getNumberOfLiveNeighboursOfCell(cell);

    if (numberOfLiveNeighbours < 2 || numberOfLiveNeighbours > 3) {
      cell.setNextState(DEAD);
    } else if (numberOfLiveNeighbours === 3) {
      cell.setNextState(LIVE);
    }
  }

  _getNumberOfLiveNeighboursOfCell(cell) {
    let neighboursPositions = this._getValidNeighboursPositions(cell.position);
    let liveNeighboursCells = neighboursPositions.filter(position => {
      return this.cellMap.getCellOnPosition(position).hasState(LIVE);
    });

    return liveNeighboursCells.length;
  }

  _getValidNeighboursPositions(position) {
    return Position.getMooreNeighborhoodForPosition(position)
      .filter(neighbourPosition => {
        return neighbourPosition.x >= 0 &&
                neighbourPosition.x < this.cellMap.columns &&
                neighbourPosition.y >= 0 &&
                neighbourPosition.y < this.cellMap.rows;
      });
  }

  _updateAllCells() {
    this.cellMap.forEachCell(cell => { cell.updateState(); });
  }

  forEachCell(iterator) {
    this.cellMap.forEachCell(iterator);
  }

  getCellOnPosition(position) {
    return this.cellMap.getCellOnPosition(position);
  }

  reset() {
    this._buildCellMap();
  }

}
