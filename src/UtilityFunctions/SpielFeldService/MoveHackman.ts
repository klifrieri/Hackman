import Character from "../../Classes/Character";
import Empty from "../../Components/Empty";
import Hackman from "../../Components/Hackman";
import Moveable from "../../Types/Moveable";
import Direction from "../../Types/Direction";
import EventEmitter from "events";
import { checkCoins } from "./CanMove";


function hackmanMovesUp(spielFeldCopy: React.FC<{}>[][], hackman: Character): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y - 1][hackman.getPosition.x] = Hackman;
  hackman.setPositionY = hackman.getPosition.y - 1;
  return spielFeldCopy;
}

function hackmanMovesRight(spielFeldCopy: React.FC<{}>[][], hackman: Character): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x + 1] = Hackman;
  hackman.setPositionX = hackman.getPosition.x + 1;
  return spielFeldCopy;
}

function hackmanMovesDown(spielFeldCopy: React.FC<{}>[][], hackman: Character): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y + 1][hackman.getPosition.x] = Hackman;
  hackman.setPositionY = hackman.getPosition.y + 1;
  return spielFeldCopy;
}

function hackmanMovesLeft(spielFeldCopy: React.FC<{}>[][], hackman: Character): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x - 1] = Hackman;
  hackman.setPositionX = hackman.getPosition.x - 1;
  return spielFeldCopy;
}

function hackmanMovesUpTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: Character): React.FC<{}>[][] {
    spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
    spielFeldCopy[spielFeldCopy.length - 1][hackman.getPosition.x] = Hackman;
    hackman.setPositionY = spielFeldCopy.length - 1;
    return spielFeldCopy;
}

function hackmanMovesRightTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: Character): React.FC<{}>[][]{
    spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
    spielFeldCopy[hackman.getPosition.y][0] = Hackman;
    hackman.setPositionX = 0;
    return spielFeldCopy;
}

function hackmanMovesLeftTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: Character): React.FC<{}>[][] {
    spielFeldCopy[hackman.getPosition.y][spielFeldCopy[0].length - 1] = Hackman;
    spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
    hackman.setPositionX = spielFeldCopy[0].length - 1;
    return spielFeldCopy;
}

function hackmanMovesDownTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: Character): React.FC<{}>[][] {
    spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
    spielFeldCopy[0][hackman.getPosition.x] = Hackman;
    hackman.setPositionY = 0;
    return spielFeldCopy;
}

function moveHackman(hackman:Character,spielFeldCopy:React.FC<{}>[][]): {spielFeldCopy:React.FC<{}>[][],increaseCoins:boolean}{    
  let increaseCoins:boolean=false; 
  switch (hackman.getBewegungsRichtung) {
    case Direction.Up: {
      if (hackman.getBewegungMoeglich === Moveable.Portal){
          spielFeldCopy = hackmanMovesUpTroughPortal(spielFeldCopy, hackman);
        }
      else if (hackman.getBewegungMoeglich === Moveable.Yes) {
        spielFeldCopy = hackmanMovesUp(spielFeldCopy, hackman);
          if(checkCoins(spielFeldCopy,Direction.Up,hackman.getPosition)){
            increaseCoins = true;
          }
        }
      break;
    }
    case Direction.Left: {
      if (hackman.getBewegungMoeglich === Moveable.Portal){
        spielFeldCopy = hackmanMovesLeftTroughPortal(spielFeldCopy, hackman);
      }

      else if (hackman.getBewegungMoeglich === Moveable.Yes) {
        spielFeldCopy = hackmanMovesLeft(spielFeldCopy, hackman);
        if(checkCoins(spielFeldCopy,Direction.Up,hackman.getPosition)){
          increaseCoins = true;
        }
      }
      break;
    }
    case Direction.Down: {
      if (hackman.getBewegungMoeglich === Moveable.Portal){
        spielFeldCopy = hackmanMovesDownTroughPortal(spielFeldCopy, hackman);
      }
      else if (hackman.getBewegungMoeglich === Moveable.Yes) {
        spielFeldCopy = hackmanMovesDown(spielFeldCopy, hackman);
        if(checkCoins(spielFeldCopy,Direction.Up,hackman.getPosition)){
          increaseCoins = true;
        }
      }
      break;
    }
    case Direction.Right: {
      if (hackman.getBewegungMoeglich === Moveable.Portal){
        spielFeldCopy = hackmanMovesRightTroughPortal(spielFeldCopy, hackman);
      }
      
      else if (hackman.getBewegungMoeglich === Moveable.Yes) {
        spielFeldCopy = hackmanMovesRight(spielFeldCopy, hackman);
        if(checkCoins(spielFeldCopy,Direction.Up,hackman.getPosition)){
          increaseCoins = true;
        }
      }
      break;
    }
  }
  return {spielFeldCopy,increaseCoins};
};

export {hackmanMovesDownTroughPortal,hackmanMovesDown,hackmanMovesRightTroughPortal,hackmanMovesRight,hackmanMovesUpTroughPortal,hackmanMovesUp,hackmanMovesLeftTroughPortal,hackmanMovesLeft,moveHackman};