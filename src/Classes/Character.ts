import { BehaviorSubject } from "rxjs";
import BewegungMoeglich from "../Types/BewegungMoeglich";
import Koordinate from "../Types/Koordinate";
import Richtung from "../Types/Richtung";

class Character{
    private _name: string;
    public get getName() : string{
      return this._name;
    }
    private _position :Koordinate;
    public set setPosition(value:Koordinate){
      this._position = value;
    }
    public set setPositionX(value:number){
      this._position.x = value;
    }
    public set setPositionY(value:number){
      this._position.y = value;
    }
    public get getPosition() : Koordinate{
      return this._position;
    }
  
    private _bewegungsRichtungSubject: BehaviorSubject<any>;
    public set setBewegungsRichtung(value:Richtung){
      this._bewegungsRichtungSubject.next(value);
    }
    public get getBewegungsRichtung() : Richtung{
      return this._bewegungsRichtungSubject.getValue();
    }
    public get getBewegungsRichtungSubject() : BehaviorSubject<any>{
      return this._bewegungsRichtungSubject;
    }
    
    private _bewegungMoeglich: BewegungMoeglich;
    public set setBewegungMoeglich(value:BewegungMoeglich){
      if(value !== this._bewegungMoeglich){
        this._bewegungMoeglich = value;
      }
    }
    public get getBewegungMoeglich() : BewegungMoeglich{
      return this._bewegungMoeglich;
    }
  
    constructor(name:string,position:Koordinate){
      this._name=name;
      this._position=position;
      this._bewegungsRichtungSubject = new BehaviorSubject(Richtung.Keine);
      this._bewegungMoeglich = BewegungMoeglich.Nein;
    }
  } 
  export default Character;