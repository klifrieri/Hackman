import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  canMove,
  getDirectionByMovementDirection,
  getMovementDirectionByPosition,
  getMovementDirectionByPositionRevert,
  getPossibleDirections,
} from "../../UtilityFunctions/move/CanMove";
import SpielfeldLayout from "../../SpielfeldLayout";
import { moveHackman } from "../../UtilityFunctions/move/MoveHackman";
import Direction from "../../Types/Direction";
import GhostCharacter from "../../Types/Character/GhostCharacter";
import Moveable from "../../Types/Moveable";
import { setRandomDirectionAndCount } from "../../UtilityFunctions/GetRandomNumber";
import { ghostEatsHackman, moveGhostDumb, moveGhostSmart } from "../../UtilityFunctions/move/MoveGhost";
import React from "react";
import CoinValue from "../../Types/CoinValue";
import HackmanCharacter from "../../Types/Character/HackmanCharacter";
import {
  generateBlockOnGameField,
  setGameField,
} from "../../UtilityFunctions/SpecialActions";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import MovementDirection from "../../Types/MovementDirection";
import CharacterIdentifier from "../../Types/CharacterIdentifier";
import Coin from "../../Components/GameFieldComponent/FieldComponents/Path/Coin";
import GreenGhost from "../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import RedGhost from "../../Components/GameFieldComponent/GhostComponents/RedGhost";
import OrangeGhost from "../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import BlueGhost from "../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import Coordinate from "../../Types/Coordinate";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import { resetBlueGhost, resetGreenGhost, resetOrangeGhost, resetRedGhost } from "../../UtilityFunctions/resetGhosts";

const initialStateHackman: HackmanCharacter = new HackmanCharacter(
  CharacterIdentifier.Hackman,
  12,
  10
);
const greenGhost = new GhostCharacter(CharacterIdentifier.GreenGhost, 7, 9, MovementDirection.NorthEast, true);
const redGhost = new GhostCharacter(CharacterIdentifier.RedGhost, 7, 11, MovementDirection.NorthWest, false);
const orangeGhost = new GhostCharacter(CharacterIdentifier.OrangeGhost, 9, 9, MovementDirection.NorthEast, true);
const blueGhost = new GhostCharacter(CharacterIdentifier.BlueGhost, 9, 11, MovementDirection.NorthWest, false);
const ghosts: GhostCharacter[] = [greenGhost, redGhost, orangeGhost, blueGhost];
let block: number[] = [];

const gameFieldSlice = createSlice({
  name: "game",
  initialState: {
    gameField: SpielfeldLayout(),
    eatenCoins: 0,
    hackman: initialStateHackman,
    ghosts: ghosts,
    block: block,
    isPaused: false,
    options: false,
    gameOver: false,
    win: false,
    points: 0
  },
  reducers: {
    gameTick: (state) => {
      if (!state.isPaused) {

        let gameFieldForAll: React.FC<any>[][] = state.gameField.slice();
        let increaseCoins: CoinValue = 0;

        // move Hackman
        if (state.hackman.moveable !== Moveable.No) {
          let { gameField, increaseTheCoins } = moveHackman(
            state.gameField,
            state.hackman,
            ghosts
          );
          gameFieldForAll = gameField;
          increaseCoins = increaseTheCoins;
          if (increaseCoins === CoinValue.Ten) {
            state.eatenCoins += 10;
          }
        }

        // move Ghosts
        state.ghosts.forEach((ghost) => {
          if (ghost.shallTick) {

            if (ghost.isSmart && !ghost.isEdible) {

              ghost.movementDirection = getMovementDirectionByPosition(
                state.hackman.position,
                ghost.position
              );
              ghost.direction = getDirectionByMovementDirection(
                ghost.movementDirection,
                gameFieldForAll,
                ghost,
                ghosts
              );
              gameFieldForAll = moveGhostSmart(
                gameFieldForAll,
                ghost,
                ghosts,
                state.hackman
              );

            }
            else if(ghost.isSmart && ghost.isEdible){
              ghost.movementDirection = getMovementDirectionByPositionRevert(
                state.hackman.position,
                ghost.position
              );
              ghost.direction = getDirectionByMovementDirection(
                ghost.movementDirection,
                gameFieldForAll,
                ghost,
                ghosts
              );
              gameFieldForAll = moveGhostSmart(
                gameFieldForAll,
                ghost,
                ghosts,
                state.hackman
              );
            }
            else {
              // dumb move
              if (ghost.needsNewCountDeclaration() || ghost.moveable === Moveable.No) {
                const canMoveDirections: { direction: Direction; bewegungMoeglich: Moveable; }[] = getPossibleDirections(gameFieldForAll, ghost.position);
                ghost = setRandomDirectionAndCount(ghost, canMoveDirections);
              }
              else {
                ghost.moveable = canMove(
                  gameFieldForAll,
                  ghost.position,
                  ghost.direction,
                  undefined,
                  ghost.isEdible
                );
              }

              gameFieldForAll = moveGhostDumb(
                gameFieldForAll,
                ghost,
                ghosts,
                state.hackman
              );
            }
          }
        });

        // increase eaten coins
        if (increaseCoins === CoinValue.One) {
          state.eatenCoins++;
          state.points++
        }
        else if (increaseCoins === CoinValue.Five) {
          state.eatenCoins += 5;
          state.points++
          state.ghosts.forEach((ghost) => {
            ghost.isEdible = true;
          });
        }

        // end move
        state.hackman.moveable = canMove(
          gameFieldForAll,
          state.hackman.position,
          state.hackman.direction,
          state.ghosts
        );
        state.gameField = gameFieldForAll;

      }
    },
    changeIsMoveableHackman: (state, payload: PayloadAction<Direction>) => {
      state.hackman.direction = payload.payload;
      const isMoveable: Moveable = canMove(
        state.gameField,
        state.hackman.position,
        payload.payload,
        state.ghosts
      );
      if (isMoveable === Moveable.Yes) {
        if (state.hackman.hackmanMoved === false)
          state.hackman.hackmanMoved = true;
      }
      state.hackman.moveable = isMoveable;
    },
    increaseCoins: (state) => {
      state.eatenCoins++;
    },
    activateGhost: (state, payload: PayloadAction<number>) => {
      switch (payload.payload) {
        case 1:
          state.ghosts[0].shallTick = true;
          break;
        case 2:
          state.ghosts[1].shallTick = true;
          break;
        case 3:
          state.ghosts[2].shallTick = true;
          break;
        case 4:
          state.ghosts[3].shallTick = true;
          break;
      }
    },
    setBlock: (state) => {
      let direction: Direction = state.hackman.direction;
      switch (direction) {
        case Direction.Up:
          if (
            state.hackman.canSetBlock &&
            state.gameField[state.hackman.position.y + 1][
            state.hackman.position.x
            ] === Empty
          ) {
            state.gameField = generateBlockOnGameField(
              state.hackman.position.y + 1,
              state.hackman.position.x,
              state.gameField
            );

            state.hackman.canSetBlock = false;
            state.block[0] = state.hackman.position.y + 1;
            state.block[1] = state.hackman.position.x;
          }
          break;
        case Direction.Down:
          if (
            state.hackman.canSetBlock &&
            state.gameField[state.hackman.position.y - 1][
            state.hackman.position.x
            ] === Empty
          ) {
            state.gameField = generateBlockOnGameField(
              state.hackman.position.y - 1,
              state.hackman.position.x,
              state.gameField
            );

            state.hackman.canSetBlock = false;
            state.block[0] = state.hackman.position.y - 1;
            state.block[1] = state.hackman.position.x;
          }
          break;
        case Direction.Left:
          if (
            state.hackman.canSetBlock &&
            state.gameField[state.hackman.position.y][
            state.hackman.position.x + 1
            ] === Empty
          ) {
            state.gameField = generateBlockOnGameField(
              state.hackman.position.y,
              state.hackman.position.x + 1,
              state.gameField
            );
            state.hackman.canSetBlock = false;
            state.block[0] = state.hackman.position.y;
            state.block[1] = state.hackman.position.x + 1;
          }
          break;
        case Direction.Right:
          if (
            state.hackman.canSetBlock &&
            state.gameField[state.hackman.position.y][
            state.hackman.position.x - 1
            ] === Empty
          ) {
            state.gameField = generateBlockOnGameField(
              state.hackman.position.y,
              state.hackman.position.x - 1,
              state.gameField
            );

            state.hackman.canSetBlock = false;
            state.block[0] = state.hackman.position.y;
            state.block[1] = state.hackman.position.x - 1;
          }
          break;
      }
    },
    hackmanJump: (state) => {
      if (state.hackman.canJump) {
        if (state.hackman.moveable !== Moveable.No && state.hackman.moveable !== Moveable.Gate) {
          let positionToCheck: Coordinate = new Coordinate(100, 100);
          switch (state.hackman.direction) {
            case Direction.Up: {
              positionToCheck = new Coordinate(state.hackman.position.y - 2, state.hackman.position.x);
              break;
            }
            case Direction.Right: {
              positionToCheck = new Coordinate(state.hackman.position.y, state.hackman.position.x + 2);
              break;
            }
            case Direction.Down: {
              positionToCheck = new Coordinate(state.hackman.position.y + 2, state.hackman.position.x);
              break;
            }
            case Direction.Left: {
              positionToCheck = new Coordinate(state.hackman.position.y, state.hackman.position.x - 2);
              break;
            }
            default:
              break;
          }
          if (positionToCheck.x !== 100) {
            if (state.gameField[positionToCheck.y][positionToCheck.x] === Coin || state.gameField[positionToCheck.y][positionToCheck.x] === Empty) {
              state.gameField[state.hackman.position.y][state.hackman.position.x] = Empty;
              state.gameField[positionToCheck.y][positionToCheck.x] = Hackman;
              state.hackman.positionY = positionToCheck.y;
              state.hackman.positionX = positionToCheck.x;
              state.hackman.moveable = canMove(
                state.gameField,
                state.hackman.position,
                state.hackman.direction,
                state.ghosts
              );
              if (state.gameField[positionToCheck.y][positionToCheck.x] === Coin) {
                state.eatenCoins++;
              }
              state.hackman.canJump = false;
            }
            else if (state.gameField[positionToCheck.y][positionToCheck.x] === GreenGhost) {
              if (greenGhost.isEdible) {
                resetGreenGhost(state.gameField, state.ghosts[0]);
                state.eatenCoins += 10;
              }
              else {
                ghostEatsHackman(state.gameField, state.ghosts, state.hackman);
              }
              state.hackman.canJump = false;
            }
            else if (state.gameField[positionToCheck.y][positionToCheck.x] === RedGhost) {
              if (greenGhost.isEdible) {
                resetRedGhost(state.gameField, state.ghosts[1]);
                state.eatenCoins += 10;
              }
              else {
                ghostEatsHackman(state.gameField, state.ghosts, state.hackman);
              }
              state.hackman.canJump = false;
            }
            else if (state.gameField[positionToCheck.y][positionToCheck.x] === OrangeGhost) {
              if (greenGhost.isEdible) {
                resetOrangeGhost(state.gameField, state.ghosts[2]);
                state.eatenCoins += 10;
              }
              else {
                ghostEatsHackman(state.gameField, state.ghosts, state.hackman);
              }
              state.hackman.canJump = false;
            }
            else if (state.gameField[positionToCheck.y][positionToCheck.x] === BlueGhost) {
              if (greenGhost.isEdible) {
                resetBlueGhost(state.gameField, state.ghosts[3]);
                state.eatenCoins += 10;
              }
              else {
                ghostEatsHackman(state.gameField, state.ghosts, state.hackman);
              }
              state.hackman.canJump = false;
            }
          }
        }
      }
    },
    pauseGame: (state, payload: PayloadAction<boolean>) => {
      state.isPaused = payload.payload;      
    },
    openOptions: (state, payload:PayloadAction<boolean>) => {
      state.options = payload.payload
    },
    deleteBlock: (state) => {
      state.gameField = setGameField(
        state.block[0],
        state.block[1],
        state.gameField
      );
      state.hackman.canSetBlock = true;
    },
    enableJumpingFeature: (state) => {
      state.hackman.canJump = true;
    },
    openGameOver: (state, payload: PayloadAction<boolean>) => {
      state.gameOver = payload.payload
    },
    restartGame: (state) => {
      state.eatenCoins = 0
      state.hackman.remainingLifes = 3
      state.gameOver = false
      state.win = false
      state.isPaused = false
      state.points = 0
      state.hackman.resetToStartPosition(0, 0)
      for(let i = 0; i < ghosts.length; i++){
        ghosts[i].resetToStartPosition(0,0)
      }
      state.gameField = SpielfeldLayout()
    },
    winGame: (state) => {
      state.win = true;
      state.isPaused = true
    }
    
  },
});

export default gameFieldSlice;
