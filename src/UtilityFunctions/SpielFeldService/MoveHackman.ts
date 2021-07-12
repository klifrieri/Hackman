import Character from "../../Classes/Character";
import Empty from "../../Components/Empty";
import Hackman from "../../Components/Hackman";
import Moveable from "../../Types/Moveable";
import Direction from "../../Types/Direction";


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

function moveHackman(hackman:Character,spielFeldCopy:React.FC<{}>[][]): React.FC<{}>[][]{     
  switch (hackman.getBewegungsRichtung) {
    case Direction.Up: {
      if (hackman.getBewegungMoeglich === Moveable.Portal){
          hackmanMovesUpTroughPortal(spielFeldCopy, hackman);
        }
      else if (hackman.getBewegungMoeglich === Moveable.Yes) {
          hackmanMovesUp(spielFeldCopy, hackman);
        }
      break;
    }
    case Direction.Left: {
      if (hackman.getBewegungMoeglich === Moveable.Portal){
        hackmanMovesLeftTroughPortal(spielFeldCopy, hackman);
      }

      else if (hackman.getBewegungMoeglich === Moveable.Yes) {
        hackmanMovesLeft(spielFeldCopy, hackman);
      }
      break;
    }
    case Direction.Down: {
      if (hackman.getBewegungMoeglich === Moveable.Portal){
        hackmanMovesDownTroughPortal(spielFeldCopy, hackman);
      }
      else if (hackman.getBewegungMoeglich === Moveable.Yes) {
        hackmanMovesDown(spielFeldCopy, hackman);
      }
      break;
    }
    case Direction.Right: {
      if (hackman.getBewegungMoeglich === Moveable.Portal){
        hackmanMovesRightTroughPortal(spielFeldCopy, hackman);
      }
      
      else if (hackman.getBewegungMoeglich === Moveable.Yes) {
        hackmanMovesRight(spielFeldCopy, hackman);
      }
      break;
    }
  }
  return spielFeldCopy;
};

export {hackmanMovesDownTroughPortal,hackmanMovesDown,hackmanMovesRightTroughPortal,hackmanMovesRight,hackmanMovesUpTroughPortal,hackmanMovesUp,hackmanMovesLeftTroughPortal,hackmanMovesLeft,moveHackman};