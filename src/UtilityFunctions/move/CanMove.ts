import Coin from "./../../Components/GameFieldComponent/FieldComponents/Path/Coin";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import Ghost1 from "../../Components/GameFieldComponent/GhostComponents/Ghost1";
import Ghost2 from "../../Components/GameFieldComponent/GhostComponents/Ghost2";
import Ghost3 from "../../Components/GameFieldComponent/GhostComponents/Ghost3";
import Ghost4 from "../../Components/GameFieldComponent/GhostComponents/Ghost4";
import Snack from "../../Components/GameFieldComponent/FieldComponents/Path/Snack";
import Moveable from "../../Types/Moveable";
import Coordinate from "../../Types/Coordinate";
import Direction from "../../Types/Direction";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import CoinValue from "../../Types/CoinValue";

function canMoveUp(spielFeld:React.FC<{}>[][],position:Coordinate):Moveable{
  let positionValue = position.y - 1;
  if (spielFeld[positionValue] === undefined) return Moveable.Portal;
  else if (spielFeld[positionValue][position.x] === Empty ||
    spielFeld[positionValue][position.x] === Coin ||
    spielFeld[positionValue][position.x] === Snack)
    return Moveable.Yes;
    else if (spielFeld[positionValue][position.x] === Ghost1 ||spielFeld[positionValue][position.x] === Ghost2 ||spielFeld[positionValue][position.x] === Ghost3 ||spielFeld[positionValue][position.x] === Ghost4 || spielFeld[positionValue][position.x] === Hackman) return Moveable.No;
  else return Moveable.No;
}

function canMoveDown(spielFeld:React.FC<{}>[][],position:Coordinate):Moveable{
  let positionValue = position.y + 1;
  if (spielFeld[positionValue] === undefined) return Moveable.Portal;
  else if(spielFeld[positionValue][position.x] === Empty ||
    spielFeld[positionValue][position.x] === Coin ||
    spielFeld[positionValue][position.x] === Snack)
    return Moveable.Yes;
    else if (spielFeld[positionValue][position.x] === Ghost1 ||spielFeld[positionValue][position.x] === Ghost2 ||spielFeld[positionValue][position.x] === Ghost3 ||spielFeld[positionValue][position.x] === Ghost4 || spielFeld[positionValue][position.y] === Hackman)return Moveable.No;
  else return Moveable.No;   
}

function canMoveLeft(spielFeld:React.FC<{}>[][],position:Coordinate):Moveable{
  let positionValue = position.x - 1;
      if (spielFeld[position.y][positionValue] === undefined) return Moveable.Portal;
      else if (spielFeld[position.y][positionValue] === Empty ||
        spielFeld[position.y][positionValue] === Coin ||
        spielFeld[position.y][positionValue] === Snack)
        return Moveable.Yes;
      else if (spielFeld[position.y][positionValue] === Ghost1 ||spielFeld[position.y][positionValue] === Ghost2 ||spielFeld[position.y][positionValue] === Ghost3 ||spielFeld[position.y][positionValue] === Ghost4 || spielFeld[position.y][positionValue] === Hackman)  return Moveable.No;
      else return Moveable.No;
}

function canMoveRight(spielFeld:React.FC<{}>[][],position:Coordinate):Moveable{
  let positionValue = position.x + 1;
if (spielFeld[position.y][positionValue] === undefined) return Moveable.Portal;
  else if (spielFeld[position.y][positionValue] === Empty ||
    spielFeld[position.y][positionValue] === Coin ||
    spielFeld[position.y][positionValue] === Snack)
    return Moveable.Yes;
  else if(spielFeld[position.y][positionValue] === Ghost1 ||spielFeld[position.y][positionValue] === Ghost2 ||spielFeld[position.y][positionValue] === Ghost3 ||spielFeld[position.y][positionValue] === Ghost4 || spielFeld[position.y][positionValue] === Hackman) return Moveable.No;
  else return Moveable.No;
}

function canMove(gameField:React.FC<{}>[][],position:Coordinate,direction:Direction,): Moveable{
  switch(direction){
    case Direction.Up:{
      return canMoveUp(gameField,position);
      }
    case Direction.Left: {
      return canMoveLeft(gameField,position);
    }
    case Direction.Down:{
      return canMoveDown(gameField,position);
    }
    case Direction.Right:{
      return canMoveRight(gameField,position);
    }
    default:
      return Moveable.No;
  }
}

function getPossibleDirections(spielFeld:React.FC<{}>[][],position:Coordinate):{direction: Direction;bewegungMoeglich: Moveable;}[]{
  let _canMoveUp = {
    direction: Direction.Up,
    bewegungMoeglich: canMoveUp(spielFeld,position)
  }
  let _canMoveDown = {
    direction: Direction.Down,
    bewegungMoeglich: canMoveDown(spielFeld,position)
  }
  let _canMoveLeft = {
    direction: Direction.Left,
    bewegungMoeglich: canMoveLeft(spielFeld,position)
  }
  let _canMoveRight = {
    direction: Direction.Right,
    bewegungMoeglich: canMoveRight(spielFeld,position)
  }

  let canMoveDirections: {direction: Direction;bewegungMoeglich: Moveable;}[] = [];

  if(_canMoveUp.bewegungMoeglich === Moveable.Yes || _canMoveUp.bewegungMoeglich === Moveable.Portal){
    canMoveDirections.push(_canMoveUp);
  }
  if(_canMoveDown.bewegungMoeglich === Moveable.Yes || _canMoveDown.bewegungMoeglich === Moveable.Portal){
    canMoveDirections.push(_canMoveDown);
  }
  if(_canMoveLeft.bewegungMoeglich === Moveable.Yes || _canMoveLeft.bewegungMoeglich === Moveable.Portal){
    canMoveDirections.push(_canMoveLeft);
  }
  if(_canMoveRight.bewegungMoeglich === Moveable.Yes || _canMoveRight.bewegungMoeglich === Moveable.Portal){
    canMoveDirections.push(_canMoveRight);
  }

  return canMoveDirections;
}

// returns the written statistical Value of the next Field by Direction
function isEdible(gameField:React.FC<{}>[][],direction:Direction,position:Coordinate): CoinValue{
  switch(direction){
    case Direction.Up:{
      if (gameField[position.y - 1][position.x] === Coin) return CoinValue.One;
      else if (gameField[position.y - 1][position.x] === Snack) return CoinValue.Five;
      else return CoinValue.Zero;
    }
    case Direction.Left: {
      if (gameField[position.y][position.x - 1] === Coin) return CoinValue.One;
      else if (gameField[position.y][position.x - 1] === Snack) return CoinValue.Five;
      else return CoinValue.Zero;
    }
    case Direction.Down:{
      if (gameField[position.y + 1][position.x] === Coin) return CoinValue.One;
      else if (gameField[position.y + 1][position.x] === Snack) return CoinValue.Five;
      else return CoinValue.Zero;
    }
    case Direction.Right:{
      if (gameField[position.y][position.x + 1] === Coin) return CoinValue.One;
      else if (gameField[position.y][position.x + 1] === Snack) return CoinValue.Five;
      else return CoinValue.Zero;
    }
    default:
      return CoinValue.Zero;
  }
}

export {canMove,canMoveRight,canMoveLeft,canMoveDown,canMoveUp,getPossibleDirections,isEdible};