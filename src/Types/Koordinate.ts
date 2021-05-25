class Koordinate {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static Empty(): Koordinate {
    return new Koordinate(0, 0);
  }

  x: number;
  y: number;
}

export default Koordinate