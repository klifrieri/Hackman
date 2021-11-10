import HackmanCharacter from "../../Types/Character/HackmanCharacter";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import Moveable from "../../Types/Moveable";
import Direction from "../../Types/Direction";
import { isEdible } from "./CanMove";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import React from "react";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import CoinValue from "../../Types/CoinValue";
import GhostCharacter from "../../Types/Character/GhostCharacter";
import resetGhostAndSetGameField from "./resetGhostAndSetGameField";
import { ghostEatsHackman } from "./MoveGhost";


function hackmanMovesUp(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<HackmanCharacter>){
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[hackman.position.y - 1][hackman.position.x] = Hackman;
  hackman.positionY = hackman.position.y - 1;
}

function hackmanMovesRight(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<HackmanCharacter>) {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[hackman.position.y][hackman.position.x + 1] = Hackman;
  hackman.positionX = hackman.position.x + 1;
}

function hackmanMovesDown(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<HackmanCharacter>) {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[hackman.position.y + 1][hackman.position.x] = Hackman;
  hackman.positionY = hackman.position.y + 1;
}

function hackmanMovesLeft(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<HackmanCharacter>) {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[hackman.position.y][hackman.position.x - 1] = Hackman;
  hackman.positionX = hackman.position.x - 1;
}

function hackmanMovesUpTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<HackmanCharacter>) {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[spielFeldCopy.length - 1][hackman.position.x] = Hackman;
  hackman.positionY = spielFeldCopy.length - 1;
}

function hackmanMovesRightTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<HackmanCharacter>) {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[hackman.position.y][0] = Hackman;
  hackman.positionX = 0;
}

function hackmanMovesLeftTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<HackmanCharacter>){
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[hackman.position.y][spielFeldCopy[0].length - 1] = Hackman;
  hackman.positionX = spielFeldCopy[0].length - 1;
}

function hackmanMovesDownTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<HackmanCharacter>) {
  spielFeldCopy[hackman.position.y][hackman.position.x] = Empty;
  spielFeldCopy[0][hackman.position.x] = Hackman;
  hackman.positionY = 0;
}

function InvokeMoveHackmanByDirection(hackman: WritableDraft<HackmanCharacter>, gameField: React.FC<{}>[][]) {
  switch (hackman.direction) {
    case Direction.Up: {
      hackmanMovesUp(gameField, hackman);
      break;
    }
    case Direction.Right: {
      hackmanMovesRight(gameField, hackman);
      break;
    }
    case Direction.Down: {
      hackmanMovesDown(gameField, hackman);
      break;
    }
    case Direction.Left: {
      hackmanMovesLeft(gameField, hackman);
      break;
    }
  }
}


function moveHackman(gameField: React.FC<{}>[][], hackman: WritableDraft<HackmanCharacter>, ghosts: WritableDraft<GhostCharacter>[]):CoinValue {
  let increaseCoins: CoinValue = CoinValue.Zero;
  const ghostEdible: boolean = hackman.moveable === Moveable.GreenGhostEdible ||
    hackman.moveable === Moveable.BlueGhostEdible ||
    hackman.moveable === Moveable.OrangeGhostEdible ||
    hackman.moveable === Moveable.RedGhostEdible;

  if (hackman.moveable === Moveable.Yes) {
    increaseCoins = isEdible(gameField, hackman.direction, hackman.position)
    InvokeMoveHackmanByDirection(hackman, gameField);
  }
  else if (ghostEdible) {
    InvokeMoveHackmanByDirection(hackman, gameField);
    gameField = resetGhostAndSetGameField(gameField,hackman.moveable,ghosts);
    increaseCoins = CoinValue.Ten;
  }
  else if(hackman.moveable === Moveable.Ghost){
    ghostEatsHackman(gameField,ghosts,hackman);
  }
  else if (hackman.moveable === Moveable.Portal) {
    switch (hackman.direction) {
      case Direction.Up: {
        hackmanMovesUpTroughPortal(gameField, hackman);
        break;
      }
      case Direction.Right: {
        hackmanMovesRightTroughPortal(gameField, hackman);
        break;
      }
      case Direction.Down: {
        hackmanMovesDownTroughPortal(gameField, hackman);
        break;
      }
      case Direction.Left: {
        hackmanMovesLeftTroughPortal(gameField, hackman);
        break;
      }
    }
  }
  return increaseCoins;
};

export { hackmanMovesDownTroughPortal, hackmanMovesDown, hackmanMovesRightTroughPortal, hackmanMovesRight, hackmanMovesUpTroughPortal, hackmanMovesUp, hackmanMovesLeftTroughPortal, hackmanMovesLeft, moveHackman };