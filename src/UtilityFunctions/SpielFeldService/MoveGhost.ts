import GhostCharacter from "../../Classes/GhostCharacter";
import Ghost from "../../Components/Ghost";
import Moveable from "../../Types/Moveable";
import Direction from "../../Types/Direction";
import Coordinate from "../../Types/Coordinate";

function ghostMovesRight(spielFeldCopy: React.FC<{}>[][],ghost: GhostCharacter): React.FC<{}>[][] {
    spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
    ghost.setCachedField = spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x + 1];
    spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x + 1] = Ghost;
    ghost.setPositionX = ghost.getPosition.x + 1;
    return spielFeldCopy;
}

function ghostMovesDown(spielFeldCopy: React.FC<{}>[][],ghost: GhostCharacter): React.FC<{}>[][] {
    spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
    ghost.setCachedField = spielFeldCopy[ghost.getPosition.y + 1][ghost.getPosition.x];
    spielFeldCopy[ghost.getPosition.y + 1][ghost.getPosition.x] = Ghost;
    ghost.setPositionY = ghost.getPosition.y + 1;
    return spielFeldCopy;
}

function ghostMovesLeft(spielFeldCopy: React.FC<{}>[][],ghost: GhostCharacter): React.FC<{}>[][] {
    spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
    ghost.setCachedField = spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x - 1];
    spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x - 1] = Ghost;
    ghost.setPositionX = ghost.getPosition.x - 1;
    return spielFeldCopy;
}

function ghostMovesUp(spielFeldCopy: React.FC<{}>[][],ghost: GhostCharacter): React.FC<{}>[][] {
    spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
    console.log("1 Hier WICHTIG !!! " + ghost.cachedField.name);
    ghost.setCachedField = spielFeldCopy[ghost.getPosition.y - 1][ghost.getPosition.x];
    console.log("2 Hier WICHTIG !!! " + ghost.cachedField.name);
    spielFeldCopy[ghost.getPosition.y - 1][ghost.getPosition.x] = Ghost;
    console.log("3 Hier WICHTIG !!! " + ghost.cachedField.name);

    ghost.setPosition = new Coordinate(ghost.getPosition.y - 1,ghost.getPosition.x);
    return spielFeldCopy;
}

function ghostMovesRightTroughPortal(spielFeldCopy: React.FC<{}>[][],ghost: GhostCharacter): React.FC<{}>[][] {
    ghost.setCachedField = spielFeldCopy[ghost.getPosition.y][0];
    spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
    spielFeldCopy[ghost.getPosition.y][0] = Ghost;
    ghost.setPositionX = 0;
    return spielFeldCopy;
}

function ghostMovesDownTroughPortal(spielFeldCopy: React.FC<{}>[][],ghost: GhostCharacter): React.FC<{}>[][] {
    spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
    ghost.setCachedField = spielFeldCopy[0][ghost.getPosition.x];
    spielFeldCopy[0][ghost.getPosition.x] = Ghost;
    ghost.setPositionY = 0;
    return spielFeldCopy;
}

function ghostMovesLeftTroughPortal(spielFeldCopy: React.FC<{}>[][],ghost: GhostCharacter): React.FC<{}>[][] {
    spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
    ghost.setCachedField = spielFeldCopy[ghost.getPosition.y][spielFeldCopy[0].length - 1];
    spielFeldCopy[ghost.getPosition.y][spielFeldCopy[0].length - 1] = Ghost;
    ghost.setPositionX = spielFeldCopy[0].length - 1;
    return spielFeldCopy;
}

function ghostMovesUpTroughPortal(spielFeldCopy: React.FC<{}>[][],ghost: GhostCharacter): React.FC<{}>[][] {
    spielFeldCopy[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
    ghost.setCachedField = spielFeldCopy[spielFeldCopy.length - 1][ghost.getPosition.x];
    spielFeldCopy[spielFeldCopy.length - 1][ghost.getPosition.x] = Ghost;
    ghost.setPositionY = spielFeldCopy.length - 1;
    return spielFeldCopy;
}

function moveGhost(ghost:GhostCharacter,spielFeldCopy:React.FC<{}>[][])
{
  ghost.incrementCount();
  if(ghost.getBewegungMoeglich === Moveable.Yes){
    switch(ghost.getBewegungsRichtung){
      case Direction.Up:{
        spielFeldCopy = ghostMovesUp(spielFeldCopy,ghost);
        break;
      }
      case Direction.Down:{
        spielFeldCopy = ghostMovesDown(spielFeldCopy,ghost);
        break;
      }
      case Direction.Left:{
        spielFeldCopy = ghostMovesLeft(spielFeldCopy,ghost);
        break;
      }
      case Direction.Right:{
        spielFeldCopy = ghostMovesRight(spielFeldCopy,ghost);
        break;
      }
    }
  }
  else if(ghost.getBewegungMoeglich === Moveable.Portal){
    switch(ghost.getBewegungsRichtung){
      case Direction.Up:{
        spielFeldCopy = ghostMovesUpTroughPortal(spielFeldCopy,ghost);
        break;
      }
      case Direction.Down:{
        spielFeldCopy = ghostMovesDownTroughPortal(spielFeldCopy,ghost);
        break;
      }
      case Direction.Left:{
        spielFeldCopy = ghostMovesLeftTroughPortal(spielFeldCopy,ghost);
        break;
      }
      case Direction.Right:{
        spielFeldCopy = ghostMovesRightTroughPortal(spielFeldCopy,ghost);
        break;
      }
    }
  }
    return spielFeldCopy;
}

export {ghostMovesDown,ghostMovesDownTroughPortal,ghostMovesLeft,ghostMovesLeftTroughPortal,ghostMovesRight,ghostMovesRightTroughPortal,ghostMovesUp,ghostMovesUpTroughPortal,moveGhost};