import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import CustomTimerForGhostEdible from "../../UtilityFunctions/Interval_And_Timer/CustomTimerForGhostEdible";
import MovementDirection from "../MovementDirection";
import Character from "./BaseCharacter";

class GhostCharacter extends Character {

  private _isSmart: boolean;
  public set isSmart(value: boolean) {
    this._isSmart = value;
  }
  public get isSmart():boolean {
    return this._isSmart;
  }
  
  private _shallTick: boolean;
  public set shallTick(value: boolean) {
    this._shallTick = value;
  }
  public get shallTick(): boolean {
    return this._shallTick;
  }

  private _isEdibleTimeout: CustomTimerForGhostEdible;
  private _isEdible: boolean;
  public set isEdible(value: boolean) {
    this._isEdible = value;
    if (this._isEdible)
      this._isEdibleTimeout.start();
    else
      this._isEdibleTimeout.stop();
  }
  public get isEdible(): boolean {
    return this._isEdible;
  }

  // smart move properties


  // dumb move properties
  private _declaredCount: number;
  public set declaredCount(value: number) {
    this._declaredCount = value;
    this.resetCount();
  }

  private _count: number;
  public incrementCount() {
    this._count++;
  }
  private resetCount() {
    this._count = 0;
  }
  public needsNewCountDeclaration(): boolean {
    return this._declaredCount === this._count;
  }


  private _cachedField: React.FC<{}>;
  public get cachedField() {
    return this._cachedField;
  }
  public set cachedField(value: React.FC<{}>) {
    this._cachedField = value;
  }

  private _movementDirection: MovementDirection;
  public get movementDirection() {
    return this._movementDirection;
  }
  public set movementDirection(value: MovementDirection) {
    this._movementDirection = value;
  }


  public override resetToStartPosition(y: number, x: number) {
    super.resetToStartPosition(y, x);
    this.isEdible = false;
    this._cachedField = Empty;
    this.resetCount();
    this.declaredCount = 0;
    this.shallTick = false;
    this._isEdibleTimeout.stop();
  }

  constructor(name: string, positionY: number, positionX: number, movementDirection: MovementDirection = MovementDirection.None, isSmart: boolean = false) {
    super(name, positionY, positionX);
    this._isEdibleTimeout = new CustomTimerForGhostEdible(
      () => (this.isEdible = false),
      15000
    );
    this._shallTick = false;
    this._declaredCount = 0;
    this._count = 0;
    this._cachedField = Empty;
    this._isEdible = false;
    this._movementDirection = movementDirection;
    this._isSmart = isSmart;
  }
}

export default GhostCharacter;