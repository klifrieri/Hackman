import GhostCharacter from "../../Types/Character/GhostCharacter";
import Ghost1 from "../../Components/GameFieldComponent/GhostComponents/Ghost1";
import Ghost2 from "../../Components/GameFieldComponent/GhostComponents/Ghost2";
import Ghost3 from "../../Components/GameFieldComponent/GhostComponents/Ghost3";
import Ghost4 from "../../Components/GameFieldComponent/GhostComponents/Ghost4";
import Moveable from "../../Types/Moveable";
import Direction from "../../Types/Direction";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import HackmanCharacter from "../../Types/Character/HackmanCharacter";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import SpielfeldLayout from "../../SpielfeldLayout";
import EventEmitter from "events";

import { canMoveDown, canMoveLeft, canMoveRight, canMoveUp } from "./CanMove";

const emitter = new EventEmitter();

function ghostMovesRight(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  if (gameField[ghost.position.y][ghost.position.x + 1] === Hackman) {
    ghost.cachedField = Empty;
  } else {
    ghost.cachedField = gameField[ghost.position.y][ghost.position.x + 1];
  }
  switch (ghost.name) {
    case "Ghost1":
      gameField[ghost.position.y][ghost.position.x + 1] = Ghost1;
      break;
    case "Ghost2":
      gameField[ghost.position.y][ghost.position.x + 1] = Ghost2;
      break;
    case "Ghost3":
      gameField[ghost.position.y][ghost.position.x + 1] = Ghost3;
      break;
    case "Ghost4":
      gameField[ghost.position.y][ghost.position.x + 1] = Ghost4;
      break;
    default:
      break;
  }
  ghost.positionX = ghost.position.x + 1;
  return gameField;
}

function ghostMovesDown(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  if (gameField[ghost.position.y + 1][ghost.position.x] === Hackman) {
    ghost.cachedField = Empty;
  } else {
    ghost.cachedField = gameField[ghost.position.y + 1][ghost.position.x];
  }
  switch (ghost.name) {
    case "Ghost1":
      gameField[ghost.position.y + 1][ghost.position.x] = Ghost1;
      break;
    case "Ghost2":
      gameField[ghost.position.y + 1][ghost.position.x] = Ghost2;
      break;
    case "Ghost3":
      gameField[ghost.position.y + 1][ghost.position.x] = Ghost3;
      break;
    case "Ghost4":
      gameField[ghost.position.y + 1][ghost.position.x] = Ghost4;
      break;
    default:
      break;
  }
  ghost.positionY = ghost.position.y + 1;
  return gameField;
}

function ghostMovesLeft(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  if (gameField[ghost.position.y][ghost.position.x - 1] === Hackman) {
    ghost.cachedField = Empty;
  } else {
    ghost.cachedField = gameField[ghost.position.y][ghost.position.x - 1];
  }
  switch (ghost.name) {
    case "Ghost1":
      gameField[ghost.position.y][ghost.position.x - 1] = Ghost1;
      break;
    case "Ghost2":
      gameField[ghost.position.y][ghost.position.x - 1] = Ghost2;
      break;
    case "Ghost3":
      gameField[ghost.position.y][ghost.position.x - 1] = Ghost3;
      break;
    case "Ghost4":
      gameField[ghost.position.y][ghost.position.x - 1] = Ghost4;
      break;
    default:
      break;
  }
  ghost.positionX = ghost.position.x - 1;
  return gameField;
}

function ghostMovesUp(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  if (gameField[ghost.position.y - 1][ghost.position.x] === Hackman) {
    ghost.cachedField = Empty;
  } else {
    ghost.cachedField = gameField[ghost.position.y - 1][ghost.position.x];
  }
  switch (ghost.name) {
    case "Ghost1":
      gameField[ghost.position.y - 1][ghost.position.x] = Ghost1;
      break;
    case "Ghost2":
      gameField[ghost.position.y - 1][ghost.position.x] = Ghost2;
      break;
    case "Ghost3":
      gameField[ghost.position.y - 1][ghost.position.x] = Ghost3;
      break;
    case "Ghost4":
      gameField[ghost.position.y - 1][ghost.position.x] = Ghost4;
      break;
    default:
      break;
  }
  ghost.positionY = ghost.position.y - 1;
  return gameField;
}

function ghostMovesRightTroughPortal(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  ghost.cachedField = gameField[ghost.position.y][0];
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  switch (ghost.name) {
    case "Ghost1":
      gameField[ghost.position.y][0] = Ghost1;
      break;
    case "Ghost2":
      gameField[ghost.position.y][0] = Ghost2;
      break;
    case "Ghost3":
      gameField[ghost.position.y][0] = Ghost3;
      break;
    case "Ghost4":
      gameField[ghost.position.y][0] = Ghost4;
      break;
    default:
      break;
  }
  ghost.positionX = 0;
  return gameField;
}

function ghostMovesDownTroughPortal(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  ghost.cachedField = gameField[0][ghost.position.x];
  switch (ghost.name) {
    case "Ghost1":
      gameField[0][ghost.position.x] = Ghost1;
      break;
    case "Ghost2":
      gameField[0][ghost.position.x] = Ghost2;
      break;
    case "Ghost3":
      gameField[0][ghost.position.x] = Ghost3;
      break;
    case "Ghost4":
      gameField[0][ghost.position.x] = Ghost4;
      break;
    default:
      break;
  }
  ghost.positionY = 0;
  return gameField;
}

function ghostMovesLeftTroughPortal(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  ghost.cachedField = gameField[ghost.position.y][gameField[0].length - 1];
  switch (ghost.name) {
    case "Ghost1":
      gameField[ghost.position.y][gameField[0].length - 1] = Ghost1;
      break;
    case "Ghost2":
      gameField[ghost.position.y][gameField[0].length - 1] = Ghost2;
      break;
    case "Ghost3":
      gameField[ghost.position.y][gameField[0].length - 1] = Ghost3;
      break;
    case "Ghost4":
      gameField[ghost.position.y][gameField[0].length - 1] = Ghost4;
      break;
    default:
      break;
  }
  ghost.positionX = gameField[0].length - 1;
  return gameField;
}

function ghostMovesUpTroughPortal(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  ghost.cachedField = gameField[gameField.length - 1][ghost.position.x];
  switch (ghost.name) {
    case "Ghost1":
      gameField[gameField.length - 1][ghost.position.x] = Ghost1;
      break;
    case "Ghost2":
      gameField[gameField.length - 1][ghost.position.x] = Ghost2;
      break;
    case "Ghost3":
      gameField[gameField.length - 1][ghost.position.x] = Ghost3;
      break;
    case "Ghost4":
      gameField[gameField.length - 1][ghost.position.x] = Ghost4;
      break;
    default:
      break;
  }
  ghost.positionY = gameField.length - 1;
  return gameField;
}

function ghostEatsHackman(
  gameField: React.FC<any>[][],
  ghosts: WritableDraft<GhostCharacter>[],
  hackman: WritableDraft<HackmanCharacter>
) {
  let gameFieldCopy = gameField.slice();

  ghosts.forEach((ghost: WritableDraft<GhostCharacter>) => {
    gameFieldCopy[ghost.position.y][ghost.position.x] = ghost.cachedField;
    ghost.resetToStartPosition(0, 0);
    switch (ghost.name) {
      case "Ghost1":
        gameFieldCopy[ghost.position.y][ghost.position.x] = Ghost1;
        break;
      case "Ghost2":
        gameFieldCopy[ghost.position.y][ghost.position.x] = Ghost2;
        break;
      case "Ghost3":
        gameFieldCopy[ghost.position.y][ghost.position.x] = Ghost3;
        break;
      case "Ghost4":
        gameFieldCopy[ghost.position.y][ghost.position.x] = Ghost4;
        break;
    }
  });
  let cachedHackmanPositionX: number = hackman.position.x;
  let cachedHackmanPositionY: number = hackman.position.y;
  hackman.hackmanMoved = false;
  hackman.resetToStartAndDecreaseLife();
  if (hackman.remainingLifes > 0) {
    gameFieldCopy[hackman.position.y][hackman.position.x] = Hackman;
    gameFieldCopy[cachedHackmanPositionY][cachedHackmanPositionX] = Empty;
  } else {
    gameFieldCopy = SpielfeldLayout();
  }

  return gameFieldCopy;
}

function InvokeMoveGhostByDirection(gameField: React.FC<any>[][], ghost: WritableDraft<GhostCharacter>,) {
  switch (ghost.direction) {
    case Direction.Up: {
      gameField = ghostMovesUp(gameField, ghost);
      break;
    }
    case Direction.Down: {
      gameField = ghostMovesDown(gameField, ghost);
      break;
    }
    case Direction.Left: {
      gameField = ghostMovesLeft(gameField, ghost);
      break;
    }
    case Direction.Right: {
      gameField = ghostMovesRight(gameField, ghost);
      break;
    }
  }
  return gameField;
}

//#region move ghost methods
function moveGhostDumb(gameField: React.FC<any>[][], actualGhost: WritableDraft<GhostCharacter>, ghosts: WritableDraft<GhostCharacter>[], hackman: WritableDraft<HackmanCharacter>) {
  actualGhost.incrementCount();
  if (actualGhost.moveable === Moveable.Yes) {
    gameField = InvokeMoveGhostByDirection(gameField, actualGhost);
  }
  else if (actualGhost.moveable === Moveable.Hackman) {
    gameField = InvokeMoveGhostByDirection(gameField, actualGhost);
    gameField = ghostEatsHackman(gameField, ghosts, hackman);
  }
  else if (actualGhost.moveable === Moveable.Portal) {
    switch (actualGhost.direction) {
      case Direction.Up: {
        gameField = ghostMovesUpTroughPortal(gameField, actualGhost);
        break;
      }
      case Direction.Down: {
        gameField = ghostMovesDownTroughPortal(gameField, actualGhost);
        break;
      }
      case Direction.Left: {
        gameField = ghostMovesLeftTroughPortal(gameField, actualGhost);
        break;
      }
      case Direction.Right: {
        gameField = ghostMovesRightTroughPortal(gameField, actualGhost);
        break;
      }
    }
  }
  return gameField;
}


function moveGhostSmart(gameField: React.FC<{}>[][], actualGhost: WritableDraft<GhostCharacter>, ghosts: WritableDraft<GhostCharacter>[], hackman: WritableDraft<HackmanCharacter>) {
  let gameFieldCopy: React.FC<{}>[][] = gameField.slice();
  let canMove: Moveable;

  switch (actualGhost.direction) {
    case Direction.Up:
      
      canMove = canMoveUp(gameFieldCopy, actualGhost.position, ghosts, actualGhost.isEdible);
      if (canMove === Moveable.Yes) {
        gameFieldCopy = ghostMovesUp(gameFieldCopy, actualGhost);
      } else if (canMove === Moveable.Portal) {
        gameFieldCopy = ghostMovesUpTroughPortal(gameFieldCopy, actualGhost);
      } else if (canMove === Moveable.Hackman) {
        gameFieldCopy = ghostEatsHackman(gameFieldCopy, ghosts, hackman);
      }
      console.debug(canMove);
      
      break;
    
    case Direction.Down:
      
      canMove = canMoveDown(gameFieldCopy, actualGhost.position, ghosts, actualGhost.isEdible);
      if (canMove === Moveable.Yes) {
        gameFieldCopy = ghostMovesDown(gameFieldCopy, actualGhost);
      } else if (canMove === Moveable.Portal) {
        gameFieldCopy = ghostMovesDownTroughPortal(gameFieldCopy, actualGhost);
      } else if (canMove === Moveable.Hackman) {
        gameFieldCopy = ghostEatsHackman(gameFieldCopy, ghosts, hackman);
      }
      console.debug(canMove);

      break;
    
    case Direction.Right:
      
      canMove = canMoveRight(gameFieldCopy, actualGhost.position, ghosts, actualGhost.isEdible);
      if (canMove === Moveable.Yes) {
        gameFieldCopy = ghostMovesRight(gameFieldCopy, actualGhost);
      } else if (canMove === Moveable.Portal) {
        gameFieldCopy = ghostMovesRightTroughPortal(gameFieldCopy, actualGhost);
      } else if (canMove === Moveable.Hackman) {
        gameFieldCopy = ghostEatsHackman(gameFieldCopy, ghosts, hackman);
      }
      console.debug(canMove);

      break;
    
    case Direction.Left:
      
      canMove = canMoveLeft(gameFieldCopy, actualGhost.position, ghosts, actualGhost.isEdible);
      if (canMove === Moveable.Yes) {
        gameFieldCopy = ghostMovesLeft(gameFieldCopy, actualGhost);
      } else if (canMove === Moveable.Portal) {
        gameFieldCopy = ghostMovesLeftTroughPortal(gameFieldCopy, actualGhost);
      } else if (canMove === Moveable.Hackman) {
        gameFieldCopy = ghostEatsHackman(gameFieldCopy, ghosts, hackman);
      }
      console.debug(canMove);

      break;
  }

  return gameFieldCopy;
}

//#endregion

export {
  ghostMovesDown,
  ghostMovesDownTroughPortal,
  ghostMovesLeft,
  ghostMovesLeftTroughPortal,
  ghostMovesRight,
  ghostMovesRightTroughPortal,
  ghostMovesUp,
  ghostMovesUpTroughPortal,
  moveGhostDumb,
  moveGhostSmart,
  emitter
};
