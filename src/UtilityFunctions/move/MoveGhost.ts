import GhostCharacter from "../../Types/Character/GhostCharacter";
import Ghost1 from "../../Components/GameFieldComponent/GhostComponents/Ghost1";
import Ghost2 from "../../Components/GameFieldComponent/GhostComponents/Ghost2";
import Ghost3 from "../../Components/GameFieldComponent/GhostComponents/Ghost3";
import Ghost4 from "../../Components/GameFieldComponent/GhostComponents/Ghost4";
import Moveable from "../../Types/Moveable";
import Direction from "../../Types/Direction";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";

function ghostMovesRight(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
  ghost.cachedField = gameField[ghost.getPosition.y][ghost.getPosition.x + 1];
  switch (ghost.name) {
    case "Ghost1":
      gameField[ghost.getPosition.y][ghost.getPosition.x + 1] = Ghost1;
      break;
    case "Ghost2":
      gameField[ghost.getPosition.y][ghost.getPosition.x + 1] = Ghost2;
      break;
    case "Ghost3":
      gameField[ghost.getPosition.y][ghost.getPosition.x + 1] = Ghost3;
      break;
    case "Ghost4":
      gameField[ghost.getPosition.y][ghost.getPosition.x + 1] = Ghost4;
      break;
    default:
      break;
  }
  ghost.setPositionX = ghost.getPosition.x + 1;
  return gameField;
}

function ghostMovesDown(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
  ghost.cachedField = gameField[ghost.getPosition.y + 1][ghost.getPosition.x];
  switch (ghost.name) {
    case "Ghost1":
      gameField[ghost.getPosition.y + 1][ghost.getPosition.x] = Ghost1;
      break;
    case "Ghost2":
      gameField[ghost.getPosition.y + 1][ghost.getPosition.x] = Ghost2;
      break;
    case "Ghost3":
      gameField[ghost.getPosition.y + 1][ghost.getPosition.x] = Ghost3;
      break;
    case "Ghost4":
      gameField[ghost.getPosition.y + 1][ghost.getPosition.x] = Ghost4;
      break;
    default:
      break;
  }
  ghost.positionY = ghost.getPosition.y + 1;
  return gameField;
}

function ghostMovesLeft(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
  ghost.cachedField = gameField[ghost.getPosition.y][ghost.getPosition.x - 1];
  switch (ghost.name) {
    case "Ghost1":
      gameField[ghost.getPosition.y][ghost.getPosition.x - 1] = Ghost1;
      break;
    case "Ghost2":
      gameField[ghost.getPosition.y][ghost.getPosition.x - 1] = Ghost2;
      break;
    case "Ghost3":
      gameField[ghost.getPosition.y][ghost.getPosition.x - 1] = Ghost3;
      break;
    case "Ghost4":
      gameField[ghost.getPosition.y][ghost.getPosition.x - 1] = Ghost4;
      break;
    default:
      break;
  }
  ghost.setPositionX = ghost.getPosition.x - 1;
  return gameField;
}

function ghostMovesUp(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
  ghost.cachedField = gameField[ghost.getPosition.y - 1][ghost.getPosition.x];
  switch (ghost.name) {
    case "Ghost1":
      gameField[ghost.getPosition.y - 1][ghost.getPosition.x] = Ghost1;
      break;
    case "Ghost2":
      gameField[ghost.getPosition.y - 1][ghost.getPosition.x] = Ghost2;
      break;
    case "Ghost3":
      gameField[ghost.getPosition.y - 1][ghost.getPosition.x] = Ghost3;
      break;
    case "Ghost4":
      gameField[ghost.getPosition.y - 1][ghost.getPosition.x] = Ghost4;
      break;
    default:
      break;
  }
  ghost.positionY = ghost.getPosition.y - 1;
  return gameField;
}

function ghostMovesRightTroughPortal(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  ghost.cachedField = gameField[ghost.getPosition.y][0];
  gameField[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
  switch (ghost.name) {
    case "Ghost1":
      gameField[ghost.getPosition.y][0] = Ghost1;
      break;
    case "Ghost2":
      gameField[ghost.getPosition.y][0] = Ghost2;
      break;
    case "Ghost3":
      gameField[ghost.getPosition.y][0] = Ghost3;
      break;
    case "Ghost4":
      gameField[ghost.getPosition.y][0] = Ghost4;
      break;
    default:
      break;
  }
  ghost.setPositionX = 0;
  return gameField;
}

function ghostMovesDownTroughPortal(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
  ghost.cachedField = gameField[0][ghost.getPosition.x];
  switch (ghost.name) {
    case "Ghost1":
      gameField[0][ghost.getPosition.x] = Ghost1;
      break;
    case "Ghost2":
      gameField[0][ghost.getPosition.x] = Ghost2;
      break;
    case "Ghost3":
      gameField[0][ghost.getPosition.x] = Ghost3;
      break;
    case "Ghost4":
      gameField[0][ghost.getPosition.x] = Ghost4;
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
  gameField[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
  ghost.cachedField = gameField[ghost.getPosition.y][gameField[0].length - 1];
  switch (ghost.name) {
    case "Ghost1":
      gameField[ghost.getPosition.y][gameField[0].length - 1] = Ghost1;
      break;
    case "Ghost2":
      gameField[ghost.getPosition.y][gameField[0].length - 1] = Ghost2;
      break;
    case "Ghost3":
      gameField[ghost.getPosition.y][gameField[0].length - 1] = Ghost3;
      break;
    case "Ghost4":
      gameField[ghost.getPosition.y][gameField[0].length - 1] = Ghost4;
      break;
    default:
      break;
  }
  ghost.setPositionX = gameField[0].length - 1;
  return gameField;
}

function ghostMovesUpTroughPortal(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
): React.FC<any>[][] {
  gameField[ghost.getPosition.y][ghost.getPosition.x] = ghost.cachedField;
  ghost.cachedField = gameField[gameField.length - 1][ghost.getPosition.x];
  switch (ghost.name) {
    case "Ghost1":
      gameField[gameField.length - 1][ghost.getPosition.x] = Ghost1;
      break;
    case "Ghost2":
      gameField[gameField.length - 1][ghost.getPosition.x] = Ghost2;
      break;
    case "Ghost3":
      gameField[gameField.length - 1][ghost.getPosition.x] = Ghost3;
      break;
    case "Ghost4":
      gameField[gameField.length - 1][ghost.getPosition.x] = Ghost4;
      break;
    default:
      break;
  }
  ghost.positionY = gameField.length - 1;
  return gameField;
}

function moveGhost(
  gameField: React.FC<any>[][],
  ghost: WritableDraft<GhostCharacter>
) {
  ghost.incrementCount();
  if (ghost.moveable === Moveable.Yes) {
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
  } else if (ghost.moveable === Moveable.Portal) {
    switch (ghost.direction) {
      case Direction.Up: {
        gameField = ghostMovesUpTroughPortal(gameField, ghost);
        break;
      }
      case Direction.Down: {
        gameField = ghostMovesDownTroughPortal(gameField, ghost);
        break;
      }
      case Direction.Left: {
        gameField = ghostMovesLeftTroughPortal(gameField, ghost);
        break;
      }
      case Direction.Right: {
        gameField = ghostMovesRightTroughPortal(gameField, ghost);
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
};