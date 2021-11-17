import { FC } from "react";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import HackmanCharacter from "../../Types_Classes/Character/HackmanCharacter";
import Coordinate from "../../Types_Classes/Character/Models/Coordinate";
import Direction from "../../Types_Classes/Character/Models/Direction";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { setGameFieldByGhostName } from "./gameTickHelper";
import GhostCharacter from "../../Types_Classes/Character/Base/GhostCharacter";

const getTargetCoordinate = (hackmanDirection: Direction, hackmanPosition: Coordinate): Coordinate | undefined => {
    let y = hackmanPosition.y;
    let x = hackmanPosition.x;
    switch (hackmanDirection) {
        case Direction.Up: {
            y -= 2;
            break;
        }
        case Direction.Right: {
            x = x + 2;
            break;
        }
        case Direction.Down: {
            y += 2;
            break;
        }
        case Direction.Left: {
            x = x - 2;
            break;
        }
        default:
            return undefined;
    }
    return new Coordinate(y, x);
}

const letHackmanJump = (gameField: FC<any>[][], hackman: WritableDraft<HackmanCharacter>, targetCoordinate: Coordinate) => {
    gameField[hackman.position.y][hackman.position.x] = Empty;
    gameField[targetCoordinate.y][targetCoordinate.x] = Hackman;
    hackman.position.y = targetCoordinate.y;
    hackman.position.x = targetCoordinate.x;
    hackman.determineIfMoveable(gameField);
}

const eatGhost=(gameField:FC<any>[][],ghost:WritableDraft<GhostCharacter>)=> {
    ghost.resetToStartPosition();
    setGameFieldByGhostName(gameField,ghost.name,ghost.position);
}

export { getTargetCoordinate,letHackmanJump,eatGhost };
