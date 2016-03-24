import Position from '../value_objects/position';

import Cell from './cell';

export default class CellMap {

  constructor(rows, columns, defaultCellState) {
    this.rows = rows;
    this.columns = columns;

    this._buildCellMapWithDefaultState(defaultCellState);
  }

  _buildCellMapWithDefaultState(defaultCellState) {
    this._cells = [];
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.columns; i++) {
        let cell = new Cell(new Position(i, j));
        cell.setState(defaultCellState);
        this._cells.push(cell);
      }
    }
  }

  getCellOnPosition(position) {
    return this._cells[position.y * this.columns + position.x];
  }

  forEachCell(callback) {
    this._cells.forEach(callback);
  }

  filterCells(predicate) {
    return this._cells.filter(predicate);
  }

}
