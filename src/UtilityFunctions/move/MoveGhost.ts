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
import CharacterIdentifier from "../../Types/CharacterIdentifier";
import Coordinate from "../../Types/Coordinate";
import React from "react";
import Gate from "../../Components/GameFieldComponent/FieldComponents/Path/Gate";
import { getHackmanIndex } from "../../State/slices/gameFieldSliceHelper";


function ghostGoOutOfCage(ghost: WritableDraft<GhostCharacter>, gamefield: React.FC<{}>[][], ghosts: WritableDraft<GhostCharacter>[]) {
  let destination = new Coordinate(5, 10)
  if (ghost.position.y === destination.y) {
    ghost.inCage = false
  }
  else if (canMoveUp(gamefield, ghost.position, ghosts) === Moveable.Yes) {
    ghost.position.y -= 1
    ghost.direction = Direction.Up
    switch (ghost.name) {
      case CharacterIdentifier.GreenGhost:
        gamefield[ghost.position.y][ghost.position.x] = GreenGhost;
        break;
      case CharacterIdentifier.RedGhost:
        gamefield[ghost.position.y][ghost.position.x] = RedGhost;
        break;
      case CharacterIdentifier.OrangeGhost:
        gamefield[ghost.position.y][ghost.position.x] = OrangeGhost;
        break;
      case CharacterIdentifier.BlueGhost:
        gamefield[ghost.position.y][ghost.position.x] = BlueGhost;
        break;
    }
    gamefield[ghost.position.y + 1][ghost.position.x] = Empty;
  }
  else if (canMoveLeft(gamefield, ghost.position, ghosts) === Moveable.Yes) {
    ghost.position.x -= 1
    ghost.direction = Direction.Left
    switch (ghost.name) {
      case CharacterIdentifier.GreenGhost:
        gamefield[ghost.position.y][ghost.position.x] = GreenGhost;
        break;
      case CharacterIdentifier.RedGhost:
        gamefield[ghost.position.y][ghost.position.x] = RedGhost;
        break;
      case CharacterIdentifier.OrangeGhost:
        gamefield[ghost.position.y][ghost.position.x] = OrangeGhost;
        break;
      case CharacterIdentifier.BlueGhost:
        gamefield[ghost.position.y][ghost.position.x] = BlueGhost;
        break;
    }
    gamefield[ghost.position.y][ghost.position.x + 1] = Empty;
  }
  else if (canMoveRight(gamefield, ghost.position, ghosts) === Moveable.Yes) {
    ghost.position.x += 1
    ghost.direction = Direction.Right
    switch (ghost.name) {
      case CharacterIdentifier.GreenGhost:
        gamefield[ghost.position.y][ghost.position.x] = GreenGhost;
        break;
      case CharacterIdentifier.RedGhost:
        gamefield[ghost.position.y][ghost.position.x] = RedGhost;
        break;
      case CharacterIdentifier.OrangeGhost:
        gamefield[ghost.position.y][ghost.position.x] = OrangeGhost;
        break;
      case CharacterIdentifier.BlueGhost:
        gamefield[ghost.position.y][ghost.position.x] = BlueGhost;
        break;
    }
    gamefield[ghost.position.y][ghost.position.x - 1] = Empty;
  }
  else if (canMoveDown(gamefield, ghost.position, ghosts) === Moveable.Yes) {
    ghost.position.y += 1
    ghost.direction = Direction.Down
    switch (ghost.name) {
      case CharacterIdentifier.GreenGhost:
        gamefield[ghost.position.y][ghost.position.x] = GreenGhost;
        break;
      case CharacterIdentifier.RedGhost:
        gamefield[ghost.position.y][ghost.position.x] = RedGhost;
        break;
      case CharacterIdentifier.OrangeGhost:
        gamefield[ghost.position.y][ghost.position.x] = OrangeGhost;
        break;
      case CharacterIdentifier.BlueGhost:
        gamefield[ghost.position.y][ghost.position.x] = BlueGhost;
        break;
    }
    gamefield[ghost.position.y - 1][ghost.position.x] = Empty;
  }
  gamefield[destination.y + 1][destination.x] = Gate
}

function ghostEatsHackman(gameField: React.FC<any>[][], ghosts: WritableDraft<GhostCharacter>[], hackman: WritableDraft<HackmanCharacter>) {
  ghosts.forEach((ghost: WritableDraft<GhostCharacter>) => {
    gameField[ghost.position.y][ghost.position.x] = ghost.cachedField;
    ghost.resetToStartPosition();
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
  const {y,x}=getHackmanIndex(gameField);
    gameField[y][x] = Empty;

  hackman.resetToStartAndDecreaseLife();
  // if (hackman.remainingLifes > 0) {
    gameField[hackman.position.y][hackman.position.x] = Hackman;
  // }
}

//#region move ghost methods
function moveGhostDumb(gameField: React.FC<{}>[][], actualGhost: WritableDraft<GhostCharacter>, ghosts: WritableDraft<GhostCharacter>[], hackman: WritableDraft<HackmanCharacter>) {
  actualGhost.incrementCount();
  if (actualGhost.inCage) {
    ghostGoOutOfCage(actualGhost, gameField, ghosts)
  }
  else {
    if (actualGhost.moveable === Moveable.Yes) {
      InvokeMoveGhostByDirection(gameField, actualGhost);
    }
    else if (actualGhost.moveable === Moveable.Hackman) {
      InvokeMoveGhostByDirection(gameField, actualGhost);
      ghostEatsHackman(gameField, ghosts, hackman);
    }
    else if (actualGhost.moveable === Moveable.Portal) {
      switch (actualGhost.direction) {
        case Direction.Up: {
          ghostMovesUpTroughPortal(gameField, actualGhost);
          break;
        }
        case Direction.Down: {
          ghostMovesDownTroughPortal(gameField, actualGhost);
          break;
        }
        case Direction.Left: {
          ghostMovesLeftTroughPortal(gameField, actualGhost);
          break;
        }
        case Direction.Right: {
          ghostMovesRightTroughPortal(gameField, actualGhost);
          break;
        }
      }
    }
  }
}


function moveGhostSmart(gameField: React.FC<{}>[][], actualGhost: WritableDraft<GhostCharacter>, ghosts: WritableDraft<GhostCharacter>[], hackman: WritableDraft<HackmanCharacter>) {
  let canMove: Moveable;
  if (actualGhost.inCage) {
    ghostGoOutOfCage(actualGhost, gameField, ghosts)
  }
  else {
    switch (actualGhost.direction) {
      case Direction.Up:
        canMove = canMoveUp(gameField, actualGhost.position);
        if (canMove === Moveable.Yes) {
          ghostMovesUp(actualGhost);
        }
        else if (canMove === Moveable.Portal) {
          ghostMovesUpTroughPortal(actualGhost);
        }
        // else if (canMove === Moveable.Hackman) {
        //   ghostEatsHackman(gameField, ghosts, hackman);
        // }
        break;
      case Direction.Down:
        canMove = canMoveDown(gameField, actualGhost.position);
        if (canMove === Moveable.Yes) {
          ghostMovesDown(gameField, actualGhost);
        }
        else if (canMove === Moveable.Portal) {
          ghostMovesDownTroughPortal(gameField, actualGhost);
        }
        // else if (canMove === Moveable.Hackman) {
        //   ghostEatsHackman(gameField, ghosts, hackman);
        // }
        break;
      case Direction.Right:
        canMove = canMoveRight(gameField, actualGhost.position);
        if (canMove === Moveable.Yes) {
          ghostMovesRight(gameField, actualGhost);
        }
        else if (canMove === Moveable.Portal) {
          ghostMovesRightTroughPortal(gameField, actualGhost);
        }
        // else if (canMove === Moveable.Hackman) {
        //   ghostEatsHackman(gameField, ghosts, hackman);
        // }
        break;
      case Direction.Left:
        canMove = canMoveLeft(gameField, actualGhost.position);
        if (canMove === Moveable.Yes) {
          ghostMovesLeft(gameField, actualGhost);
        }
        else if (canMove === Moveable.Portal) {
          ghostMovesLeftTroughPortal(gameField, actualGhost);
        }
        // else if (canMove === Moveable.Hackman) {
        //   ghostEatsHackman(gameField, ghosts, hackman);
        // }
        break;
    }
  }
}

//#endregion

export {
  moveGhostDumb,
  moveGhostSmart,
  ghostEatsHackman
};
