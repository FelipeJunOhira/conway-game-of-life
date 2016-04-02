import BaseWorld from '../base_world';

// World Cell States
let EMPTY = 'empty';
let CONDUCTOR = 'conductor';
let ELETRON = 'eletron';
let ELETRON_TAIL = 'eletron-tail';

export default class ConwayWorld extends BaseWorld {

  constructor(rows, columns) {
    super(rows, columns);
  }

  getWorldStates() {
    return [EMPTY, CONDUCTOR, ELETRON, ELETRON_TAIL];
  }

  getDefaultCellState() {
    return EMPTY;
  }

  isCellNotUpdatable(cell) {
    return cell.hasState(EMPTY);
  }

  scheduleCellState(cell) {
    if (cell.hasState(ELETRON)) {
			cell.setNextState(ELETRON_TAIL);
		} else if (cell.hasState(ELETRON_TAIL)) {
			cell.setNextState(CONDUCTOR);
		} else if (cell.hasState(CONDUCTOR)
                && this._doesCellHasEnoughEletronsNeighbours(cell)) {
			cell.setNextState(ELETRON);
		}
  }

  _doesCellHasEnoughEletronsNeighbours(cell) {
    let neighboursEletrons = this._getNumberOfNeighboursEletronsOfCell(cell);
    return neighboursEletrons === 1 || neighboursEletrons === 2;
  }

  _getNumberOfNeighboursEletronsOfCell(cell) {
    return this.getNeighboursCellsOfCell(cell)
            .filter(cell => cell.hasState(ELETRON))
            .length;
  }

}
