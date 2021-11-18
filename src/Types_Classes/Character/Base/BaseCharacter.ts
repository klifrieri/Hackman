import Moveable from "../Models/Moveable";
import Direction from "../Models/Direction";
import CharacterIdentifier from "../Models/CharacterIdentifier";
import CoordinateHandler from "./CoordinateHandler";
import { FC } from "react";
import Coin from "../../../Components/GameFieldComponent/FieldComponents/Path/Coin";
import Empty from "../../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import Snack from "../../../Components/GameFieldComponent/FieldComponents/Path/Snack";
import BlueGhost from "../../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import GreenGhost from "../../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import OrangeGhost from "../../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import RedGhost from "../../../Components/GameFieldComponent/GhostComponents/RedGhost";
import Coordinate from "../Models/Coordinate";
import Gate from "../../../Components/GameFieldComponent/FieldComponents/Path/Gate";
import Hackman from "../../../Components/GameFieldComponent/HackmanComponent/Hackman";

abstract class BaseCharacter extends CoordinateHandler {
  protected _name: CharacterIdentifier;
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

  protected _moveable: Moveable;
  public set moveable(value: Moveable) {
    if (value !== this._moveable) {
      this._moveable = value;
    }
  }
  public get moveable(): Moveable {
    return this._moveable;
  }

  protected _lastPosition:Coordinate;
  public get lastPosition(): Coordinate {
    return this._lastPosition;
  }

  constructor(name: CharacterIdentifier, positionY: number, positionX: number) {
    super(positionY, positionX);
    this._name = name;
    this._direction = Direction.Nothing;
    this._moveable = Moveable.No;
    this._lastPosition = new Coordinate(positionY,positionX);
    this._moveableYesComponents = [Hackman,Coin, Empty, Snack, BlueGhost, RedGhost, OrangeGhost, GreenGhost];
    this._moveableNoComponentsForGhosts = [BlueGhost, RedGhost, OrangeGhost, GreenGhost];
  }

  public override resetToStartPosition() {
    super.resetToStartPosition();
    this.moveable = Moveable.No;
    this._direction = Direction.Nothing;
    this._lastPosition = new Coordinate(this._initialPosition.y,this._initialPosition.x);
  }


  private _moveableYesComponents: FC<any>[];
  private _moveableNoComponentsForGhosts: FC<any>[];
  public determineIfMoveable(gameField: FC<any>[][]):void{
    switch (this._direction) {
      case Direction.Up: {
        this._moveable = this.canMoveUp(gameField);
        break;
      }
      case Direction.Left: {
        this._moveable = this.canMoveLeft(gameField);
        break;
      }
      case Direction.Down: {
        this._moveable = this.canMoveDown(gameField);
        break;
      }
      case Direction.Right: {
        this._moveable = this.canMoveRight(gameField);
        break;
      }
      default:
        this._moveable = Moveable.No;
    }
  }


  protected canMoveUp(gameField: FC<any>[][]): Moveable {
    let positionValue = this._position.y - 1;
    if (gameField[positionValue] === undefined) {
      return Moveable.Portal;
    }
    else if (this._name !== CharacterIdentifier.Hackman && this._moveableNoComponentsForGhosts.includes(gameField[positionValue][this._position.x])) {
      return Moveable.No;
    }
    else if (this._moveableYesComponents.includes(gameField[positionValue][this._position.x]) || gameField[positionValue][this._position.x] === Gate) {
      return Moveable.Yes;
    }
    else {
      return Moveable.No;
    }
  }

  protected canMoveDown(gameField: FC<any>[][]): Moveable {
    let positionValue = this._position.y + 1;
    if (gameField[positionValue] === undefined) {
      return Moveable.Portal;
    }
    else if (this._name !== CharacterIdentifier.Hackman && this._moveableNoComponentsForGhosts.includes(gameField[positionValue][this._position.x])) {
      return Moveable.No;
    }
    else if (this._moveableYesComponents.includes(gameField[positionValue][this._position.x])) {
      return Moveable.Yes;
    }
    else {
      return Moveable.No;
    }
  }

  protected canMoveLeft(gameField: FC<any>[][]): Moveable {
    let positionValue = this._position.x - 1;
    if (gameField[this._position.y][positionValue] === undefined) {
      return Moveable.Portal;
    }
    else if (this._name !== CharacterIdentifier.Hackman && this._moveableNoComponentsForGhosts.includes(gameField[this._position.y][positionValue])) {
      return Moveable.No;
    }
    else if (this._moveableYesComponents.includes(gameField[this._position.y][positionValue])) {
      return Moveable.Yes;
    }
    else {
      return Moveable.No;
    }
  }

  protected canMoveRight(gameField: FC<any>[][]): Moveable {
    let positionValue = this._position.x + 1;
    if (gameField[this._position.y][positionValue] === undefined) {
      return Moveable.Portal;
    }
    else if (this._name !== CharacterIdentifier.Hackman && this._moveableNoComponentsForGhosts.includes(gameField[this._position.y][positionValue])) {
      return Moveable.No;
    }
    else if (this._moveableYesComponents.includes(gameField[this._position.y][positionValue])) {
      return Moveable.Yes;
    }
    else {
      return Moveable.No;
    }
  }

  public changeCharacterPosition():void{
   this._lastPosition = new Coordinate(this._position.y,this._position.x);
    // this._lastPosition.y = this._position.y;
    // this._lastPosition.x = this._position.x;
    
    if (this._moveable === Moveable.Yes) {
      switch (this._direction) {
        case Direction.Up: {
          this.moveUp();
          break;
        }
        case Direction.Right: {
          this.moveRight();
          break;
        }
        case Direction.Down: {
          this.moveDown();
          break;
        }
        case Direction.Left: {
          this.moveLeft();
          break;
        }
      }
    }
    else if (this._moveable === Moveable.Portal) {
      switch (this._direction) {
        case Direction.Right: {
          this.moveRightTroughPortal();
          break;
        }
        case Direction.Left: {
          this.moveLeftTroughPortal();
          break;
        }
      }
    }
  };
}

export default BaseCharacter;