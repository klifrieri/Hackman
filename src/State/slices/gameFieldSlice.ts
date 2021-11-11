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
import { ghostsTick, hackmanTick, increaseScoreAndEatenCoins, mergeGameFields } from "./gameFieldSliceHelper";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { original } from "immer";
import { cloneDeep } from 'lodash';
import { changeCharacterPosition } from "../../UtilityFunctions/move/CharacterMoveDeterminer";

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
    score: 0,
    hackman: initialStateHackman,
    ghosts: ghosts,
    block: block,
    isPaused: false,
    options: false,
    gameOver: false,
    win: false,
  },
  reducers: {
    gameTick: (state) => {
      if (!state.isPaused) {
      
        if (state.hackman.moveable !== Moveable.No) {
          changeCharacterPosition(state.hackman);
        }
        // let gameFieldForHackman = cloneDeep(state.gameField);

        // move Ghosts
        let gameFieldForGhosts = cloneDeep(state.gameField);
        ghostsTick(gameFieldForGhosts, state.hackman, state.ghosts);

        const newGameField: React.FC<any>[][] = mergeGameFields(state.hackman, state.ghosts, gameFieldForHackman, gameFieldForGhosts)
        // determine eatenCoins and points
        if (state.hackman.hackmanMoved) {
          const { shallIncreaseEatenCoins, increaseScoreBy } = increaseScoreAndEatenCoins(increaseCoins);

          if (shallIncreaseEatenCoins) {
            state.eatenCoins++;
          }
          state.score += increaseScoreBy;

          //Set all ghosts to edible after their movements but before canMove of hackman for the next tick
          if (increaseCoins === CoinValue.Five) {
            state.ghosts.forEach((ghost: WritableDraft<GhostCharacter>) => {
              ghost.isEdible = true;
            });
          }
        }

        // end move

        state.gameField = newGameField;
        state.hackman.moveable = canMove(
          state.gameField,
          state.hackman.position,
          state.hackman.direction,
          state.ghosts
        );
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
                state.ghosts[0].resetToStartPosition();
                state.gameField[ghosts[0].position.y][ghosts[0].position.x] = GreenGhost;
                state.eatenCoins += 10;
              }
              else {
                ghostEatsHackman(state.gameField, state.ghosts, state.hackman);
              }
              state.hackman.canJump = false;
            }
            else if (state.gameField[positionToCheck.y][positionToCheck.x] === RedGhost) {
              if (greenGhost.isEdible) {
                state.ghosts[1].resetToStartPosition();
                state.gameField[ghosts[1].position.y][ghosts[1].position.x] = RedGhost;
                state.eatenCoins += 10;
              }
              else {
                ghostEatsHackman(state.gameField, state.ghosts, state.hackman);
              }
              state.hackman.canJump = false;
            }
            else if (state.gameField[positionToCheck.y][positionToCheck.x] === OrangeGhost) {
              if (greenGhost.isEdible) {
                state.ghosts[2].resetToStartPosition();
                state.gameField[ghosts[2].position.y][ghosts[2].position.x] = OrangeGhost;
                state.eatenCoins += 10;
              }
              else {
                ghostEatsHackman(state.gameField, state.ghosts, state.hackman);
              }
              state.hackman.canJump = false;
            }
            else if (state.gameField[positionToCheck.y][positionToCheck.x] === BlueGhost) {
              if (greenGhost.isEdible) {
                state.ghosts[3].resetToStartPosition();
                state.gameField[ghosts[3].position.y][ghosts[3].position.x] = BlueGhost;
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
    openOptions: (state, payload: PayloadAction<boolean>) => {
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
      for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].resetToStartPosition()
      }
      state.win = false;
      state.gameField = SpielfeldLayout()
    },
    winGame: (state) => {
      state.win = true;
      state.isPaused = !state.isPaused
    }

  },
});

export default gameFieldSlice;