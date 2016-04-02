export default class Position {

  static getMooreNeighborhoodForPosition(position) {
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

  static getRightFrom(position) {
    return new Position(position.x + 1, position.y    );
  }

  static getLeftFrom(position) {
    return new Position(position.x - 1, position.y    );
  }

  static getUpFrom(position) {
    return new Position(position.x    , position.y + 1);
  }

  static getDownFrom(position) {
    return new Position(position.x    , position.y - 1);
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isEqual(otherPosition) {
    return this.x === otherPosition.x && this.y === otherPosition.y;
  }

}
