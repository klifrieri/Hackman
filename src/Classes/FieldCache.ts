import Koordinate from "../Types/Koordinate"

class FieldCache{
    private _position:Koordinate;
    public get position(){
        return this._position;
    }
    public set setPosition(value:Koordinate){
    this._position = value;
    }
    public set setPositionX(value:number){
    this._position.x = value;
    }
    public set setPositionY(value:number){
    this._position.y = value;
    }
    private _fieldType:React.FC<{}>;
    public get fieldType(){
        return this._fieldType;
    }
    public set setFieldType(value:React.FC<{}>){
    this._fieldType = value;
    }
    constructor(position:Koordinate,fieldType:React.FC<{}>){
        this._position = position;
        this._fieldType = fieldType;
    }
}

export default FieldCache