import Position from '../../value_objects/position';

import CellMap from '../../models/cell_map';

// World Cell States
let WHITE = 'white';
let WHITE_LEFT_ANT = 'white-left-ant';
let WHITE_RIGHT_ANT = 'white-right-ant';
let WHITE_UP_ANT = 'white-up-ant';
let WHITE_DOWN_ANT = 'white-down-ant';
let BLACK = 'black';
let BLACK_LEFT_ANT = 'black-left-ant';
let BLACK_RIGHT_ANT = 'black-right-ant';
let BLACK_UP_ANT = 'black-up-ant';
let BLACK_DOWN_ANT = 'black-down-ant';

export default class LangtonAntWorld {

  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.states = [
      WHITE, WHITE_LEFT_ANT, WHITE_RIGHT_ANT, WHITE_UP_ANT, WHITE_DOWN_ANT,
      BLACK, BLACK_LEFT_ANT, BLACK_RIGHT_ANT, BLACK_UP_ANT, BLACK_DOWN_ANT
    ];

    this._buildCellMap();
  }

  _buildCellMap() {
    this.cellMap = new CellMap(this.rows, this.columns, WHITE);
  }

  update() {
    this._scheduleAllCells();
    this._updateAllCells();
  }

  _scheduleAllCells() {
    this._getUpdatableCells().forEach(cell => {
      this._scheduleCellState(cell);
    });
    // this.cellMap.forEachCell(cell => {
    //   this._scheduleCellState(cell);
    // });
  }

  _getUpdatableCells() {
    let antCells = this.cellMap.filterCells(cell => {
      return this._doesCellHasAnt(cell);
    });
    let updatableCells = [];
    antCells.forEach(cell => {
      updatableCells.push(cell);
      updatableCells =
        updatableCells.concat(this._getValidNeighboursCells(cell));
    });
    return updatableCells;
  }

  _doesCellHasAnt(cell) {
    return cell.hasState(WHITE_LEFT_ANT) ||
            cell.hasState(WHITE_RIGHT_ANT) ||
            cell.hasState(WHITE_UP_ANT) ||
            cell.hasState(WHITE_DOWN_ANT) ||
            cell.hasState(BLACK_LEFT_ANT) ||
            cell.hasState(BLACK_RIGHT_ANT) ||
            cell.hasState(BLACK_UP_ANT) ||
            cell.hasState(BLACK_DOWN_ANT);
  }

  _scheduleCellState(cell) {
    if (this._shouldCellSwitchToBlack(cell)) {
      cell.setNextState(BLACK);
    } else if (this._shouldCellSwitchToWhite(cell)) {
      cell.setNextState(WHITE);
    }
  }

  _shouldCellSwitchToBlack(cell) {
    return cell.hasState(WHITE_LEFT_ANT) ||
            cell.hasState(WHITE_RIGHT_ANT) ||
            cell.hasState(WHITE_UP_ANT) ||
            cell.hasState(WHITE_DOWN_ANT);
  }

  _shouldCellSwitchToWhite(cell) {
    return cell.hasState(BLACK_LEFT_ANT) ||
            cell.hasState(BLACK_RIGHT_ANT) ||
            cell.hasState(BLACK_UP_ANT) ||
            cell.hasState(BLACK_DOWN_ANT);
  }

  _getValidNeighboursCells(cell) {
    return this._getValidNeighboursPositions(cell.position).map(position => {
      this.cellMap.getCellOnPosition(position);
    });
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
