import GhostCharacter from "../../Types/Character/GhostCharacter";
import Ghost1 from "../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import Ghost2 from "../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import Ghost3 from "../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import Ghost4 from "../../Components/GameFieldComponent/GhostComponents/RedGhost";
import Moveable from "../../Types/Moveable";
import Direction from "../../Types/Direction";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import HackmanCharacter from "../../Types/Character/HackmanCharacter";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import SpielfeldLayout from "../../SpielfeldLayout";
import EventEmitter from "events";

const emitter = new EventEmitter();

function ghostMovesRight(gameField: React.FC<any>[][], ghost: WritableDraft<GhostCharacter>): React.FC<any>[][] {
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  if (gameField[ghost.position.y][ghost.position.x + 1] === Hackman) {
    ghost.cachedField = Empty;
  }
  else {
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

function ghostMovesDown(gameField: React.FC<any>[][], ghost: WritableDraft<GhostCharacter>): React.FC<any>[][] {
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  if (gameField[ghost.position.y + 1][ghost.position.x] === Hackman) {
    ghost.cachedField = Empty;
  }
  else {
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

function ghostMovesLeft(gameField: React.FC<any>[][], ghost: WritableDraft<GhostCharacter>): React.FC<any>[][] {
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  if (gameField[ghost.position.y][ghost.position.x - 1] === Hackman) {
    ghost.cachedField = Empty;
  }
  else {
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

function ghostMovesUp(gameField: React.FC<any>[][], ghost: WritableDraft<GhostCharacter>): React.FC<any>[][] {
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  if (gameField[ghost.position.y - 1][ghost.position.x] === Hackman) {
    ghost.cachedField = Empty;
  }
  else {
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

function ghostMovesRightTroughPortal(gameField: React.FC<any>[][], ghost: WritableDraft<GhostCharacter>): React.FC<any>[][] {
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

function ghostMovesDownTroughPortal(gameField: React.FC<any>[][], ghost: WritableDraft<GhostCharacter>): React.FC<any>[][] {
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

function ghostMovesLeftTroughPortal(gameField: React.FC<any>[][], ghost: WritableDraft<GhostCharacter>): React.FC<any>[][] {
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

function ghostMovesUpTroughPortal(gameField: React.FC<any>[][], ghost: WritableDraft<GhostCharacter>): React.FC<any>[][] {
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

function moveGhost(gameField: React.FC<any>[][], actualGhost: WritableDraft<GhostCharacter>, ghosts: WritableDraft<GhostCharacter>[], hackman: WritableDraft<HackmanCharacter>) {
  actualGhost.incrementCount();
  if (actualGhost.moveable === Moveable.Yes) {
    gameField = InvokeMoveGhostByDirection(gameField, actualGhost);
  }
  else if (actualGhost.moveable === Moveable.Hackman) {
    gameField = InvokeMoveGhostByDirection(gameField, actualGhost);

    ghosts.forEach((ghost: WritableDraft<GhostCharacter>) => {
      gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
      ghost.resetToStartPosition(0, 0);
      switch (ghost.name) {
        case "Ghost1":
          gameField[ghost.position.y][ghost.position.x] = Ghost1;
          break;
        case "Ghost2":
          gameField[ghost.position.y][ghost.position.x] = Ghost2;
          break;
        case "Ghost3":
          gameField[ghost.position.y][ghost.position.x] = Ghost3;
          break;
        case "Ghost4":
          gameField[ghost.position.y][ghost.position.x] = Ghost4;
          break;
      }
    });
    hackman.hackmanMoved = false;
    hackman.resetToStartAndDecreaseLife();
    if (hackman.remainingLifes > 0) {
      gameField[hackman.position.y][hackman.position.x] = Hackman;
    }
    else {
      gameField = SpielfeldLayout();
    }
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

export {
  ghostMovesDown,
  ghostMovesDownTroughPortal,
  ghostMovesLeft,
  ghostMovesLeftTroughPortal,
  ghostMovesRight,
  ghostMovesRightTroughPortal,
  ghostMovesUp,
  ghostMovesUpTroughPortal,
  moveGhost,
  emitter
};