import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import Coin from "../../Components/GameFieldComponent/FieldComponents/Path/Coin";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import Snack from "../../Components/GameFieldComponent/FieldComponents/Path/Snack";
import BlueGhost from "../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import GreenGhost from "../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import OrangeGhost from "../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import RedGhost from "../../Components/GameFieldComponent/GhostComponents/RedGhost";
import BaseCharacter from "../../Types/Character/base/BaseCharacter";
import Coordinate from "../../Types/Coordinate";
import Direction from "../../Types/Direction";
import Moveable from "../../Types/Moveable";

const changeCharacterPosition = (character: WritableDraft<BaseCharacter>) => {
    if (character.moveable === Moveable.Yes) {
        switch (character.direction) {
            case Direction.Up: {
                character.moveUp();
                break;
            }
            case Direction.Right: {
                character.moveRight();
                break;
            }
            case Direction.Down: {
                character.moveDown();
                break;
            }
            case Direction.Left: {
                character.moveUp();
                break;
            }
        }
    }
    else if (character.moveable === Moveable.Portal) {
        switch (character.direction) {
            case Direction.Right: {
                character.moveRightTroughPortal();
                break;
            }
            case Direction.Left: {
                character.moveLeftTroughPortal();
                break;
            }
        }
    }
};

const moveableYesComponents = [Coin, Empty, Snack, BlueGhost, RedGhost, OrangeGhost, GreenGhost];

const canMoveUp=(spielFeld: React.FC<{}>[][], position: Coordinate): Moveable =>{
    let positionValue = position.y - 1;
    if (spielFeld[positionValue] === undefined) {
        return Moveable.Portal;
    }
    else if (moveableYesComponents.includes(spielFeld[positionValue][position.x])) {
        return Moveable.Yes;
    }
    else {
        return Moveable.No;
    }
}
const canMoveDown=(spielFeld: React.FC<{}>[][], position: Coordinate): Moveable =>{
    let positionValue = position.y + 1;
    if (spielFeld[positionValue] === undefined) {
        return Moveable.Portal;
    }
    else if (moveableYesComponents.includes(spielFeld[positionValue][position.x])) {
        return Moveable.Yes;
    }
    else {
        return Moveable.No;
    }
}
const canMoveLeft=(spielFeld: React.FC<{}>[][], position: Coordinate): Moveable =>{
    let positionValue = position.x - 1;
    if (spielFeld[position.y][positionValue] === undefined) {
        return Moveable.Portal;
    }

    else if (moveableYesComponents.includes(spielFeld[position.y][positionValue])) {
        return Moveable.Yes;
    }
    else {
        return Moveable.No;
    }
}
const canMoveRight=(spielFeld: React.FC<{}>[][], position: Coordinate): Moveable =>{
    let positionValue = position.x + 1;
    if (spielFeld[position.y][positionValue] === undefined) {
        return Moveable.Portal;
    }
    else if (moveableYesComponents.includes(spielFeld[position.y][positionValue])) {
        return Moveable.Yes;
    }
    else {
        return Moveable.No;
    }
}
const determineIfMoveable=(gameField: React.FC<{}>[][], position: Coordinate, direction: Direction): Moveable =>{
    switch (direction) {
        case Direction.Up: {
            return canMoveUp(gameField, position);
        }
        case Direction.Left: {
            return canMoveLeft(gameField, position);
        }
        case Direction.Down: {
            return canMoveDown(gameField, position);
        }
        case Direction.Right: {
            return canMoveRight(gameField, position);
        }
        default:
            return Moveable.No;
    }
}

export {determineIfMoveable,changeCharacterPosition}