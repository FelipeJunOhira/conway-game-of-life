import BaseWorld from '../base_world';

import Position from '../../value_objects/position';

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

export default class LangtonAntWorld extends BaseWorld {

  constructor(rows, columns) {
    super(rows, columns);
  }

  getWorldStates() {
    return [
      WHITE, WHITE_LEFT_ANT, WHITE_RIGHT_ANT, WHITE_UP_ANT, WHITE_DOWN_ANT,
      BLACK, BLACK_LEFT_ANT, BLACK_RIGHT_ANT, BLACK_UP_ANT, BLACK_DOWN_ANT
    ];
  }

  getDefaultCellState() {
    return WHITE;
  }

  scheduleCellState(cell) {
    if (this._doesCellHaveNoAntAround(cell)) return ;

    if (this._doesCellIsWhiteAndHasAnt(cell)) {
      cell.setNextState(BLACK);
    } else if (this._doesCellIsBlackAndHasAnt(cell)) {
      cell.setNextState(WHITE);
    } else {
      this.scheduleAntMovementForCell(cell);
    }
  }

  _doesCellHaveNoAntAround(cell) {
    let cellsAround = this.getNeighboursCellsOfCell(cell).concat( [cell] );
    return cellsAround.every(cell => cell.hasStateContained([WHITE, BLACK]));
  }

  _doesCellIsWhiteAndHasAnt(cell) {
    return cell.hasStateContained([
      WHITE_LEFT_ANT, WHITE_RIGHT_ANT, WHITE_UP_ANT, WHITE_DOWN_ANT
    ]);
  }

  _doesCellIsBlackAndHasAnt(cell) {
    return cell.hasStateContained([
      BLACK_LEFT_ANT, BLACK_RIGHT_ANT, BLACK_UP_ANT, BLACK_DOWN_ANT
    ]);
  }

  scheduleAntMovementForCell(cell) {
    if (this.hasRightCell(cell) &&
        this.getRightCell(cell).hasStateContained([BLACK_UP_ANT, WHITE_DOWN_ANT])) {
          if (cell.hasState(WHITE)) cell.setNextState(WHITE_LEFT_ANT);
          else                      cell.setNextState(BLACK_LEFT_ANT);
    } else if (this.hasLeftCell(cell) &&
        this.getLeftCell(cell).hasStateContained([BLACK_DOWN_ANT, WHITE_UP_ANT])) {
          if (cell.hasState(WHITE)) cell.setNextState(WHITE_RIGHT_ANT);
          else                      cell.setNextState(BLACK_RIGHT_ANT);
    } else if (this.hasUpCell(cell) &&
        this.getUpCell(cell).hasStateContained([BLACK_LEFT_ANT, WHITE_RIGHT_ANT])) {
        if (cell.hasState(WHITE)) cell.setNextState(WHITE_DOWN_ANT);
        else                      cell.setNextState(BLACK_DOWN_ANT);
    } else if (this.hasDownCell(cell) &&
        this.getDownCell(cell).hasStateContained([BLACK_RIGHT_ANT, WHITE_LEFT_ANT])) {
          if (cell.hasState(WHITE)) cell.setNextState(WHITE_UP_ANT);
          else                      cell.setNextState(BLACK_UP_ANT);
    }
  }

  // Check specific neighbour cell
  hasRightCell(cell) {
    return this.isPositionValid(Position.getRightFrom(cell.position));
  }

  hasLeftCell(cell) {
    return this.isPositionValid(Position.getLeftFrom(cell.position));
  }

  hasUpCell(cell) {
    return this.isPositionValid(Position.getUpFrom(cell.position));
  }

  hasDownCell(cell) {
    return this.isPositionValid(Position.getDownFrom(cell.position));
  }

  // Get specific neighbour cell
  getRightCell(cell) {
    return this.cellMap.getCellOnPosition(Position.getRightFrom(cell.position));
  }

  getLeftCell(cell) {
    return this.cellMap.getCellOnPosition(Position.getLeftFrom(cell.position));
  }

  getUpCell(cell) {
    return this.cellMap.getCellOnPosition(Position.getUpFrom(cell.position));
  }

  getDownCell(cell) {
    return this.cellMap.getCellOnPosition(Position.getDownFrom(cell.position));
  }

}
