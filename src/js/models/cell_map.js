import Position from '../value_objects/position';

import Cell from './cell';

export default class CellMap {

  constructor(rows, columns, GameRule) {
    this.rows = rows;
    this.columns = columns;

    this.gameRule = new GameRule(this);

    this._buildInnerStruct();
  }

  _buildInnerStruct() {
    this._cells = [];
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.columns; i++) {
        this._cells.push(new Cell(new Position(i, j)));
      }
    }
  }

  updateAllCells() {
    this._scheduleAllCells();
    this._updateAllCellState();
  }

  _scheduleAllCells() {
    this.gameRule.scheduleAllCells();
  }

  getCellOnPosition(position) {
    return this._cells[position.y * this.columns + position.x];
  }

  resetAllCells() {
    this.forEachCell(cell => { cell.setDead(); });
  }

  _updateAllCellState() {
    this.forEachCell(cell => { cell.updateState(); });
  }

  forEachCell(callback) {
    this._cells.forEach(callback);
  }

  filterCells(predicate) {
    return this._cells.filter(predicate);
  }

}
