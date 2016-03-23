export default class MenuController {

  constructor({ leftMenu, cellMap, gameMap }) {
    this.leftMenu = leftMenu;
    this.cellMap = cellMap;
    this.gameMap = gameMap;

    this._setup();
  }

  _setup() {
    this._bindViewEvents();
  }

  _bindViewEvents() {
    this.leftMenu.nextButton.click(this.onNextButtonClick.bind(this));
    this.leftMenu.runButton.click(this.onRunButtonClick.bind(this));
    this.leftMenu.stopButton.click(this.onStopButtonClick.bind(this));
    this.leftMenu.resetButton.click(this.onResetButtonClick.bind(this));
  }

  onNextButtonClick() {
    this._updateGame();
  }

  onRunButtonClick() {
    this._scheduleNextGameTick();
  }

  _scheduleNextGameTick() {
    this._timeoutIndex = setTimeout(() => {
      this._updateGame();
      this._scheduleNextGameTick();
    }, 25);
  }

  _updateGame() {
    this.cellMap.updateAllCells();
    this.cellMap.forEachCell(this._updateCellView.bind(this));
  }

  _updateCellView(cell) {
    if (cell.isLive()) {
      this.gameMap.setPositionAsLive(cell.position);
    } else {
      this.gameMap.setPositionAsDead(cell.position);
    }
  }

  onStopButtonClick() {
    this._cancelNextGameTick();
  }

  _cancelNextGameTick() {
    clearInterval(this._timeoutIndex);
  }

  onResetButtonClick() {
    this._resetGame();
  }

  _resetGame() {
    this.cellMap.resetAllCells();
    this.cellMap.forEachCell(this._updateCellView.bind(this));

    this.onStopButtonClick();
  }

  // Cell Listener
  onCellClicked(cellView) {
    let cellSelected = this.cellMap.getCellOnPosition(cellView.position);
    cellSelected.toogleState();
    this._updateCellView(cellSelected);
  }

}
