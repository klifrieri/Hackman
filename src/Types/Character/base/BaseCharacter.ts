import Moveable from "../../Moveable";
import Direction from "../../Direction";
import CharacterIdentifier from "../../CharacterIdentifier";
import CoordinateHandler from "./CoordinateHandler";

abstract class BaseCharacter extends CoordinateHandler {
  private _name: CharacterIdentifier;
  public get name(): CharacterIdentifier {
    return this._name;
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

  constructor(name: CharacterIdentifier, positionY: number, positionX: number) {
    super(positionY, positionX);
    this._name = name;
    this._direction = Direction.Nothing;
    this._moveable = Moveable.No;
  }

  public override resetToStartPosition() {
    super.resetToStartPosition();
    this.moveable = Moveable.No;
    this._direction = Direction.Nothing;
  }
}
export default BaseCharacter;