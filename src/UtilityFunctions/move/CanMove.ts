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
import MovementDirection from "../../Types/MovementDirection";
import Gate from "../../Components/GameFieldComponent/FieldComponents/Path/Gate";

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
  }
  else if (directionComponent.x > movingComponent.x && directionComponent.y < movingComponent.y) {
    return MovementDirection.NorthEast;
  }
  else if (directionComponent.x < movingComponent.x && directionComponent.y < movingComponent.y) {
    return MovementDirection.NorthWest;
  }
  else if (directionComponent.x === movingComponent.x && directionComponent.y > movingComponent.y) {
    return MovementDirection.South;
  }
  else if (directionComponent.x > movingComponent.x && directionComponent.y > movingComponent.y) {
    return MovementDirection.SouthEast;
  }
  else if (directionComponent.x < movingComponent.x && directionComponent.y > movingComponent.y) {
    return MovementDirection.SouthWest;
  }
  else if (directionComponent.x < movingComponent.x && directionComponent.y === movingComponent.y) {
    return MovementDirection.West;
  }
  else if (directionComponent.x > movingComponent.x && directionComponent.y === movingComponent.y) {
    return MovementDirection.East;
  }
  else return MovementDirection.None;
}

export function getMovementDirectionByPositionRevert(directionComponent: Coordinate, movingComponent: Coordinate): MovementDirection {
  if (directionComponent.x === movingComponent.x && directionComponent.y < movingComponent.y) {
    if ((directionComponent.y - movingComponent.y) < -4)
      return MovementDirection.North;
    else
      return MovementDirection.South
  } else if (directionComponent.x > movingComponent.x && directionComponent.y < movingComponent.y) {
    if ((directionComponent.y - movingComponent.y) < -4 || (directionComponent.x - movingComponent.x) > 5)
      return MovementDirection.NorthEast
    else
      return MovementDirection.SouthWest;
  } else if (directionComponent.x < movingComponent.x && directionComponent.y < movingComponent.y) {
    if ((directionComponent.y - movingComponent.y) < -4 || (movingComponent.x - directionComponent.x > 5))
      return MovementDirection.NorthWest
    else
      return MovementDirection.SouthEast;
  } else if (directionComponent.x === movingComponent.x && directionComponent.y > movingComponent.y) {
    if ((directionComponent.y - movingComponent.y) > 4)
      return MovementDirection.South
    else
      return MovementDirection.North;
  } else if (directionComponent.x > movingComponent.x && directionComponent.y > movingComponent.y) {
    if ((directionComponent.y - movingComponent.y) > 4 || (directionComponent.x - movingComponent.x) > 5)
      return MovementDirection.SouthEast
    else
      return MovementDirection.NorthWest;
  } else if (directionComponent.x < movingComponent.x && directionComponent.y > movingComponent.y) {
    if ((directionComponent.y - movingComponent.y) > 4 || (movingComponent.x - directionComponent.x) > 5)
      return MovementDirection.SouthWest
    else
      return MovementDirection.NorthEast;
  } else if (directionComponent.x < movingComponent.x && directionComponent.y === movingComponent.y) {
    if ((movingComponent.x - directionComponent.x) > 5)
      return MovementDirection.West
    else
      return MovementDirection.East;
  } else if (directionComponent.x > movingComponent.x && directionComponent.y === movingComponent.y) {
    if ((directionComponent.y - movingComponent.y) > 4)
      return MovementDirection.East
    else
      return MovementDirection.West;
  } else return MovementDirection.None;
}

export function getDirectionByMovementDirection(movementDirection: MovementDirection, gameField: React.FC<{}>[][], actualGhost: WritableDraft<GhostCharacter>, ghosts: WritableDraft<GhostCharacter>[]) {
  switch (movementDirection) {
    case MovementDirection.North:
      if (canMoveUp(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Up;
      }
      else if (canMoveRight(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Right;
      }
      else if (canMoveLeft(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Left;
      }
      else {
        return Direction.Nothing;
      }
    case MovementDirection.NorthEast:
      if (canMoveRight(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Right;
      }
      else if (canMoveUp(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Up;
      }
      else if (canMoveDown(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Down;
      }
      else {
        return Direction.Nothing;
      }
    case MovementDirection.NorthWest:
      if (canMoveUp(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Up;
      }
      else if (canMoveLeft(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Left;
      }
      else if (canMoveRight(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Right;
      }
      else {
        return Direction.Nothing;
      }
    case MovementDirection.South:
      if (canMoveDown(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Down;
      }
      else if (canMoveLeft(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Left;
      }
      else if (canMoveRight(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Right;
      }
      else {
        return Direction.Nothing;
      }
    case MovementDirection.SouthEast:
      if (canMoveDown(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Down;
      }
      else if (canMoveRight(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Right;
      }
      else if (canMoveLeft(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Left;
      }
      else {
        return Direction.Nothing;
      }
    case MovementDirection.SouthWest:
      if (canMoveLeft(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Left;
      }
      else if (canMoveDown(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Down;
      }
      else if (canMoveUp(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Up;
      }
      else {
        return Direction.Nothing;
      }
    case MovementDirection.East:
      if (canMoveRight(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Right;
      }
      else if (canMoveDown(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Down;
      }
      else if (canMoveUp(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Up;
      }
      else {
        return Direction.Nothing;
      }
    case MovementDirection.West:
      if (canMoveLeft(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Left;
      }
      else if (canMoveUp(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Up;
      }
      else if (canMoveDown(gameField, actualGhost.position) !== Moveable.No) {
        return Direction.Down;
      }
      else {
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
