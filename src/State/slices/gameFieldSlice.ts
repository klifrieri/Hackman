import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  canMove,
  getDirectionByMovementDirection,
  getMovementDirectionByPosition,
  getPossibleDirections,
} from "../../UtilityFunctions/move/CanMove";
import SpielfeldLayout from "../../SpielfeldLayout";
import { moveHackman } from "../../UtilityFunctions/move/MoveHackman";
import Direction from "../../Types/Direction";
import GhostCharacter from "../../Types/Character/GhostCharacter";
import Moveable from "../../Types/Moveable";
import { setRandomDirectionAndCount } from "../../UtilityFunctions/GetRandomNumber";
import { moveGhostDumb, moveGhostSmart } from "../../UtilityFunctions/move/MoveGhost";
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
import Result from "../../Types/Result";

const initialStateHackman: HackmanCharacter = new HackmanCharacter(
  CharacterIdentifier.Hackman,
  12,
  10
);
const ghost1 = new GhostCharacter(CharacterIdentifier.GreenGhost, 7, 9, MovementDirection.NorthEast, true);
const ghost2 = new GhostCharacter(CharacterIdentifier.RedGhost, 7, 11, MovementDirection.NorthWest, false);
const ghost3 = new GhostCharacter(CharacterIdentifier.OrangeGhost, 9, 9, MovementDirection.NorthEast, true);
const ghost4 = new GhostCharacter(CharacterIdentifier.BlueGhost, 9, 11, MovementDirection.NorthWest, false);
const ghosts: GhostCharacter[] = [ghost1, ghost2, ghost3, ghost4];
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
    result: Result.None
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

            if (ghost.isSmart) {

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

            } else {
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
        }
        else if (increaseCoins === CoinValue.Five) {
          state.eatenCoins += 5;
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

    pauseGame: (state, payload: PayloadAction<boolean>) => {
      state.isPaused = payload.payload;
    },
    openOptions: (state) => {
      if (state.options)
        state.options = false
      else
        state.options = true
    },
    deleteBlock: (state) => {
      state.gameField = setGameField(
        state.block[0],
        state.block[1],
        state.gameField
      );
      state.hackman.canSetBlock = true;
    },
    resetStats: (state) => {
      state.eatenCoins = 0
      state.hackman.remainingLifes = 3
    },
    getResult: (state) => {
      if(state.eatenCoins > 130)
          state.result = Result.Good
      else if(91 < state.eatenCoins && state.eatenCoins < 130)
          state.result = Result.Better
      else if(state.eatenCoins < 90)
          state.result = Result.Bad
      else
          state.result = Result.Bad
    }
  },
});

export default gameFieldSlice;
