import Position from '../../value_objects/position';

export default class ConwayGameOfLifeRule {

  constructor(cellMap) {
    this.cellMap = cellMap;
  }

  scheduleAllCells() {
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

}
