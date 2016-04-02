export default class MenuController {

  constructor({ leftMenu, world, gameMap }) {
    this.leftMenu = leftMenu;
    this.world = world;
    this.gameMap = gameMap;

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
    this.world.update();
    this._updateGameMap();
  }

  _updateGameMap() {
    this.world.forEachCell(this._updateCellView.bind(this));
  }

  _updateCellView(cell) {
    this.gameMap.updateCell(cell)
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
    this.world.reset();
    this._updateGameMap();

    this.onStopButtonClick();
  }

  // Cell Listener
  onCellClicked(cellView) {
    let cellSelected = this.world.getCellOnPosition(cellView.position);
    cellSelected.setState(this.leftMenu.selectedState);
    this._updateCellView(cellSelected);
  }

}
