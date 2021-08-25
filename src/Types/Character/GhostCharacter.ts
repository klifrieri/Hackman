import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import CustomTimerForGhostEdible from "../../UtilityFunctions/Interval_And_Timer/CustomTimerForGhostEdible";
import Character from "./Character";

class GhostCharacter extends Character{
    private _shallTick:boolean;
    public set shallTick(value:boolean){
      this._shallTick = value;
    };
    public get shallTick() : boolean{
      return this._shallTick;
    };
    private _isEdibleTimeout: CustomTimerForGhostEdible;
    private _isEdible:boolean;
    public set isEdible(value:boolean){
      this._isEdible = value;
      if(this._isEdible){
        this._isEdibleTimeout.start();
      }
    };
    public get isEdible() : boolean{
      return this._isEdible;
    };
    private _declaredCount: number;
    public set declaredCount(value:number){
      this._declaredCount = value;
      this.resetCount();
    };
    private _count: number;
    public incrementCount(){
      this._count++
    };
    private resetCount(){
      this._count = 0;
    };
    public needsNewCountDeclaration():boolean{
      return this._declaredCount === this._count;
    };
    private _cachedField:React.FC<{}>;
    public get cachedField(){
      return this._cachedField;
    };
    public set cachedField(value:React.FC<{}>){
    this._cachedField = value;
    };
    constructor(name:string,positionY:number,positionX:number){
      super(name,positionY,positionX);
      this._isEdibleTimeout = new CustomTimerForGhostEdible(()=>this.isEdible = false,15000);
      this._shallTick = false;
      this._declaredCount = 0;
      this._count = 0;
      this._cachedField = Empty;
      this._isEdible = false;
    }
  }
  export default GhostCharacter;