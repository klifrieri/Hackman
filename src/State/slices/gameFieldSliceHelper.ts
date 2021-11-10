import GhostCharacter from "../../Types/Character/GhostCharacter";
import HackmanCharacter from "../../Types/Character/HackmanCharacter";
import CoinValue from "../../Types/CoinValue";
import Moveable from "../../Types/Moveable";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { moveHackman } from "../../UtilityFunctions/move/MoveHackman";
import { setRandomDirectionAndCount } from "../../UtilityFunctions/GetRandomNumber";
import { getMovementDirectionByPosition, getDirectionByMovementDirection, getMovementDirectionByPositionRevert, getPossibleDirections, canMove } from "../../UtilityFunctions/move/CanMove";
import { moveGhostSmart, moveGhostDumb, ghostEatsHackman } from "../../UtilityFunctions/move/MoveGhost";
import Direction from "../../Types/Direction";
import Coordinate from "../../Types/Coordinate";
import BlueGhost from "../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import RedGhost from "../../Components/GameFieldComponent/GhostComponents/RedGhost";
import OrangeGhost from "../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import GreenGhost from "../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import React from "react";
import CharacterIdentifier from "../../Types/CharacterIdentifier";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";

const hackmanTick = (gameField: React.FC<any>[][], hackman: WritableDraft<HackmanCharacter>, ghosts: WritableDraft<GhostCharacter>[]):CoinValue => {
    let increaseCoins: CoinValue = 0;
    if (hackman.moveable !== Moveable.No) {
        increaseCoins = moveHackman(gameField, hackman, ghosts);
    }
    return increaseCoins;
}

const ghostsTick = (gameFieldForGhosts: React.FC<any>[][], hackman: WritableDraft<HackmanCharacter>, ghosts: WritableDraft<GhostCharacter>[]) => {
    ghosts.forEach((ghost: WritableDraft<GhostCharacter>) => {
        if (ghost.shallTick) {
            if (ghost.isSmart && !ghost.isEdible) {

                ghost.movementDirection = getMovementDirectionByPosition(
                    hackman.position,
                    ghost.position
                );
                ghost.direction = getDirectionByMovementDirection(
                    ghost.movementDirection,
                    gameFieldForGhosts,
                    ghost,
                    ghosts
                );
                moveGhostSmart(
                    gameFieldForGhosts,
                    ghost,
                    ghosts,
                    hackman
                );

            }
            else if (ghost.isSmart && ghost.isEdible) {
                ghost.movementDirection = getMovementDirectionByPositionRevert(
                    hackman.position,
                    ghost.position
                );
                ghost.direction = getDirectionByMovementDirection(
                    ghost.movementDirection,
                    gameFieldForGhosts,
                    ghost,
                    ghosts
                );
                moveGhostSmart(
                    gameFieldForGhosts,
                    ghost,
                    ghosts,
                    hackman
                );
            }
            else {
                // dumb move
                if (ghost.needsNewCountDeclaration() || ghost.moveable === Moveable.No) {
                    const canMoveDirections: { direction: Direction; bewegungMoeglich: Moveable; }[] = getPossibleDirections(gameFieldForGhosts, ghost.position);
                    ghost = setRandomDirectionAndCount(ghost, canMoveDirections);
                }
                else {
                    ghost.moveable = canMove(
                        gameFieldForGhosts,
                        ghost.position,
                        ghost.direction,
                        undefined,
                        ghost.isEdible
                    );
                }

                moveGhostDumb(
                    gameFieldForGhosts,
                    ghost,
                    ghosts,
                    hackman
                );
            }
        }
    });
}

const increaseScoreAndEatenCoins = (increaseCoins: CoinValue): { shallIncreaseEatenCoins: boolean, increaseScoreBy: number } => {
    switch (increaseCoins) {
        case CoinValue.Zero:
            return { shallIncreaseEatenCoins: false, increaseScoreBy: 0 };
        case CoinValue.One:
            return { shallIncreaseEatenCoins: true, increaseScoreBy: 1 };
        case CoinValue.Five:
            return { shallIncreaseEatenCoins: true, increaseScoreBy: 5 };
        case CoinValue.Ten:
            return { shallIncreaseEatenCoins: false, increaseScoreBy: 10 };
        default:
            return { shallIncreaseEatenCoins: false, increaseScoreBy: 0 };
    }
}

const mergeGameFields = (hackman: WritableDraft<HackmanCharacter>, ghosts: WritableDraft<GhostCharacter>[], gameFieldForHackman: React.FC<any>[][], gameFieldForGhosts: React.FC<any>[][]): React.FC<any>[][] => {
    // switch (gameFieldForGhosts[hackman.position.y][hackman.position.x]) {
    //     case GreenGhost:
    //         if (ghosts[0].isEdible) {
    //             resetGreenGhost(gameFieldForGhosts, ghosts[0]);
    //         }
    //         else {
    //             ghostEatsHackman(gameFieldForGhosts, ghosts, hackman);
    //         }
    //         break;
    //     case RedGhost:
    //         if (ghosts[1].isEdible) {
    //             resetGreenGhost(gameFieldForGhosts, ghosts[1]);
    //         }
    //         else {
    //             ghostEatsHackman(gameFieldForGhosts, ghosts, hackman);
    //         }
    //         break;
    //     case OrangeGhost:
    //         if (ghosts[2].isEdible) {
    //             resetGreenGhost(gameFieldForGhosts, ghosts[2]);
    //         }
    //         else {
    //             ghostEatsHackman(gameFieldForGhosts, ghosts, hackman);
    //         }
    //         break;
    //     case BlueGhost:
    //         if (ghosts[3].isEdible) {
    //             resetGreenGhost(gameFieldForGhosts, ghosts[3]);
    //         }
    //         else {
    //             ghostEatsHackman(gameFieldForGhosts, ghosts, hackman);
    //         }
    //         break;
    // }
    ghosts.forEach((ghost: WritableDraft<GhostCharacter>) => {
        if (ghost.position.y === hackman.position.y && ghost.position.x === hackman.position.x) {
            if (ghost.isEdible) {
                ghost.resetToStartPosition();
                switch (ghost.name) {
                    case CharacterIdentifier.GreenGhost:
                        gameFieldForGhosts[ghost.position.y][ghost.position.x] = GreenGhost;
                      break;
                    case CharacterIdentifier.RedGhost:
                        gameFieldForGhosts[ghost.position.y][ghost.position.x] = RedGhost;
                      break;
                    case CharacterIdentifier.OrangeGhost:
                        gameFieldForGhosts[ghost.position.y][ghost.position.x] = OrangeGhost;
                      break;
                    case CharacterIdentifier.BlueGhost:
                        gameFieldForGhosts[ghost.position.y][ghost.position.x] = BlueGhost;
                      break;
                  }
            }
            else {
                ghostEatsHackman(gameFieldForGhosts, ghosts, hackman);
                return gameFieldForGhosts;
            }
        }
    });
    if(hackman.moveable !== Moveable.No){
        const {y,x} = getHackmanIndex(gameFieldForGhosts);
        gameFieldForGhosts[y][x] = Empty;
        gameFieldForGhosts[hackman.position.y][hackman.position.x] = Hackman;
    }
    return gameFieldForGhosts;
}

function getHackmanIndex(gameField:React.FC<any>[][]):{y:number,x:number} {
    for (var i = 0; i < gameField.length; i++) {
      var index = gameField[i].indexOf(Hackman);
      if (index > -1) {
        return {y:i,x:index};
      }
    }
    return {y:0,x:0};
  }

export { hackmanTick, ghostsTick, increaseScoreAndEatenCoins, mergeGameFields }