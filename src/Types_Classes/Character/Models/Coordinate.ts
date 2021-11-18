class Coordinate {
  constructor(y: number, x: number) {
    this.y = y;
    this.x = x;
  }

  static Empty(): Coordinate {
    return new Coordinate(0, 0);
  }

  x: number;
  y: number;
}

export default Coordinate