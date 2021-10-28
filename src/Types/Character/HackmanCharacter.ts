import CharacterIdentifier from "../CharacterIdentifier";
import BaseCharacter from "./BaseCharacter";

class HackmanCharacter extends BaseCharacter {
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
    this._hackmanMoved = value;
  }
  private _canSetBlock: boolean
  public set canSetBlock(value: boolean) {
    this._canSetBlock = value
  }
  public get canSetBlock(): boolean {
    return this._canSetBlock
  }
  private _canJump: boolean
  public set canJump(value: boolean) {
    this._canJump = value
  }
  public get canJump(): boolean {
    return this._canJump
  }


  public override resetToStartPosition(y: number, x: number) {
    super.resetToStartPosition(y, x);
    this.hackmanMoved = false;
  }
  public resetToStartAndDecreaseLife() {
    this.resetToStartPosition(0, 0);
    --this._remainingLifes;
  }
  constructor(name: CharacterIdentifier, positionY: number, positionX: number) {
    super(name, positionY, positionX);
    this._hackmanMoved = false;
    this._remainingLifes = 3;
    this._canSetBlock = true;
    this._canJump = true;
  }
}
export default HackmanCharacter;