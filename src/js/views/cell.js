import $ from 'jquery';

export default class Cell {

  static getHeightInPixels() { return 15; }
  static getWidthInPixels() { return 15; }

  static getHtmlTemplate() { return '<div class="cell"></div>'; }

  constructor(position) {
    this._buildjQueryElement();
    this.state = '';
  }

  _buildjQueryElement() {
    this._jQueryElement = $(this.constructor.getHtmlTemplate());
    this._setjQueryElementSize();
  }

  _setjQueryElementSize() {
    this._jQueryElement.css('height', this.constructor.getHeightInPixels());
    this._jQueryElement.css('width', this.constructor.getWidthInPixels());
  }

  get position() { return this._position; }

  set position(position) {
    this._position = position;
    this._updatePosition();
  }

  _updatePosition() {
    this._jQueryElement.css({
      top: this.position.y * this.constructor.getHeightInPixels(),
      left: this.position.x * this.constructor.getWidthInPixels()
    });
  }

  getContent() {
    return this._jQueryElement;
  }

  updateState(state) {
    this.state = state;
    this._updateCellClass();
  }

  _updateCellClass() {
    this._jQueryElement
      .removeClass()
      .addClass(this._getClass());
  }

  _getClass() {
    return 'cell-' + this.state;
  }

  onClick(callback) {
    this._jQueryElement.click(() => {
      callback(this);
    });
  }

}
