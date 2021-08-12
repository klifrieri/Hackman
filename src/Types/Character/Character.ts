import Moveable from "../Moveable";
import Coordinate from "../Coordinate";
import Direction from "../Direction";

class Character{
    private _name: string;
    public get name() : string{
      return this._name;
    }
    private _position :Coordinate;
    public set setPositionX(value:number){
      this._position.x = value;
    }
    public set positionY(value:number){
      this._position.y = value;
    }
    public get getPosition() : Coordinate{
      return this._position;
    }
    private _direction: Direction;
    public set setBewegungsRichtung(value:Direction){
      this._direction = value;
    }
    public get direction() : Direction{
      return this._direction;
    }
    
    private _moveable: Moveable;
    public set moveable(value:Moveable){
      if(value !== this._moveable){
        this._moveable = value;
      }
    }
    public get moveable() : Moveable{
      return this._moveable;
    }
  
    constructor(name:string,positionY:number,positionX:number){
      this._name = name;
      this._position=  new Coordinate(positionY,positionX);
      this._direction = Direction.Nothing;
      this._moveable = Moveable.No;
    }
  } 
  export default Character;