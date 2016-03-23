import Position from '../../value_objects/position';

import CellMap from '../../models/cell_map';

import Cell from './cell/cell';

export default class ConwayWorld {

  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

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
      cell.scheduleDeadState();
    } else if (numberOfLiveNeighbours === 3) {
      cell.scheduleLiveState();
    } else {
      cell.cancelStateChange();
    }
  }

  _getNumberOfLiveNeighboursOfCell(cell) {
    let neighboursPositions = this._getValidNeighboursPositions(cell.position);

    return neighboursPositions.reduce((sum, neighbourPosition) => {
      this.cellMap.getCellOnPosition(neighbourPosition).isLive() ? sum++ : null;
      return sum;
    }, 0);
  }

  _getValidNeighboursPositions(position) {
    return this._buildNeighboursPositions(position).filter(neighbourPosition => {
      return neighbourPosition.x >= 0 &&
              neighbourPosition.x < this.cellMap.columns &&
              neighbourPosition.y >= 0 &&
              neighbourPosition.y < this.cellMap.rows;
    });
  }

  _buildNeighboursPositions(position) {
    return [
      new Position(position.x - 1,  position.y - 1),
      new Position(position.x - 1,  position.y    ),
      new Position(position.x - 1,  position.y + 1),
      new Position(position.x,      position.y - 1),
      new Position(position.x,      position.y + 1),
      new Position(position.x + 1,  position.y - 1),
      new Position(position.x + 1,  position.y    ),
      new Position(position.x + 1,  position.y + 1),
    ];
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
