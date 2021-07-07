import Empty from "../Components/Empty";
import Ghost from "../Components/Ghost";
import BewegungMoeglich from "../Types/BewegungMoeglich";
import Koordinate from "../Types/Koordinate";
import Character from "./Character";

class GhostCharacter extends Character{
    private _shallTick:boolean;
    public set setShallTick(value:boolean){
      this._shallTick = value;
    }
    public get getShallTick() : boolean{
      return this._shallTick;
    }
    private _declaredCount: number;
    public set setDeclaredCount(value:number){
      this._declaredCount = value;
      this.resetCount();
    }
    private _count: number;
    public incrementCount(){
      this._count++
    }
    private resetCount(){
      this._count = 0;
    }
    public needsNewCountDeclaration():boolean{
      return this._declaredCount === this._count;
    }
    private _cachedField:React.FC<{}>;
    public get cachedField(){
      if(this._cachedField === Ghost)
      console.log(this._cachedField.name + "Und das " + this.getBewegungsRichtung);
        return this._cachedField;
    }
    public set setCachedField(value:React.FC<{}>){
    this._cachedField = value;
    }
    constructor(name:string,position:Koordinate){
      super(name,position);
      console.log(this.getBewegungMoeglich);
      this._shallTick = false;
      this._declaredCount = 0;
      this._count = 0;
      this._cachedField = Empty;
    }
  }
  export default GhostCharacter;