import $ from 'jquery';

import Position from '../value_objects/position';

import Cell from './cell';

export default class LeftMenu {

  constructor({ selector, states }) {
    this._jQueryElement = $(selector);
    this._states = states;
    this.selectedState = states[0];

    this._bindHtmlElements();
    this._initializeStateSelector();
  }

  _bindHtmlElements() {
    this.runButton = this._findElementById('run-button');
    this.nextButton = this._findElementById('next-button');
    this.stopButton = this._findElementById('stop-button');
    this.resetButton = this._findElementById('reset-button');
    this.stateSelector = this._findElementById('state-selector');
  }

  _findElementById(id) {
    return this._jQueryElement.find('#' + id);
  }

  _initializeStateSelector() {
    let cells = this._buildStateSelectorCells();
    this.stateSelector.append(this._getCellsContent(cells));
  }

  _buildStateSelectorCells() {
    let onCellClick = this._onCellClick.bind(this);
    return this._states.map((state, index) => {
      let cell = new Cell();
      cell.position = new Position(index, 0);
      cell.updateState(state);
      cell.onClick(onCellClick);
      return cell;
    });
  }

  _getCellsContent(cells) {
    return cells.map(cell => {
      return cell.getContent();
    });
  }

  _onCellClick(cell) {
    this.selectedState = cell.state;
  }

}
