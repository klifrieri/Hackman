import Character from "../../Types/Character/Character";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import Moveable from "../../Types/Moveable";
import Direction from "../../Types/Direction";
import { isEdible } from "./CanMove";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import React from "react";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import CoinValue from "../../Types/CoinValue";


function hackmanMovesUp(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y - 1][hackman.getPosition.x] = Hackman;
  hackman.positionY = hackman.getPosition.y - 1;
  return spielFeldCopy;
}

function hackmanMovesRight(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x + 1] = Hackman;
  hackman.setPositionX = hackman.getPosition.x + 1;
  return spielFeldCopy;
}

function hackmanMovesDown(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y + 1][hackman.getPosition.x] = Hackman;
  hackman.positionY = hackman.getPosition.y + 1;
  return spielFeldCopy;
}

function hackmanMovesLeft(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x - 1] = Hackman;
  hackman.setPositionX = hackman.getPosition.x - 1;
  return spielFeldCopy;
}

function hackmanMovesUpTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[spielFeldCopy.length - 1][hackman.getPosition.x] = Hackman;
  hackman.positionY = spielFeldCopy.length - 1;
  return spielFeldCopy;
}

function hackmanMovesRightTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y][0] = Hackman;
  hackman.setPositionX = 0;
  return spielFeldCopy;
}

function hackmanMovesLeftTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y][spielFeldCopy[0].length - 1] = Hackman;
  hackman.setPositionX = spielFeldCopy[0].length - 1;
  return spielFeldCopy;
}

function hackmanMovesDownTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[0][hackman.getPosition.x] = Hackman;
  hackman.positionY = 0;
  return spielFeldCopy;
}

function moveHackman(gameField: React.FC<{}>[][], hackman: WritableDraft<Character>): { gameField: React.FC<{}>[][], increaseTheCoins: CoinValue } {
  let increaseTheCoins: CoinValue = 0;
  if (hackman.moveable !== Moveable.Portal) {
    const ghostEdible:boolean = hackman.moveable === Moveable.GhostEdible1 ||
                                hackman.moveable === Moveable.GhostEdible2 ||
                                hackman.moveable === Moveable.GhostEdible3 ||
                                hackman.moveable === Moveable.GhostEdible4;

    switch (hackman.direction) {
      case Direction.Up: {
        increaseTheCoins = ghostEdible ? CoinValue.Ten :  isEdible(gameField, Direction.Up, hackman.getPosition);

        gameField = hackmanMovesUp(gameField, hackman);
        break;
      }
      case Direction.Right: {
        increaseTheCoins = ghostEdible ? CoinValue.Ten : isEdible(gameField, Direction.Right, hackman.getPosition);

        gameField = hackmanMovesRight(gameField, hackman);
        break;
      }
      case Direction.Down: {
        increaseTheCoins = ghostEdible ? CoinValue.Ten : isEdible(gameField, Direction.Down, hackman.getPosition);
        
        gameField = hackmanMovesDown(gameField, hackman);
        break;
      }
      case Direction.Left: {
        increaseTheCoins = ghostEdible ? CoinValue.Ten : isEdible(gameField, Direction.Left, hackman.getPosition); 

        gameField = hackmanMovesLeft(gameField, hackman);
        break;
      }
    }
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