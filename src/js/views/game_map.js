import $ from 'jquery';

import Cell from './cell';
import Position from '../value_objects/position';

export default class GameMap {

  constructor(context) {
    this._jQueryElement = $(context.selector);
    this.rows = context.rows;
    this.columns = context.columns;

    this._setupCellList();
  }

  _setupCellList() {
    this._buildCellList();
    this._appendCellListContent();
    this._updateCellPositions();
    this._bindOnClickEvent();
    this._updateSelfSize();
  }

  _buildCellList() {
    this._cellList = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this._cellList.push(new Cell());
      }
    }
  }

  _appendCellListContent() {
    this._cellList.forEach(cell => {
      this._appendContent(cell.getContent());
    });
  }

  _appendContent(content) {
    this._jQueryElement.append(content);
  }

  _updateCellPositions() {
    this._cellList.forEach((cell, index) => {
      var x = index % this.columns;
      var y = Math.floor(index / this.columns);

      cell.position = new Position(x, y);
    });
  }

  _bindOnClickEvent() {
    let onCellClicked = this._onCellClicked.bind(this);
    this._cellList.forEach(cell => {
      cell.onClick(onCellClicked);
    });
  }

  _onCellClicked(cell) {
    this.cellListener && this.cellListener.onCellClicked(cell);
  }

  _updateSelfSize() {
    let totalHeight = Cell.getHeightInPixels() * this.rows;
    let totalWidth = Cell.getWidthInPixels() * this.columns;

    this._jQueryElement.css("height", totalHeight);
    this._jQueryElement.css("width", totalWidth);
  }

  get cellListener() { return this._cellListener; }
  set cellListener(cellListener) { this._cellListener = cellListener; }

  updateCell(cell) {
    this.getCellOnPosition(cell.position).updateState(cell.state)
  }

  getCellOnPosition(position) {
    return this._cellList[position.y * this.columns + position.x];
  }

}
