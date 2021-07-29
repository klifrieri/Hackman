import Coin from "../../Components/Coin";
import Empty from "../../Components/Empty";
import Ghost from "../../Components/Ghost";
import Snack from "../../Components/Snack";
import Moveable from "../../Types/Moveable";
import Coordinate from "../../Types/Coordinate";
import Direction from "../../Types/Direction";

function canMoveUp(spielFeld:React.FC<{}>[][],position:Coordinate):Moveable{
  let positionValue = position.y - 1;
  if (spielFeld[positionValue] === undefined) return Moveable.Portal;
  else if (spielFeld[positionValue][position.x] === Empty ||
    spielFeld[positionValue][position.x] === Coin ||
    spielFeld[positionValue][position.x] === Snack)
    return Moveable.Yes;
    else if (spielFeld[positionValue][position.x] === Ghost) return Moveable.No;
  else return Moveable.No;
}

function canMoveDown(spielFeld:React.FC<{}>[][],position:Coordinate):Moveable{
  let positionValue = position.y + 1;
  if (spielFeld[positionValue] === undefined) return Moveable.Portal;
  else if(spielFeld[positionValue][position.x] === Empty ||
    spielFeld[positionValue][position.x] === Coin ||
    spielFeld[positionValue][position.x] === Snack)
    return Moveable.Yes;
    else if (spielFeld[positionValue][position.x] === Ghost)return Moveable.No;
  else return Moveable.No;   
}

function canMoveLeft(spielFeld:React.FC<{}>[][],position:Coordinate):Moveable{
  let positionValue = position.x - 1;
      if (spielFeld[position.y][positionValue] === undefined) return Moveable.Portal;
      else if (spielFeld[position.y][positionValue] === Empty ||
        spielFeld[position.y][positionValue] === Coin ||
        spielFeld[position.y][positionValue] === Snack)
        return Moveable.Yes;
      else if (spielFeld[position.y][positionValue] === Ghost)  return Moveable.No;
      else return Moveable.No;
}

function canMoveRight(spielFeld:React.FC<{}>[][],position:Coordinate):Moveable{
  let positionValue = position.x + 1;
  if (spielFeld[position.y][positionValue] === undefined) return Moveable.Portal;
  else if (spielFeld[position.y][positionValue] === Empty ||
    spielFeld[position.y][positionValue] === Coin ||
    spielFeld[position.y][positionValue] === Snack)
    return Moveable.Yes;
  else if(spielFeld[position.y][positionValue] === Ghost) return Moveable.No;
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
  
function checkCoins(gameField:React.FC<{}>[][],direction:Direction,position:Coordinate): boolean{
  switch(direction){
    case Direction.Up:{
      return (gameField[position.y - 1][position.x] === Coin || gameField[position.y - 1][position.x] === Snack)
    }
    case Direction.Left: {
      return(gameField[position.y][position.x - 1] === Coin || gameField[position.y][position.x - 1] === Snack)
    }
    case Direction.Down:{
      return(gameField[position.y + 1][position.x] === Coin || gameField[position.y + 1][position.x] === Snack)
    }
    case Direction.Right:{
      return(gameField[position.y][position.x + 1] === Coin || gameField[position.y][position.x + 1] === Snack)
    }
    default:
      return false;
  }
}
  export {canMove,canMoveRight,canMoveLeft,canMoveDown,canMoveUp,getPossibleDirections,checkCoins};