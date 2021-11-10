import Moveable from "../Moveable";
import Coordinate from "../Coordinate";
import Direction from "../Direction";
import CharacterIdentifier from "../CharacterIdentifier";

abstract class BaseCharacter {
  private _name: CharacterIdentifier;
  public get name(): CharacterIdentifier {
    return this._name;
  }
  private _initialPosition: Coordinate;

  protected _position: Coordinate;
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

  public resetToStartPosition() {
    this._position.x = this._initialPosition.x;
    this._position.y = this._initialPosition.y;
    this.moveable = Moveable.No;
    this._direction = Direction.Nothing;
  }
  constructor(name: CharacterIdentifier, positionY: number, positionX: number) {
    this._name = name;
    this._position = new Coordinate(positionY, positionX);
    this._initialPosition = new Coordinate(positionY, positionX);
    this._direction = Direction.Nothing;
    this._moveable = Moveable.No;
  }
} 
  export default BaseCharacter;