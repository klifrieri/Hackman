import Coin from "../../Components/GameFieldComponent/FieldComponents/Path/Coin";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import Snack from "../../Components/GameFieldComponent/FieldComponents/Path/Snack";
import BlueGhost from "../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import GreenGhost from "../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import OrangeGhost from "../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import RedGhost from "../../Components/GameFieldComponent/GhostComponents/RedGhost";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import GhostCharacter from "../../Types/Character/base/GhostCharacter";
import HackmanCharacter from "../../Types/Character/HackmanCharacter";
import CharacterIdentifier from "../../Types/CharacterIdentifier";
import CoinValue from "../../Types/CoinValue";
import Coordinate from "../../Types/Coordinate";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { FC } from "react";

const setGameFieldByGhostName = (gameField: FC<any>[][], ghostName: CharacterIdentifier, ghostPosition: Coordinate) => {
    switch (ghostName) {
        case CharacterIdentifier.GreenGhost:
            gameField[ghostPosition.y][ghostPosition.x] = GreenGhost;
            break;
        case CharacterIdentifier.RedGhost:
            gameField[ghostPosition.y][ghostPosition.x] = RedGhost;
            break;
        case CharacterIdentifier.OrangeGhost:
            gameField[ghostPosition.y][ghostPosition.x] = OrangeGhost;
            break;
        case CharacterIdentifier.BlueGhost:
            gameField[ghostPosition.y][ghostPosition.x] = BlueGhost;
            break;
    }
}

const setSingleGameField = (gameField: FC<any>[][], position: Coordinate, component: FC<any>) => {
    gameField[position.y][position.x] = component;
}

function ghostEatsHackman(gameField: React.FC<any>[][], hackman: WritableDraft<HackmanCharacter>, ghosts: WritableDraft<GhostCharacter>[]) {
    ghosts.forEach((ghost: WritableDraft<GhostCharacter>) => {
        setSingleGameField(gameField, ghost.position, ghost.cachedField);
        setSingleGameField(gameField, ghost.lastPosition, ghost.lastCachedField);
        ghost.resetToStartPosition();
        setGameFieldByGhostName(gameField, ghost.name, ghost.position);
    });
    setSingleGameField(gameField, hackman.position, Empty);
    setSingleGameField(gameField, hackman.lastPosition, Empty);
    hackman.resetToStartAndDecreaseLife();
    gameField[hackman.position.y][hackman.position.x] = Hackman;
}

const mergeGameField = (gameField: FC<any>[][], hackman: WritableDraft<HackmanCharacter>, ghosts: WritableDraft<GhostCharacter[]>): { shallIncreaseEatenCoins: boolean, increaseScoreBy: CoinValue } => {
    let shallIncreaseEatenCoins: boolean = false;
    let increaseScoreBy: CoinValue = CoinValue.Zero;

    ghosts.forEach((ghost: WritableDraft<GhostCharacter>) => {
        if (ghost.shallTick) {
            if ((hackman.position.y === ghost.position.y && hackman.position.x === ghost.position.x) || (hackman.lastPosition.y === ghost.position.y && hackman.lastPosition.x === ghost.position.x)) {
                if (ghost.isEdible) {
                    if (ghost.cachedField === Coin || ghost.cachedField === Snack) {
                        shallIncreaseEatenCoins = true;
                    }
                    increaseScoreBy = CoinValue.Ten;
                    setSingleGameField(gameField, ghost.lastPosition, ghost.lastCachedField);
                    setSingleGameField(gameField, ghost.position, Empty);
                    ghost.resetToStartPosition();
                    setGameFieldByGhostName(gameField, ghost.name, ghost.position);
                }
                else {
                    ghostEatsHackman(gameField, hackman, ghosts);
                    return { shallIncreaseEatenCoins: false, increaseScoreBy: 0 };
                }
            }
            else {
                setSingleGameField(gameField, ghost.lastPosition, ghost.lastCachedField);
                setGameFieldByGhostName(gameField, ghost.name, ghost.position);
            }
        }
    });

    if (gameField[hackman.position.y][hackman.position.x] === Coin) {
        shallIncreaseEatenCoins = true;
        increaseScoreBy = CoinValue.One;
    }
    else if (gameField[hackman.position.y][hackman.position.x] === Snack) {
        shallIncreaseEatenCoins = true;
        increaseScoreBy = CoinValue.Five;
    }
    setSingleGameField(gameField, hackman.lastPosition, Empty);
    setSingleGameField(gameField, hackman.position, Hackman);

    return { shallIncreaseEatenCoins, increaseScoreBy };
}

export { mergeGameField, ghostEatsHackman };