import Position from '../value_objects/position';

import CellMap from '../models/cell_map';

export default class BaseWorld {

  constructor(rows, columns) {
    this._validateUpdatableFilter();

    this.rows = rows;
    this.columns = columns;

    this.states = this.getWorldStates();

    this.buildCellMap();
  }

  _validateUpdatableFilter() {
    if (this._doesNotHasBothUpdatableAndNotUpdatableFilter()) {
      throw this.constructor.name + ' has both isCellUpdatable and isCellNotUpdatable filter!';
    }
  }

	_doesNotHasBothUpdatableAndNotUpdatableFilter() {
		return this.isCellUpdatable !== undefined &&
		        this.isCellNotUpdatable !== undefined;
	}

  getWorldStates() { return []; }

  buildCellMap() {
    this.cellMap =
			new CellMap(this.rows, this.columns, this.getDefaultCellState());
  }

  getDefaultCellState() { return ''; }

  update() {
    this._scheduleAllCells();
    this._updateAllCells();
  }

  // Should have only one of these
  // Optional, just to increase performance
  // isCellUpdatable(cell) {
  //   return cell.hasOneOfStates([CONDUCTOR, ELETRON, ELETRON_TAIL]);
  // }

  // Similar, but check the inverse
  // isCellNotUpdatable(cell) {
  //   return cell.hasState(EMPTY);
  // }

  _scheduleAllCells() {
    if (this.isCellUpdatable) {
      this.cellMap
        .filterCells(cell => this.isCellUpdatable(cell))
        .forEach(cell => { this.scheduleCellState(cell); });
    } else if (this.isCellNotUpdatable) {
      this.cellMap
        .filterCells(cell => !this.isCellNotUpdatable(cell))
        .forEach(cell => { this.scheduleCellState(cell); });
    } else {
      this.cellMap
        .forEachCell(cell => { this.scheduleCellState(cell); });
    }
  }

  scheduleCellState(cell) {}

  _updateAllCells() {
    this.cellMap.forEachCell(cell => { cell.updateState(); });
  }

  countNeighbourCellsWithState(cell, state) {
    return this.getNeighboursCellsOfCell(cell)
            .filter(cell => cell.hasState(state))
            .length;
  }

  getNeighboursCellsOfCell(cell) {
    return this._getNeighboursPositionsOfPosition(cell.position)
            .map(position => this.cellMap.getCellOnPosition(position));
  }

  _getNeighboursPositionsOfPosition(position) {
    return Position.getMooreNeighborhoodForPosition(position)
            .filter(position => this.isPositionValid(position));
  }

  isPositionValid(position) {
    return position.x >= 0 && position.x < this.columns &&
            position.y >= 0 && position.y < this.rows;
  }

  forEachCell(iterator) {
    this.cellMap.forEachCell(iterator);
  }

  getCellOnPosition(position) {
    return this.cellMap.getCellOnPosition(position);
  }

  reset() {
    this.buildCellMap();
  }

}
