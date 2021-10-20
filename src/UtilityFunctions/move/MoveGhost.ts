import GhostCharacter from "../../Types/Character/GhostCharacter";
import GreenGhost from "../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import BlueGhost from "../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import OrangeGhost from "../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import RedGhost from "../../Components/GameFieldComponent/GhostComponents/RedGhost";
import Moveable from "../../Types/Moveable";
import Direction from "../../Types/Direction";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import HackmanCharacter from "../../Types/Character/HackmanCharacter";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import SpielfeldLayout from "../../SpielfeldLayout";
import CharacterIdentifier from "../../Types/CharacterIdentifier";


function ghostMovesRight(gameField: React.FC<any>[][], ghost: WritableDraft<GhostCharacter>): React.FC<any>[][] {
  gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
  if (gameField[ghost.position.y][ghost.position.x + 1] === Hackman) {
    ghost.cachedField = Empty;
  }
  else {
    ghost.cachedField = gameField[ghost.position.y][ghost.position.x + 1];
  }
  switch (ghost.name) {
    case CharacterIdentifier.GreenGhost:
      gameField[ghost.position.y][ghost.position.x + 1] = GreenGhost;
      break;
    case CharacterIdentifier.RedGhost:
      gameField[ghost.position.y][ghost.position.x + 1] = RedGhost;
      break;
    case CharacterIdentifier.OrangeGhost:
      gameField[ghost.position.y][ghost.position.x + 1] = OrangeGhost;
      break;
    case CharacterIdentifier.BlueGhost:
      gameField[ghost.position.y][ghost.position.x + 1] = BlueGhost;
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
    case CharacterIdentifier.GreenGhost:
      gameField[ghost.position.y + 1][ghost.position.x] = GreenGhost;
      break;
    case CharacterIdentifier.RedGhost:
      gameField[ghost.position.y + 1][ghost.position.x] = RedGhost;
      break;
    case CharacterIdentifier.OrangeGhost:
      gameField[ghost.position.y + 1][ghost.position.x] = OrangeGhost;
      break;
    case CharacterIdentifier.BlueGhost:
      gameField[ghost.position.y + 1][ghost.position.x] = BlueGhost;
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
    case CharacterIdentifier.GreenGhost:
      gameField[ghost.position.y][ghost.position.x - 1] = GreenGhost;
      break;
    case CharacterIdentifier.RedGhost:
      gameField[ghost.position.y][ghost.position.x - 1] = RedGhost;
      break;
    case CharacterIdentifier.OrangeGhost:
      gameField[ghost.position.y][ghost.position.x - 1] = OrangeGhost;
      break;
    case CharacterIdentifier.BlueGhost:
      gameField[ghost.position.y][ghost.position.x - 1] = BlueGhost;
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
    case CharacterIdentifier.GreenGhost:
      gameField[ghost.position.y - 1][ghost.position.x] = GreenGhost;
      break;
    case CharacterIdentifier.RedGhost:
      gameField[ghost.position.y - 1][ghost.position.x] = RedGhost;
      break;
    case CharacterIdentifier.OrangeGhost:
      gameField[ghost.position.y - 1][ghost.position.x] = OrangeGhost;
      break;
    case CharacterIdentifier.BlueGhost:
      gameField[ghost.position.y - 1][ghost.position.x] = BlueGhost;
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
    case CharacterIdentifier.GreenGhost:
      gameField[ghost.position.y][0] = GreenGhost;
      break;
    case CharacterIdentifier.RedGhost:
      gameField[ghost.position.y][0] = RedGhost;
      break;
    case CharacterIdentifier.OrangeGhost:
      gameField[ghost.position.y][0] = OrangeGhost;
      break;
    case CharacterIdentifier.BlueGhost:
      gameField[ghost.position.y][0] = BlueGhost;
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
    case CharacterIdentifier.GreenGhost:
      gameField[0][ghost.position.x] = GreenGhost;
      break;
    case CharacterIdentifier.RedGhost:
      gameField[0][ghost.position.x] = RedGhost;
      break;
    case CharacterIdentifier.OrangeGhost:
      gameField[0][ghost.position.x] = OrangeGhost;
      break;
    case CharacterIdentifier.BlueGhost:
      gameField[0][ghost.position.x] = BlueGhost;
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
    case CharacterIdentifier.GreenGhost:
      gameField[ghost.position.y][gameField[0].length - 1] = GreenGhost;
      break;
    case CharacterIdentifier.RedGhost:
      gameField[ghost.position.y][gameField[0].length - 1] = RedGhost;
      break;
    case CharacterIdentifier.OrangeGhost:
      gameField[ghost.position.y][gameField[0].length - 1] = OrangeGhost;
      break;
    case CharacterIdentifier.BlueGhost:
      gameField[ghost.position.y][gameField[0].length - 1] = BlueGhost;
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
    case CharacterIdentifier.GreenGhost:
      gameField[gameField.length - 1][ghost.position.x] = GreenGhost;
      break;
    case CharacterIdentifier.RedGhost:
      gameField[gameField.length - 1][ghost.position.x] = RedGhost;
      break;
    case CharacterIdentifier.OrangeGhost:
      gameField[gameField.length - 1][ghost.position.x] = OrangeGhost;
      break;
    case CharacterIdentifier.BlueGhost:
      gameField[gameField.length - 1][ghost.position.x] = BlueGhost;
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
        case CharacterIdentifier.GreenGhost:
          gameField[ghost.position.y][ghost.position.x] = GreenGhost;
          break;
        case CharacterIdentifier.RedGhost:
          gameField[ghost.position.y][ghost.position.x] = RedGhost;
          break;
        case CharacterIdentifier.OrangeGhost:
          gameField[ghost.position.y][ghost.position.x] = OrangeGhost;
          break;
        case CharacterIdentifier.BlueGhost:
          gameField[ghost.position.y][ghost.position.x] = BlueGhost;
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
  moveGhost
};