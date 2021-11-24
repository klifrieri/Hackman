import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import createGameField from "../../UtilityFunctions/createGameField";
import Direction from "../../Types_Classes/Character/Models/Direction";
import Moveable from "../../Types_Classes/Character/Models/Moveable";
import { FC } from "react";
import CoinValue from "../../Types_Classes/Models/CoinValue";
import HackmanCharacter from "../../Types_Classes/Character/HackmanCharacter";
import Empty from "../../Components/GamePageComponents/FieldComponents/Path/Empty";
import CharacterIdentifier from "../../Types_Classes/Character/Models/CharacterIdentifier";
import Coin from "../../Components/GamePageComponents/FieldComponents/Path/Coin";
import BlueGhost from "../../Components/GamePageComponents/GhostComponents/BlueGhost";
import Coordinate from "../../Types_Classes/Character/Models/Coordinate";
import Block from "../../Components/GamePageComponents/FieldComponents/Path/Block";
import { cloneDeep } from "lodash";
import EasyGhostCharacter from "../../Types_Classes/Character/EasyGhostCharacter";
import HardGhostCharacter from "../../Types_Classes/Character/HardGhostCharacter";
import GhostCharacter from "../../Types_Classes/Character/Base/GhostCharacter";
import { mergeGameField, ghostEatsHackman, setSingleGameField } from "./helper/gameTickHelper";
import Snack from "../../Components/GamePageComponents/FieldComponents/Path/Snack";
import { eatGhost, getTargetCoordinate, letHackmanJump } from "./helper/hackmanJumpHelper";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import GreenGhost from "../../Components/GamePageComponents/GhostComponents/GreenGhost";
import RedGhost from "../../Components/GamePageComponents/GhostComponents/RedGhost";
import OrangeGhost from "../../Components/GamePageComponents/GhostComponents/OrangeGhost";

const initialStateHackman = new HackmanCharacter(CharacterIdentifier.Hackman, 12, 10);
const greenGhost = new EasyGhostCharacter(CharacterIdentifier.GreenGhost, 7, 9);
const redGhost = new EasyGhostCharacter(CharacterIdentifier.RedGhost, 7, 11);
const orangeGhost = new HardGhostCharacter(CharacterIdentifier.OrangeGhost, 9, 9, 12, 10);
const blueGhost = new HardGhostCharacter(CharacterIdentifier.BlueGhost, 9, 11, 12, 10);
const ghosts: GhostCharacter[] = [greenGhost, redGhost, orangeGhost, blueGhost];
let block = new Coordinate(0, 0);
initialStateHackman.attach(orangeGhost);
initialStateHackman.attach(blueGhost);




const gameStateSlice = createSlice({
	name: "gameState",
	initialState: {
		gameField: createGameField(),
		eatenCoins: 0,
		hackman: initialStateHackman,
		ghosts: ghosts,
		blockPosition: block,
		score: 0,
		difficult: 1,
	},
	reducers: {
		gameTick: (state) => {
			// if (!state.isPaused) {
			if (state.hackman.moveable !== Moveable.No) {
				state.hackman.changeCharacterPosition();
			}
			let temporaryGameField: FC<any>[][] = cloneDeep(state.gameField);
			state.ghosts.forEach((ghost: WritableDraft<GhostCharacter>) => {
				if (ghost.shallTick) {
					ghost.determineNextMove(temporaryGameField);
				}
			});
			let gameField: FC<any>[][] = cloneDeep(state.gameField);
			const { shallIncreaseEatenCoins, increaseScoreBy } = mergeGameField(gameField, state.hackman, state.ghosts);
			if (shallIncreaseEatenCoins) {
				state.eatenCoins++;
			}
			switch (increaseScoreBy) {
				case CoinValue.One:
					state.score += 1;
					break;
				case CoinValue.Five:
					state.score += 5;
					state.ghosts.forEach((ghost: WritableDraft<GhostCharacter>) => {
						ghost.isEdible = true;
					});
					break;
				case CoinValue.Ten:
					state.score += 10;
					break;
			}
			state.gameField = gameField;
			state.hackman.determineIfMoveable(gameField);
			// }
		},
		setBlock: (state) => {
			let direction: Direction = state.hackman.direction;
			switch (direction) {
				case Direction.Up:
					placeBlock(new Coordinate(state.hackman.position.y + 1, state.hackman.position.x));
					break;
				case Direction.Down:
					placeBlock(new Coordinate(state.hackman.position.y - 1, state.hackman.position.x));
					break;
				case Direction.Left:
					placeBlock(new Coordinate(state.hackman.position.y, state.hackman.position.x + 1));
					break;
				case Direction.Right:
					placeBlock(new Coordinate(state.hackman.position.y, state.hackman.position.x - 1));
					break;
			}
			function placeBlock(position: Coordinate) {
				if (state.hackman.canSetBlock && state.gameField[position.y][position.x] === Empty) {
					setSingleGameField(state.gameField, position, Block);
					state.hackman.canSetBlock = false;
					state.blockPosition = position;
				}
			}
		},
		hackmanJump: (state) => {
			if (state.hackman.canJump) {
				if (state.hackman.moveable !== Moveable.No) {
					let targetCoordinate: Coordinate | undefined = getTargetCoordinate(state.hackman.direction, state.hackman.position);
					if (targetCoordinate) {
						if (state.gameField[targetCoordinate.y][targetCoordinate.x] === Coin || state.gameField[targetCoordinate.y][targetCoordinate.x] === Snack || state.gameField[targetCoordinate.y][targetCoordinate.x] === Empty) {
							letHackmanJump(state.gameField, state.hackman, targetCoordinate);
							if (state.gameField[targetCoordinate.y][targetCoordinate.x] === Coin) {
								state.eatenCoins++;
								state.score += 1;
							} else if (state.gameField[targetCoordinate.y][targetCoordinate.x] === Snack) {
								state.eatenCoins++;
								state.score += 5;
							}
							state.hackman.canJump = false;
						} else if (state.gameField[targetCoordinate.y][targetCoordinate.x] === GreenGhost) {
							ghostGetsJumped(state.ghosts[0], targetCoordinate);
						} else if (state.gameField[targetCoordinate.y][targetCoordinate.x] === RedGhost) {
							ghostGetsJumped(state.ghosts[1], targetCoordinate);
						} else if (state.gameField[targetCoordinate.y][targetCoordinate.x] === OrangeGhost) {
							ghostGetsJumped(state.ghosts[2], targetCoordinate);
						} else if (state.gameField[targetCoordinate.y][targetCoordinate.x] === BlueGhost) {
							ghostGetsJumped(state.ghosts[3], targetCoordinate);
						}
					}
				}
			}
			function ghostGetsJumped(ghost: WritableDraft<GhostCharacter>, targetCoordinate: Coordinate) {
				if (ghost.isEdible) {
					increaseScoreAfterGhostEaten(ghost);
					letHackmanJump(state.gameField, state.hackman, targetCoordinate);
					eatGhost(state.gameField, ghost);
				} else {
					ghostEatsHackman(state.gameField, state.hackman, state.ghosts);
				}
				state.hackman.canJump = false;
			}
			function increaseScoreAfterGhostEaten(ghost: WritableDraft<GhostCharacter>) {
				if (ghost.cachedField === Coin || ghost.cachedField === Snack) {
					state.eatenCoins++;
				}
				state.score += 10;
			}
		},
		deleteBlock: (state) => {
			setSingleGameField(state.gameField, new Coordinate(state.blockPosition.y, state.blockPosition.x), Empty);
			state.hackman.canSetBlock = true;
		},
		enableJumpingFeature: (state) => {
			state.hackman.canJump = true;
		},
		changeIsMoveableHackman: (state, payload: PayloadAction<Direction>) => {
			state.hackman.direction = payload.payload;
			state.hackman.determineIfMoveable(state.gameField);
			if (state.hackman.hackmanMoved === false) {
				state.hackman.hackmanMoved = true;
			}
		},
		activateGhostByIndex: (state, payload: PayloadAction<number>) => {
			state.ghosts[payload.payload].shallTick = true;
		},
		resetGhostGotEatenByIndex: (state, payload: PayloadAction<number>) => {
			state.ghosts[payload.payload].gotEaten = false;
		},
		resetAppState: (state) => {
			state.eatenCoins = 0;
			state.hackman.remainingLifes = 3;
			state.score = 0;
			state.hackman.resetToStartPosition();
			for (let i = 0; i < ghosts.length; i++) {
				ghosts[i].resetToStartPosition();
			}
			state.gameField = createGameField();
		}
	}
});

export default gameStateSlice;
