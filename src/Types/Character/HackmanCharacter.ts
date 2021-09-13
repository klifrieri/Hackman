import Direction from "../Direction";
import BaseCharacter from "./BaseCharacter";

class HackmanCharacter extends BaseCharacter {
private _remainingLifes:number;
public get remainingLifes():number{
    return this._remainingLifes;
}
private _hackmanMoved:boolean;
public get hackmanMoved():boolean{
  return this._hackmanMoved;
}
public set hackmanMoved(value:boolean){
  this._hackmanMoved = value;
}
public override resetToStartPosition(y: number, x: number) {
    super.resetToStartPosition(y, x);
    --this._remainingLifes;
    this._direction = Direction.Nothing;
  }
  constructor(name: string, positionY: number, positionX: number) {
    super(name,positionY,positionX);
    this._hackmanMoved = false;
    this._remainingLifes = 3;
  }
} 
  export default HackmanCharacter;