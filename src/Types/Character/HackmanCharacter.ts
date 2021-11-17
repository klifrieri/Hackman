import CharacterIdentifier from "../CharacterIdentifier";
import Coordinate from "../Coordinate";
import BaseCharacter from "./base/BaseCharacter";
import Observer from "./Observer/Observer";
import Subject from "./Observer/Subject";

class HackmanCharacter extends BaseCharacter implements Subject {
  private _remainingLifes: number;
  public get remainingLifes(): number {
    return this._remainingLifes;
  }
  public set remainingLifes(value: number) {
    this._remainingLifes = value;
  }

  private _hackmanMoved: boolean;
  public get hackmanMoved(): boolean {
    return this._hackmanMoved;
  }
  public set hackmanMoved(value: boolean) {
    this._hackmanMoved = value
  }

  private _canSetBlock: boolean
  public get canSetBlock(): boolean {
    return this._canSetBlock
  }
  public set canSetBlock(value: boolean) {
    this._canSetBlock = value
  }

  private _canJump: boolean
  public set canJump(value: boolean) {
    this._canJump = value
  }
  public get canJump(): boolean {
    return this._canJump
  }

  constructor(name: CharacterIdentifier, positionY: number, positionX: number) {
    super(name, positionY, positionX);
    this._hackmanMoved = false;
    this._remainingLifes = 3;
    this._canSetBlock = true;
    this._canJump = true;
    this._observers = [];
  }

  public override resetToStartPosition() {
    super.resetToStartPosition();
    this._hackmanMoved = false;
  }
  
  public resetToStartAndDecreaseLife() {
    this.resetToStartPosition();
    --this._remainingLifes;
  }

  public override changeCharacterPosition() {
    super.changeCharacterPosition();
    if (this._observers.length > 0) {
      this.notify();
    }
  }

  private _observers: Observer[];
  public attach(observer: Observer): void {
    const isExist = this._observers.includes(observer);
    if (!isExist) {
      this._observers.push(observer);
    }
  }
  public detach(observer: Observer): void {
    const observerIndex = this._observers.indexOf(observer);
    if (observerIndex !== -1) {
      this._observers.splice(observerIndex, 1);
    }
  }
  public notify(): void {
    for (const observer of this._observers) {
      observer.update(this);
    }
  }
}
export default HackmanCharacter;