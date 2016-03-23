import Position from '../value_objects/position';

export default class CellMap {

  constructor(rows, columns, Cell) {
    this.rows = rows;
    this.columns = columns;

    this._buildMapForCell(Cell);
  }

  _buildMapForCell(Cell) {
    this._cells = [];
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.columns; i++) {
        this._cells.push(new Cell(new Position(i, j)));
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
