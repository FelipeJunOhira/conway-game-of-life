import Position from '../../value_objects/position';

import CellMap from '../../models/cell_map';

// World Cell States
let EMPTY = 'empty';
let CONDUCTOR = 'conductor';
let ELETRON = 'eletron';
let ELETRON_TAIL = 'eletron-tail';

export default class ConwayWorld {

  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.states = [EMPTY, CONDUCTOR, ELETRON, ELETRON_TAIL];

    this._buildCellMap();
  }

  _buildCellMap() {
    this.cellMap = new CellMap(this.rows, this.columns, EMPTY);
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

		if (cell.hasState(ELETRON)) {
			cell.setNextState(ELETRON_TAIL);
		} else if (cell.hasState(ELETRON_TAIL)) {
			cell.setNextState(CONDUCTOR);
		} else if (cell.hasState(CONDUCTOR)) {
	    let numberOfNeighboursEletrons = this._getNumberOfNeighboursEletronsOfCell(cell);
			if (numberOfNeighboursEletrons === 1 || numberOfNeighboursEletrons === 2) {
				cell.setNextState(ELETRON);
			}
		}
  }

  _getNumberOfNeighboursEletronsOfCell(cell) {
    let neighboursPositions = this._getValidNeighboursPositions(cell.position);
    let liveNeighboursCells = neighboursPositions.filter(position => {
      return this.cellMap.getCellOnPosition(position).hasState(ELETRON);
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
