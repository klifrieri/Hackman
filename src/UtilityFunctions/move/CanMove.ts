import Coin from "./../../Components/GameFieldComponent/FieldComponents/Path/Coin";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import GreenGhost from "../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import BlueGhost from "../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import OrangeGhost from "../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import RedGhost from "../../Components/GameFieldComponent/GhostComponents/RedGhost";
import Snack from "../../Components/GameFieldComponent/FieldComponents/Path/Snack";
import Moveable from "../../Types/Moveable";
import Coordinate from "../../Types/Coordinate";
import Direction from "../../Types/Direction";
import CoinValue from "../../Types/CoinValue";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import GhostCharacter from "../../Types/Character/GhostCharacter";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";

function canMoveUp(spielFeld: React.FC<{}>[][], position: Coordinate, ghosts?: WritableDraft<GhostCharacter>[], isEdibleGhost?: boolean): Moveable {
  let positionValue = position.y - 1;
  if (spielFeld[positionValue] === undefined) {
    return Moveable.Portal;
  }
  else if (spielFeld[positionValue][position.x] === Empty ||
    spielFeld[positionValue][position.x] === Coin ||
    spielFeld[positionValue][position.x] === Snack) {
    return Moveable.Yes;
  }
  else if (ghosts) {
    if (ghosts[0].isEdible && spielFeld[positionValue][position.x] === GreenGhost) {
      return Moveable.GhostEdible1;
    }
    else if (ghosts[1].isEdible && spielFeld[positionValue][position.x] === BlueGhost) {
      return Moveable.GhostEdible2;
    }
    else if (ghosts[2].isEdible && spielFeld[positionValue][position.x] === OrangeGhost) {
      return Moveable.GhostEdible3;
    }
    else if (ghosts[3].isEdible && spielFeld[positionValue][position.x] === RedGhost) {
      return Moveable.GhostEdible4;
    }
    else {
      return Moveable.No;
    }
  }
  else if (isEdibleGhost !== undefined) {
    if (spielFeld[positionValue][position.x] === Hackman && !isEdibleGhost) {
      return Moveable.Hackman;
    }
    else {
      return Moveable.No;
    }
  }
  else {
    return Moveable.No;
  }
}

function canMoveDown(spielFeld: React.FC<{}>[][], position: Coordinate, ghosts?: WritableDraft<GhostCharacter>[], isEdibleGhost?: boolean): Moveable {
  let positionValue = position.y + 1;
  if (spielFeld[positionValue] === undefined) {
    return Moveable.Portal;
  }
  else if (spielFeld[positionValue][position.x] === Empty ||
    spielFeld[positionValue][position.x] === Coin ||
    spielFeld[positionValue][position.x] === Snack) {
    return Moveable.Yes;
  }
  else if (ghosts) {
    if (ghosts[0].isEdible && spielFeld[positionValue][position.x] === GreenGhost) {
      return Moveable.GhostEdible1;
    }
    else if (ghosts[1].isEdible && spielFeld[positionValue][position.x] === BlueGhost) {
      return Moveable.GhostEdible2;
    }
    else if (ghosts[2].isEdible && spielFeld[positionValue][position.x] === OrangeGhost) {
      return Moveable.GhostEdible3;
    }
    else if (ghosts[3].isEdible && spielFeld[positionValue][position.x] === RedGhost) {
      return Moveable.GhostEdible4;
    }
    else {
      return Moveable.No;
    }
  }
  else if (isEdibleGhost !== undefined) {
    if (spielFeld[positionValue][position.x] === Hackman && !isEdibleGhost) {
      return Moveable.Hackman;
    }
    else {
      return Moveable.No;
    }
  }
  else {
    return Moveable.No;
  }
}

function canMoveLeft(spielFeld: React.FC<{}>[][], position: Coordinate, ghosts?: WritableDraft<GhostCharacter>[], isEdibleGhost?: boolean): Moveable {
  let positionValue = position.x - 1;
  if (spielFeld[position.y][positionValue] === undefined) {
    return Moveable.Portal;
  }
  else if (spielFeld[position.y][positionValue] === Empty ||
    spielFeld[position.y][positionValue] === Coin ||
    spielFeld[position.y][positionValue] === Snack) {
    return Moveable.Yes;
  }
  else if (ghosts) {
    if (ghosts[0].isEdible && spielFeld[position.y][positionValue] === GreenGhost) {
      return Moveable.GhostEdible1;
    }
    else if (ghosts[1].isEdible && spielFeld[position.y][positionValue] === BlueGhost) {
      return Moveable.GhostEdible2;
    }
    else if (ghosts[2].isEdible && spielFeld[position.y][positionValue] === OrangeGhost) {
      return Moveable.GhostEdible3;
    }
    else if (ghosts[3].isEdible && spielFeld[position.y][positionValue] === RedGhost) {
      return Moveable.GhostEdible4;
    }
    else {
      return Moveable.No;
    }
  }
  else if (isEdibleGhost !== undefined) {
    if (spielFeld[position.y][positionValue] === Hackman && !isEdibleGhost) {
      return Moveable.Hackman;
    }
    else {
      return Moveable.No;
    }
  }
  else {
    return Moveable.No;
  }
}

function canMoveRight(spielFeld: React.FC<{}>[][], position: Coordinate, ghosts?: WritableDraft<GhostCharacter>[], isEdibleGhost?: boolean): Moveable {
  let positionValue = position.x + 1;
  if (spielFeld[position.y][positionValue] === undefined) {
    return Moveable.Portal;
  }
  else if (spielFeld[position.y][positionValue] === Empty ||
    spielFeld[position.y][positionValue] === Coin ||
    spielFeld[position.y][positionValue] === Snack) {
    return Moveable.Yes;
  }
  else if (ghosts) {
    if (ghosts[0].isEdible && spielFeld[position.y][positionValue] === GreenGhost) {
      return Moveable.GhostEdible1;
    }
    else if (ghosts[1].isEdible && spielFeld[position.y][positionValue] === BlueGhost) {
      return Moveable.GhostEdible2;
    }
    else if (ghosts[2].isEdible && spielFeld[position.y][positionValue] === OrangeGhost) {
      return Moveable.GhostEdible3;
    }
    else if (ghosts[3].isEdible && spielFeld[position.y][positionValue] === RedGhost) {
      return Moveable.GhostEdible4;
    }
    else {
      return Moveable.No;
    }
  }
  else if (isEdibleGhost !== undefined) {
    
    if (spielFeld[position.y][positionValue] === Hackman && !isEdibleGhost) {
      return Moveable.Hackman;
    }
    else {
      return Moveable.No;
    }
  }
  else {
    return Moveable.No;
  }
}

function canMove(gameField: React.FC<{}>[][], position: Coordinate, direction: Direction, ghosts?: WritableDraft<GhostCharacter>[], isEdibleGhost?: boolean): Moveable {
  switch (direction) {
    case Direction.Up: {
      return canMoveUp(gameField, position, ghosts, isEdibleGhost);
    }
    case Direction.Left: {
      return canMoveLeft(gameField, position, ghosts, isEdibleGhost);
    }
    case Direction.Down: {
      return canMoveDown(gameField, position, ghosts, isEdibleGhost);
    }
    case Direction.Right: {
      return canMoveRight(gameField, position, ghosts, isEdibleGhost);
    }
    default:
      return Moveable.No;
  }
}

function getPossibleDirections(spielFeld: React.FC<{}>[][], position: Coordinate): { direction: Direction; bewegungMoeglich: Moveable; }[] {
  let _canMoveUp = {
    direction: Direction.Up,
    bewegungMoeglich: canMoveUp(spielFeld, position)
  }
  let _canMoveDown = {
    direction: Direction.Down,
    bewegungMoeglich: canMoveDown(spielFeld, position)
  }
  let _canMoveLeft = {
    direction: Direction.Left,
    bewegungMoeglich: canMoveLeft(spielFeld, position)
  }
  let _canMoveRight = {
    direction: Direction.Right,
    bewegungMoeglich: canMoveRight(spielFeld, position)
  }

  let canMoveDirections: { direction: Direction; bewegungMoeglich: Moveable; }[] = [];

  if (_canMoveUp.bewegungMoeglich !== Moveable.No) {
    canMoveDirections.push(_canMoveUp);
  }
  if (_canMoveDown.bewegungMoeglich !== Moveable.No) {
    canMoveDirections.push(_canMoveDown);
  }
  if (_canMoveLeft.bewegungMoeglich !== Moveable.No) {
    canMoveDirections.push(_canMoveLeft);
  }
  if (_canMoveRight.bewegungMoeglich !== Moveable.No) {
    canMoveDirections.push(_canMoveRight);
  }

  return canMoveDirections;
}

// returns the written statistical Value of the next Field by Direction
function isEdible(gameField: React.FC<{}>[][], direction: Direction, position: Coordinate): CoinValue {
  switch (direction) {
    case Direction.Up: {
      if (gameField[position.y - 1][position.x] === Coin) return CoinValue.One;
      else if (gameField[position.y - 1][position.x] === Snack) return CoinValue.Five;
      else return CoinValue.Zero;
    }
    case Direction.Left: {
      if (gameField[position.y][position.x - 1] === Coin) return CoinValue.One;
      else if (gameField[position.y][position.x - 1] === Snack) return CoinValue.Five;
      else return CoinValue.Zero;
    }
    case Direction.Down: {
      if (gameField[position.y + 1][position.x] === Coin) return CoinValue.One;
      else if (gameField[position.y + 1][position.x] === Snack) return CoinValue.Five;
      else return CoinValue.Zero;
    }
    case Direction.Right: {
      if (gameField[position.y][position.x + 1] === Coin) return CoinValue.One;
      else if (gameField[position.y][position.x + 1] === Snack) return CoinValue.Five;
      else return CoinValue.Zero;
    }
    default:
      return CoinValue.Zero;
  }
}

export { canMove, canMoveRight, canMoveLeft, canMoveDown, canMoveUp, getPossibleDirections, isEdible };
