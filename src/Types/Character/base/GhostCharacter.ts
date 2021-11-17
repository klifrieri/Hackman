import { FC } from "react";
import Empty from "../../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import BlueGhost from "../../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import GreenGhost from "../../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import OrangeGhost from "../../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import RedGhost from "../../../Components/GameFieldComponent/GhostComponents/RedGhost";
import Hackman from "../../../Components/GameFieldComponent/HackmanComponent/Hackman";
import CustomTimerForGhostEdible from "../../../UtilityFunctions/Interval_And_Timer/CustomTimerForGhostEdible";
import CharacterIdentifier from "../../CharacterIdentifier";
import Direction from "../../Direction";
import Moveable from "../../Moveable";
import BaseCharacter from "./BaseCharacter";
import IGhostAI from "./IGhostAI";

abstract class GhostCharacter extends BaseCharacter implements IGhostAI {
  protected _inCage: boolean;
  public set inCage(value: boolean) {
    this._inCage = value;
  }
  public get inCage() {
    return this._inCage;
  }

  private _shallTick: boolean;
  public set shallTick(value: boolean) {
    this._shallTick = value;
  }
  public get shallTick(): boolean {
    return this._shallTick;
  }

  protected _isEdible: boolean;
  private _isEdibleTimeout: CustomTimerForGhostEdible;
  public get isEdible(): boolean {
    return this._isEdible;
  }
  public set isEdible(value: boolean) {
    this._isEdible = value;
    if (this._isEdible)
      this._isEdibleTimeout.start();
    else
      this._isEdibleTimeout.stop();
  }

  private _gotEaten: boolean;
  public get gotEaten() {
    return this._gotEaten
  }
  public set gotEaten(value: boolean) {
    this._gotEaten = value;
  }

  protected _lastCachedField: FC<any>;
  public get lastCachedField() {
    return this._lastCachedField;
  }
  protected _cachedField: FC<any>;
  public get cachedField() {
    return this._cachedField;
  }
  constructor(name: CharacterIdentifier, positionY: number, positionX: number) {
    super(name, positionY, positionX);
    this._inCage = true;
    this._shallTick = false;
    this._isEdible = false;
    this._isEdibleTimeout = new CustomTimerForGhostEdible(
      () => (this.isEdible = false),
      15000
    );
    this._gotEaten = false;
    this._lastCachedField = Empty;
    this._cachedField = Empty;
  }

  public override resetToStartPosition(): void {
    super.resetToStartPosition();
    this._inCage = true;
    this._shallTick = false;
    this._isEdible = false;
    this._isEdibleTimeout.stop();
    this._gotEaten = true;
    this._lastCachedField = Empty;
    this._cachedField = Empty;
  }

  protected goOutOfCage(gameField: FC<any>[][]): void {
    let outsideOfTheCagePositionY = 5;
    this._lastPosition.y = this._position.y;
    this._lastPosition.x = this._position.x;
    if (this._position.y === outsideOfTheCagePositionY) {
      this.inCage = false;
    }
    let middleOfCagePositionX = 10;
    if (this._position.x !== middleOfCagePositionX) {
      if (this.canMoveLeft(gameField) === Moveable.Yes) {
        this._direction = Direction.Left;
        this.moveLeft();
      }
      else if (this.canMoveRight(gameField) === Moveable.Yes) {
        this._direction = Direction.Right;
        this.moveRight()
      }
      else if (this.canMoveUp(gameField) === Moveable.Yes) {
        this._direction = Direction.Up;
        this.moveUp();
      }
      else if (this.canMoveDown(gameField) === Moveable.Yes) {
        this._direction = Direction.Down;
        this.moveDown();
      }
    }
    else {
      if (this.canMoveUp(gameField) === Moveable.Yes) {
        this._direction = Direction.Up;
        this.moveUp();
      }
    }
  }
  protected setTemporaryGameField(gameField: FC<any>[][]): FC<any>[][] {
    gameField[this._lastPosition.y][this._lastPosition.x] = this._cachedField;
    this._lastCachedField = this._cachedField;
    if (gameField[this._position.y][this._position.x] !== Hackman) {
      this._cachedField = gameField[this._position.y][this._position.x];
    }
    switch (this._name) {
      case CharacterIdentifier.GreenGhost:
        gameField[this._position.y][this._position.x] = GreenGhost;
        break;
      case CharacterIdentifier.RedGhost:
        gameField[this._position.y][this._position.x] = RedGhost;
        break;
      case CharacterIdentifier.OrangeGhost:
        gameField[this._position.y][this._position.x] = OrangeGhost;
        break;
      case CharacterIdentifier.BlueGhost:
        gameField[this._position.y][this._position.x] = BlueGhost;
        break;
    }
    return gameField;
  }
  public abstract determineNextMove(gameField: FC<any>[][]): FC<any>[][];
}

export default GhostCharacter;