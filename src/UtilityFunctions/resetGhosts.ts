import Empty from "../Components/GameFieldComponent/FieldComponents/Path/Empty";
import BlueGhost from "../Components/GameFieldComponent/GhostComponents/BlueGhost";
import GreenGhost from "../Components/GameFieldComponent/GhostComponents/GreenGhost";
import OrangeGhost from "../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import RedGhost from "../Components/GameFieldComponent/GhostComponents/RedGhost";
import GhostCharacter from "../Types/Character/GhostCharacter";
import Moveable from "../Types/Moveable";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";

function resetGhostAndItsPosition(gameField: React.FC<{}>[][], whichGhost: Moveable, ghosts: WritableDraft<GhostCharacter>[]): React.FC<{}>[][] {
    switch (whichGhost) {
      case Moveable.GreenGhostEdible:
        resetGreenGhost(gameField, ghosts[0]);
        break;
        case Moveable.RedGhostEdible:
          resetRedGhost(gameField, ghosts[1]);
          break;
        case Moveable.OrangeGhostEdible:
          resetOrangeGhost(gameField, ghosts[2]);
        break;
        case Moveable.BlueGhostEdible:
          resetBlueGhost(gameField, ghosts[3]);
          break;
    }
    return gameField;
  }
  
  function resetBlueGhost(gameField: React.FC<{}>[][], ghost: WritableDraft<GhostCharacter>) {
    if (gameField[9][11] === Empty) {
      ghost.resetToStartPosition(0, 0);
    }
    else if (gameField[8][11] === Empty) {
      ghost.resetToStartPosition(-1, 0);
    }
    else if (gameField[9][10] === Empty) {
      ghost.resetToStartPosition(0, -1);
    }
    else if (gameField[8][10] === Empty) {
      ghost.resetToStartPosition(-1, -1);
    }
    gameField[ghost.position.y][ghost.position.x] = BlueGhost;
  }
  
  function resetOrangeGhost(gameField: React.FC<{}>[][], ghost: WritableDraft<GhostCharacter>) {
    if (gameField[9][9] === Empty) {
      ghost.resetToStartPosition(0, 0);
    }
    else if (gameField[8][9] === Empty) {
      ghost.resetToStartPosition(-1, 0);
    }
    else if (gameField[9][10] === Empty) {
      ghost.resetToStartPosition(0, 1);
    }
    else if (gameField[8][10] === Empty) {
      ghost.resetToStartPosition(-1, 1);
    }
    gameField[ghost.position.y][ghost.position.x] = OrangeGhost;
  }
  
  function resetRedGhost(gameField: React.FC<{}>[][], ghost: WritableDraft<GhostCharacter>) {
    if (gameField[7][11] === Empty) {
      ghost.resetToStartPosition(0, 0);
    }
    else if (gameField[7][10] === Empty) {
      ghost.resetToStartPosition(0, -1);
    }
    else if (gameField[8][11] === Empty) {
      ghost.resetToStartPosition(1, 0);
    }
    else if (gameField[8][10] === Empty) {
      ghost.resetToStartPosition(1, -1);
    }
    gameField[ghost.position.y][ghost.position.x] = RedGhost;
  }
  
  function resetGreenGhost(gameField: React.FC<{}>[][], ghost: WritableDraft<GhostCharacter>) {
    if (gameField[7][9] === Empty) {
      ghost.resetToStartPosition(0, 0);
    }
    else if (gameField[8][9] === Empty) {
      ghost.resetToStartPosition(1, 0);
    }
    else if (gameField[7][10] === Empty) {
      ghost.resetToStartPosition(0, 1);
    }
    else if (gameField[8][10] === Empty) {
      ghost.resetToStartPosition(1, 1);
    }
    gameField[ghost.position.y][ghost.position.x] = GreenGhost;
  }

  export {resetGhostAndItsPosition,resetGreenGhost,resetBlueGhost,resetOrangeGhost,resetRedGhost};