import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import createGameField from "../../UtilityFunctions/createGameField";
import Direction from "../../Types_Classes/Character/Models/Direction";
import Moveable from "../../Types_Classes/Character/Models/Moveable";
import { FC } from "react";
import CoinValue from "../../Types_Classes/Models/CoinValue";
import HackmanCharacter from "../../Types_Classes/Character/HackmanCharacter";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import CharacterIdentifier from "../../Types_Classes/Character/Models/CharacterIdentifier";
import Coin from "../../Components/GameFieldComponent/FieldComponents/Path/Coin";
import GreenGhost from "../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import RedGhost from "../../Components/GameFieldComponent/GhostComponents/RedGhost";
import OrangeGhost from "../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import BlueGhost from "../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import Coordinate from "../../Types_Classes/Character/Models/Coordinate";
import Block from "../../Components/GameFieldComponent/FieldComponents/Path/Block";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { cloneDeep } from "lodash";
import EasyGhostCharacter from "../../Types_Classes/Character/EasyGhostCharacter";
import HardGhostCharacter from "../../Types_Classes/Character/HardGhostCharacter";
import GhostCharacter from "../../Types_Classes/Character/Base/GhostCharacter";
import { mergeGameField, ghostEatsHackman, setSingleGameField } from "./gameTickHelper";
import Snack from "../../Components/GameFieldComponent/FieldComponents/Path/Snack";
import data from "../../data.json";
import { eatGhost, getTargetCoordinate, letHackmanJump } from "./hackmanJumpHelper";
import activateGhostByIndex from "./activateGhostByIndex";

const initialStateHackman = new HackmanCharacter(CharacterIdentifier.Hackman, 12, 10);
const greenGhost = new EasyGhostCharacter(CharacterIdentifier.GreenGhost, 7, 9);
const redGhost = new EasyGhostCharacter(CharacterIdentifier.RedGhost, 7, 11);
const orangeGhost = new HardGhostCharacter(CharacterIdentifier.OrangeGhost, 9, 9, 12, 10);
const blueGhost = new HardGhostCharacter(CharacterIdentifier.BlueGhost, 9, 11, 12, 10);
const ghosts: GhostCharacter[] = [greenGhost, redGhost, orangeGhost, blueGhost];
let block = new Coordinate(0, 0);
initialStateHackman.attach(orangeGhost);
initialStateHackman.attach(blueGhost);

const gameFieldSlice = createSlice({
	name: "game",
	initialState: {
		gameField: createGameField(),
		eatenCoins: 0,
		score: 0,
		hackman: initialStateHackman,
		ghosts: ghosts,
		blockPosition: block,
		isPaused: false,
		options: false,
		gameOver: false,
		win: false,
		players: data,
	},
	reducers: {
		gameTick: (state) => {
			if (!state.isPaused) {
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
			}
		},
		changeIsMoveableHackman: (state, payload: PayloadAction<Direction>) => {
			state.hackman.direction = payload.payload;
			state.hackman.determineIfMoveable(state.gameField);
			if (state.hackman.hackmanMoved === false) {
				state.hackman.hackmanMoved = true;
			}
		},
		activateGhost: (state, payload: PayloadAction<number>) => {
			activateGhostByIndex(payload.payload,state.ghosts);
		},
		setBlock: (state) => {
			let direction: Direction = state.hackman.direction;
			switch (direction) {
				case Direction.Up:
					if (state.hackman.canSetBlock && state.gameField[state.hackman.position.y + 1][state.hackman.position.x] === Empty) {
						setSingleGameField(state.gameField, new Coordinate(state.hackman.position.y + 1, state.hackman.position.x), Block);
						state.hackman.canSetBlock = false;
						state.blockPosition = new Coordinate(state.hackman.position.y + 1, state.hackman.position.x);
					}
					break;
				case Direction.Down:
					if (state.hackman.canSetBlock && state.gameField[state.hackman.position.y - 1][state.hackman.position.x] === Empty) {
						setSingleGameField(state.gameField, new Coordinate(state.hackman.position.y - 1, state.hackman.position.x), Block);
						state.hackman.canSetBlock = false;
						state.blockPosition = new Coordinate(state.hackman.position.y - 1, state.hackman.position.x);
					}
					break;
				case Direction.Left:
					if (state.hackman.canSetBlock && state.gameField[state.hackman.position.y][state.hackman.position.x + 1] === Empty) {
						setSingleGameField(state.gameField, new Coordinate(state.hackman.position.y, state.hackman.position.x + 1), Block);
						state.hackman.canSetBlock = false;
						state.blockPosition = new Coordinate(state.hackman.position.y, state.hackman.position.x + 1);
					}
					break;
				case Direction.Right:
					if (state.hackman.canSetBlock && state.gameField[state.hackman.position.y][state.hackman.position.x - 1] === Empty) {
						setSingleGameField(state.gameField, new Coordinate(state.hackman.position.y, state.hackman.position.x - 1), Block);
						state.hackman.canSetBlock = false;
						state.blockPosition = new Coordinate(state.hackman.position.y, state.hackman.position.x - 1);
					}
					break;
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
		pauseGame: (state, payload: PayloadAction<boolean>) => {
			state.isPaused = payload.payload;
		},
		openOptions: (state, payload: PayloadAction<boolean>) => {
			state.options = payload.payload;
		},
		deleteBlock: (state) => {
			setSingleGameField(state.gameField, new Coordinate(state.blockPosition.y, state.blockPosition.x), Empty);
			state.hackman.canSetBlock = true;
		},
		enableJumpingFeature: (state) => {
			state.hackman.canJump = true;
		},
		openGameOver: (state, payload: PayloadAction<boolean>) => {
			state.gameOver = payload.payload;
		},
		restartGame: (state) => {
			state.eatenCoins = 0;
			state.hackman.remainingLifes = 3;
			state.gameOver = false;
			state.win = false;
			state.isPaused = false;
			state.score = 0;
			state.hackman.resetToStartPosition();
			for (let i = 0; i < ghosts.length; i++) {
				ghosts[i].resetToStartPosition();
			}
			state.gameField = createGameField();
		},
		winGame: (state) => {
			state.win = true;
			state.isPaused = true;
		},
	},
});

export default gameFieldSlice;