import { BehaviorSubject } from "rxjs";
import Moveable from "../Types/Moveable";
import Coordinate from "../Types/Coordinate";
import Direction from "../Types/Direction";

class Character{
    private _name: string;
    public get getName() : string{
      return this._name;
    }
    private _position :Coordinate;
    public set setPosition(value:Coordinate){
      this._position = value;
    }
    public set setPositionX(value:number){
      this._position.x = value;
    }
    public set setPositionY(value:number){
      this._position.y = value;
    }
    public get getPosition() : Coordinate{
      return this._position;
    }
  
    private _bewegungsRichtungSubject: BehaviorSubject<any>;
    public set setBewegungsRichtung(value:Direction){
      this._bewegungsRichtungSubject.next(value);
    }
    public get getBewegungsRichtung() : Direction{
      return this._bewegungsRichtungSubject.getValue();
    }
    public get getBewegungsRichtungSubject() : BehaviorSubject<any>{
      return this._bewegungsRichtungSubject;
    }
    
    private _bewegungMoeglich: Moveable;
    public set setBewegungMoeglich(value:Moveable){
      if(value !== this._bewegungMoeglich){
        this._bewegungMoeglich = value;
      }
    }
    public get getBewegungMoeglich() : Moveable{
      return this._bewegungMoeglich;
    }
  
    constructor(name:string,positionY:number,positionX:number){
      this._name=name;
      this._position=new Coordinate(positionY,positionX);
      this._bewegungsRichtungSubject = new BehaviorSubject(Direction.Nothing);
      this._bewegungMoeglich = Moveable.No;
    }
  } 
  export default Character;