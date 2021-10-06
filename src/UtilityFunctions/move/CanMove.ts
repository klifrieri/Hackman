import Coin from "./../../Components/GameFieldComponent/FieldComponents/Path/Coin";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import Ghost1 from "../../Components/GameFieldComponent/GhostComponents/Ghost1";
import Ghost2 from "../../Components/GameFieldComponent/GhostComponents/Ghost2";
import Ghost3 from "../../Components/GameFieldComponent/GhostComponents/Ghost3";
import Ghost4 from "../../Components/GameFieldComponent/GhostComponents/Ghost4";
import Snack from "../../Components/GameFieldComponent/FieldComponents/Path/Snack";
import Moveable from "../../Types/Moveable";
import Coordinate from "../../Types/Coordinate";
import Direction from "../../Types/Direction";
import CoinValue from "../../Types/CoinValue";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import GhostCharacter from "../../Types/Character/GhostCharacter";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import MovementDirection from "../../Types/MovementDirection";
import { Dir } from "fs";

export function canMoveUp(spielFeld: React.FC<{}>[][], position: Coordinate, ghosts?: WritableDraft<GhostCharacter>[], isEdibleGhost?: boolean): Moveable {
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
    if (ghosts[0].isEdible && spielFeld[positionValue][position.x] === Ghost1) {
      return Moveable.GhostEdible1;
    }
    else if (ghosts[1].isEdible && spielFeld[positionValue][position.x] === Ghost2) {
      return Moveable.GhostEdible2;
    }
    else if (ghosts[2].isEdible && spielFeld[positionValue][position.x] === Ghost3) {
      return Moveable.GhostEdible3;
    }
    else if (ghosts[3].isEdible && spielFeld[positionValue][position.x] === Ghost4) {
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

export function canMoveDown(spielFeld: React.FC<{}>[][], position: Coordinate, ghosts?: WritableDraft<GhostCharacter>[], isEdibleGhost?: boolean): Moveable {
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
    if (ghosts[0].isEdible && spielFeld[positionValue][position.x] === Ghost1) {
      return Moveable.GhostEdible1;
    }
    else if (ghosts[1].isEdible && spielFeld[positionValue][position.x] === Ghost2) {
      return Moveable.GhostEdible2;
    }
    else if (ghosts[2].isEdible && spielFeld[positionValue][position.x] === Ghost3) {
      return Moveable.GhostEdible3;
    }
    else if (ghosts[3].isEdible && spielFeld[positionValue][position.x] === Ghost4) {
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

export function canMoveLeft(spielFeld: React.FC<{}>[][], position: Coordinate, ghosts?: WritableDraft<GhostCharacter>[], isEdibleGhost?: boolean): Moveable {
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
    if (ghosts[0].isEdible && spielFeld[position.y][positionValue] === Ghost1) {
      return Moveable.GhostEdible1;
    }
    else if (ghosts[1].isEdible && spielFeld[position.y][positionValue] === Ghost2) {
      return Moveable.GhostEdible2;
    }
    else if (ghosts[2].isEdible && spielFeld[position.y][positionValue] === Ghost3) {
      return Moveable.GhostEdible3;
    }
    else if (ghosts[3].isEdible && spielFeld[position.y][positionValue] === Ghost4) {
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

export function canMoveRight(spielFeld: React.FC<{}>[][], position: Coordinate, ghosts?: WritableDraft<GhostCharacter>[], isEdibleGhost?: boolean): Moveable {
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
    if (ghosts[0].isEdible && spielFeld[position.y][positionValue] === Ghost1) {
      return Moveable.GhostEdible1;
    }
    else if (ghosts[1].isEdible && spielFeld[position.y][positionValue] === Ghost2) {
      return Moveable.GhostEdible2;
    }
    else if (ghosts[2].isEdible && spielFeld[position.y][positionValue] === Ghost3) {
      return Moveable.GhostEdible3;
    }
    else if (ghosts[3].isEdible && spielFeld[position.y][positionValue] === Ghost4) {
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

export function canMove(gameField: React.FC<{}>[][], position: Coordinate, direction: Direction, ghosts?: WritableDraft<GhostCharacter>[], isEdibleGhost?: boolean): Moveable {
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



// returns the written statistical Value of the next Field by Direction
export function isEdible(gameField: React.FC<{}>[][], direction: Direction, position: Coordinate): CoinValue {
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

// returns the cardinal direction from the movingComponent to the directionComponent
export function getMovementDirectionByPosition(directionComponent: Coordinate, movingComponent: Coordinate): MovementDirection {
  if (directionComponent.x === movingComponent.x && directionComponent.y < movingComponent.y) {
    return MovementDirection.North;
  } else if (directionComponent.x > movingComponent.x && directionComponent.y < movingComponent.y) {
    return MovementDirection.NorthEast;
  } else if (directionComponent.x < movingComponent.x && directionComponent.y < movingComponent.y) {
    return MovementDirection.NorthWest;
  } else if (directionComponent.x === movingComponent.x && directionComponent.y > movingComponent.y) {
    return MovementDirection.South;
  } else if (directionComponent.x > movingComponent.x && directionComponent.y > movingComponent.y) {
    return MovementDirection.SouthEast;
  } else if (directionComponent.x < movingComponent.x && directionComponent.y > movingComponent.y) {
    return MovementDirection.SouthWest;
  } else if (directionComponent.x < movingComponent.x && directionComponent.y === movingComponent.y) {
    return MovementDirection.West;
  } else if (directionComponent.x > movingComponent.x && directionComponent.y === movingComponent.y) {
    return MovementDirection.East;
  } else return MovementDirection.None;
}

export function getDirectionByMovementDirection(movementDirection: MovementDirection, gameField: React.FC<{}>[][], actualGhost: WritableDraft<GhostCharacter>, ghosts: WritableDraft<GhostCharacter>[]) {
  switch (movementDirection) {
    case MovementDirection.North:

      if (canMoveUp(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Up;

      } else if (canMoveRight(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Right;

      } else if (canMoveLeft(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Left;
      
      } else {
        
        return Direction.Nothing;
      }

    case MovementDirection.NorthEast:

      if (canMoveRight(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Right;

      } else if (canMoveUp(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Up;

      } else if (canMoveDown(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Down;
      
      }else {
        
        return Direction.Nothing;
      }

    case MovementDirection.NorthWest:

      if (canMoveUp(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Up;

      } else if (canMoveLeft(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Left;

      } else if (canMoveRight(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Right;
      
      } else {
        
        return Direction.Nothing;
      }

    case MovementDirection.South:

      if (canMoveDown(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Down;

      } else if (canMoveLeft(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Left;

      } else if (canMoveRight(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Right;
      
      } else {
        
        return Direction.Nothing;
      }

    case MovementDirection.SouthEast:

      if (canMoveDown(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Down;

      } else if (canMoveRight(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Right;

      } else if (canMoveLeft(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Left;
      
      } else {
        
        return Direction.Nothing;
      }

    case MovementDirection.SouthWest:

      if (canMoveLeft(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Left;

      } else if (canMoveDown(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Down;

      } else if (canMoveUp(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Up;
      } else {
        
        return Direction.Nothing;
      }

    case MovementDirection.East:

      if (canMoveRight(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Right;

      } else if (canMoveDown(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Down;

      } else if (canMoveUp(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Up;

      }
      else {
        
        return Direction.Nothing;
      }

    case MovementDirection.West:

      if (canMoveLeft(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Left;

      } else if (canMoveUp(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Up;

      } else if (canMoveDown(gameField, actualGhost.position, ghosts, actualGhost.isEdible) !== Moveable.No) {

        return Direction.Down;
      
      } else {
        
        return Direction.Nothing;
      }

    default:
      return Direction.Nothing;
  }
}

export function getPossibleDirections(spielFeld: React.FC<{}>[][], position: Coordinate): { direction: Direction; bewegungMoeglich: Moveable; }[] {
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
