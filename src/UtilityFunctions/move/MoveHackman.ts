import Character from "../../Types/Character/BaseCharacter";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import Moveable from "../../Types/Moveable";
import Direction from "../../Types/Direction";
import { isEdible } from "./CanMove";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import React from "react";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import CoinValue from "../../Types/CoinValue";
import GhostCharacter from "../../Types/Character/GhostCharacter";
import GreenGhost from "../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import BlueGhost from "../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import OrangeGhost from "../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import RedGhost from "../../Components/GameFieldComponent/GhostComponents/RedGhost";

function resetGhostAndItsPosition(gameField: React.FC<{}>[][], whichGhost: Moveable, ghost: WritableDraft<GhostCharacter>[]): React.FC<{}>[][] {
  switch (whichGhost) {
    case Moveable.GreenGhostEdible:
      if (gameField[7][9] === Empty) {
        ghost[0].resetToStartPosition(0, 0);
      }
      else if (gameField[8][9] === Empty) {
        ghost[0].resetToStartPosition(1, 0);
      }
      else if (gameField[7][10] === Empty) {
        ghost[0].resetToStartPosition(0, 1);
      }
      else if (gameField[8][10] === Empty) {
        ghost[0].resetToStartPosition(1, 1);
      }
      gameField[ghost[0].position.y][ghost[0].position.x] = GreenGhost;
      break;
      case Moveable.RedGhostEdible:
        if (gameField[7][11] === Empty) {
          ghost[1].resetToStartPosition(0, 0);
        }
        else if (gameField[7][10] === Empty) {
          ghost[1].resetToStartPosition(0, -1);
        }
        else if (gameField[8][11] === Empty) {
          ghost[1].resetToStartPosition(1, 0);
        }
        else if (gameField[8][10] === Empty) {
          ghost[1].resetToStartPosition(1, -1);
        }
        gameField[ghost[1].position.y][ghost[1].position.x] = RedGhost;
        break;
      case Moveable.OrangeGhostEdible:
        if (gameField[9][9] === Empty) {
          ghost[2].resetToStartPosition(0, 0);
      }
      else if (gameField[8][9] === Empty) {
        ghost[2].resetToStartPosition(-1, 0);
      }
      else if (gameField[9][10] === Empty) {
        ghost[2].resetToStartPosition(0, 1);
      }
      else if (gameField[8][10] === Empty) {
        ghost[2].resetToStartPosition(-1, 1);
      }
      gameField[ghost[2].position.y][ghost[2].position.x] = OrangeGhost;
      break;
      case Moveable.BlueGhostEdible:
        if (gameField[9][11] === Empty) {
          ghost[3].resetToStartPosition(0, 0);
        }
        else if (gameField[8][11] === Empty) {
          ghost[3].resetToStartPosition(-1, 0);
        }
        else if (gameField[9][10] === Empty) {
          ghost[3].resetToStartPosition(0, -1);
        }
        else if (gameField[8][10] === Empty) {
          ghost[3].resetToStartPosition(-1, -1);
        }
        gameField[ghost[3].position.y][ghost[3].position.x] = BlueGhost;
        break;
  }
  return gameField;
}

function hackmanMovesUp(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[hackman.position.y - 1][hackman.position.x] = Hackman;
  hackman.positionY = hackman.position.y - 1;
  return spielFeldCopy;
}

function hackmanMovesRight(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[hackman.position.y][hackman.position.x + 1] = Hackman;
  hackman.positionX = hackman.position.x + 1;
  return spielFeldCopy;
}

function hackmanMovesDown(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[hackman.position.y + 1][hackman.position.x] = Hackman;
  hackman.positionY = hackman.position.y + 1;
  return spielFeldCopy;
}

function hackmanMovesLeft(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[hackman.position.y][hackman.position.x - 1] = Hackman;
  hackman.positionX = hackman.position.x - 1;
  return spielFeldCopy;
}

function hackmanMovesUpTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[spielFeldCopy.length - 1][hackman.position.x] = Hackman;
  hackman.positionY = spielFeldCopy.length - 1;
  return spielFeldCopy;
}

function hackmanMovesRightTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[hackman.position.y][0] = Hackman;
  hackman.positionX = 0;
  return spielFeldCopy;
}

function hackmanMovesLeftTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[hackman.position.y][spielFeldCopy[0].length - 1] = Hackman;
  hackman.positionX = spielFeldCopy[0].length - 1;
  return spielFeldCopy;
}

function hackmanMovesDownTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[0][hackman.position.x] = Hackman;
  hackman.positionY = 0;
  return spielFeldCopy;
}

function InvokeMoveHackmanByDirection(hackman: WritableDraft<Character>, gameField: React.FC<{}>[][]) {
  switch (hackman.direction) {
    case Direction.Up: {
      gameField = hackmanMovesUp(gameField, hackman);
      break;
    }
    case Direction.Right: {
      gameField = hackmanMovesRight(gameField, hackman);
      break;
    }
    case Direction.Down: {
      gameField = hackmanMovesDown(gameField, hackman);
      break;
    }
    case Direction.Left: {
      gameField = hackmanMovesLeft(gameField, hackman);
      break;
    }
  }
  return gameField;
}


function moveHackman(gameField: React.FC<{}>[][], hackman: WritableDraft<Character>, ghosts: WritableDraft<GhostCharacter>[]): { gameField: React.FC<{}>[][], increaseTheCoins: CoinValue } {
  let increaseTheCoins: CoinValue = CoinValue.Zero;
  const ghostEdible: boolean = hackman.moveable === Moveable.GreenGhostEdible ||
    hackman.moveable === Moveable.BlueGhostEdible ||
    hackman.moveable === Moveable.OrangeGhostEdible ||
    hackman.moveable === Moveable.RedGhostEdible;

  if (hackman.moveable === Moveable.Yes) {
    increaseTheCoins = isEdible(gameField, hackman.direction, hackman.position)
    gameField = InvokeMoveHackmanByDirection(hackman, gameField);
  }
  else if (ghostEdible) {
    gameField = InvokeMoveHackmanByDirection(hackman, gameField);
    gameField = resetGhostAndItsPosition(gameField, hackman.moveable, ghosts);
    increaseTheCoins = CoinValue.Ten;
  }
  else if (hackman.moveable === Moveable.Portal) {
    switch (hackman.direction) {
      case Direction.Up: {
        gameField = hackmanMovesUpTroughPortal(gameField, hackman);
        break;
      }
      case Direction.Right: {
        gameField = hackmanMovesRightTroughPortal(gameField, hackman);
        break;
      }
      case Direction.Down: {
        gameField = hackmanMovesDownTroughPortal(gameField, hackman);
        break;
      }
      case Direction.Left: {
        gameField = hackmanMovesLeftTroughPortal(gameField, hackman);
        break;
      }
    }
  }
  return { gameField, increaseTheCoins };
};

export { hackmanMovesDownTroughPortal, hackmanMovesDown, hackmanMovesRightTroughPortal, hackmanMovesRight, hackmanMovesUpTroughPortal, hackmanMovesUp, hackmanMovesLeftTroughPortal, hackmanMovesLeft, moveHackman };