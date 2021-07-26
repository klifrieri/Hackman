import Character from "../../Classes/Character";
import Empty from "../../Components/Empty";
import Moveable from "../../Types/Moveable";
import Direction from "../../Types/Direction";
import { canMove, checkCoins } from "./CanMove";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import React from "react";


function hackmanMovesUp(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>,hackComponent:React.FC<any>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y - 1][hackman.getPosition.x] = hackComponent;
  hackman.setPositionY = hackman.getPosition.y - 1;
  return spielFeldCopy;
}

function hackmanMovesRight(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>,hackComponent:React.FC<any>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x + 1] = hackComponent;
  hackman.setPositionX = hackman.getPosition.x + 1;
  return spielFeldCopy;
}

function hackmanMovesDown(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>,hackComponent:React.FC<any>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y + 1][hackman.getPosition.x] = hackComponent;
  hackman.setPositionY = hackman.getPosition.y + 1;
  return spielFeldCopy;
}

function hackmanMovesLeft(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>,hackComponent:React.FC<any>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x - 1] = hackComponent;
  hackman.setPositionX = hackman.getPosition.x - 1;
  return spielFeldCopy;
}

function hackmanMovesUpTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>,hackComponent:React.FC<any>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[spielFeldCopy.length - 1][hackman.getPosition.x] = hackComponent;
  hackman.setPositionY = spielFeldCopy.length - 1;
  return spielFeldCopy;
}

function hackmanMovesRightTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>,hackComponent:React.FC<any>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y][0] = hackComponent;
  hackman.setPositionX = 0;
  return spielFeldCopy;
}

function hackmanMovesLeftTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>,hackComponent:React.FC<any>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[hackman.getPosition.y][spielFeldCopy[0].length - 1] = hackComponent;
  hackman.setPositionX = spielFeldCopy[0].length - 1;
  return spielFeldCopy;
}

function hackmanMovesDownTroughPortal(spielFeldCopy: React.FC<{}>[][], hackman: WritableDraft<Character>,hackComponent:React.FC<any>): React.FC<{}>[][] {
  spielFeldCopy[hackman.getPosition.y][hackman.getPosition.x] = Empty;
  spielFeldCopy[0][hackman.getPosition.x] = hackComponent;
  hackman.setPositionY = 0;
  return spielFeldCopy;
}

function moveHackman(gameField: React.FC<{}>[][], hackman: WritableDraft<Character>,hackComponent:React.FC<any>): { gameField: React.FC<{}>[][], increaseCoins: boolean } {
  let increaseCoins: boolean = false;
  if (hackman.getBewegungMoeglich === Moveable.Yes) {
    switch (hackman.getBewegungsRichtung) {
      case Direction.Up: {
        if (checkCoins(gameField, Direction.Up, hackman.getPosition)) {
          increaseCoins = true;
        }
        gameField = hackmanMovesUp(gameField, hackman,hackComponent);
        break;
      }
      case Direction.Right: {
        if (checkCoins(gameField, Direction.Right, hackman.getPosition)) {
          increaseCoins = true;
        }
        gameField = hackmanMovesRight(gameField, hackman,hackComponent);
        break;
      }
      case Direction.Down: {
        if (checkCoins(gameField, Direction.Down, hackman.getPosition)) {
          increaseCoins = true;
        }
        gameField = hackmanMovesDown(gameField, hackman,hackComponent);
        break;
      }
      case Direction.Left: {
        if (checkCoins(gameField, Direction.Left, hackman.getPosition)) {
          increaseCoins = true;
        }
        gameField = hackmanMovesLeft(gameField, hackman,hackComponent);
        break;
      }
    }
  }
  else if (hackman.getBewegungMoeglich === Moveable.Portal) {
    switch (hackman.getBewegungsRichtung) {
      case Direction.Up: {
        gameField = hackmanMovesUpTroughPortal(gameField, hackman,hackComponent);
        break;
      }
      case Direction.Right: {
        gameField = hackmanMovesRightTroughPortal(gameField, hackman,hackComponent);
        break;
      }
      case Direction.Down: {
        gameField = hackmanMovesDownTroughPortal(gameField, hackman,hackComponent);
        break;
      }
      case Direction.Left: {
        gameField = hackmanMovesLeftTroughPortal(gameField, hackman,hackComponent);
        break;
      }
    }
  }
  hackman.setBewegungMoeglich = canMove(gameField,hackman.getPosition,hackman.getBewegungsRichtung);
  return { gameField, increaseCoins };
};

export { hackmanMovesDownTroughPortal, hackmanMovesDown, hackmanMovesRightTroughPortal, hackmanMovesRight, hackmanMovesUpTroughPortal, hackmanMovesUp, hackmanMovesLeftTroughPortal, hackmanMovesLeft, moveHackman };