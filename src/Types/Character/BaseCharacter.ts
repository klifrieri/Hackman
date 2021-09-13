import Moveable from "../Moveable";
import Coordinate from "../Coordinate";
import Direction from "../Direction";

abstract class BaseCharacter {
  private _name: string;
  public get name(): string {
    return this._name;
  }
  private _initialPosition: Coordinate;

  private _position: Coordinate;
  public set positionX(value: number) {
    this._position.x = value;
  }
  public set positionY(value: number) {
    this._position.y = value;
  }
  public get position(): Coordinate {
    return this._position;
  }
  protected _direction: Direction;
  public set direction(value: Direction) {
    this._direction = value;
  }
  public get direction(): Direction {
    return this._direction;
  }

  private _moveable: Moveable;
  public set moveable(value: Moveable) {
    if (value !== this._moveable) {
      this._moveable = value;
    }
  }
  public get moveable(): Moveable {
    return this._moveable;
  }

  public resetToStartPosition(y: number, x: number) {
    this._position.x = this._initialPosition.x + x;
    this._position.y = this._initialPosition.y + y;
  }
  constructor(name: string, positionY: number, positionX: number) {
    this._name = name;
    this._position = new Coordinate(positionY, positionX);
    this._initialPosition = new Coordinate(positionY, positionX);
    this._direction = Direction.Nothing;
    this._moveable = Moveable.No;
  }
} 
  export default BaseCharacter;