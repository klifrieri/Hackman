import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SpielfeldLayout from "../../SpielfeldLayout";
import Direction from "../../Types/Direction";
import Moveable from "../../Types/Moveable";
import { FC } from "react";
import CoinValue from "../../Types/CoinValue";
import HackmanCharacter from "../../Types/Character/HackmanCharacter";
import { generateBlockOnGameField, setGameField, } from "../../UtilityFunctions/SpecialActions";
import Empty from "../../Components/GameFieldComponent/FieldComponents/Path/Empty";
import CharacterIdentifier from "../../Types/CharacterIdentifier";
import Coin from "../../Components/GameFieldComponent/FieldComponents/Path/Coin";
import GreenGhost from "../../Components/GameFieldComponent/GhostComponents/GreenGhost";
import RedGhost from "../../Components/GameFieldComponent/GhostComponents/RedGhost";
import OrangeGhost from "../../Components/GameFieldComponent/GhostComponents/OrangeGhost";
import BlueGhost from "../../Components/GameFieldComponent/GhostComponents/BlueGhost";
import Coordinate from "../../Types/Coordinate";
import Hackman from "../../Components/GameFieldComponent/HackmanComponent/Hackman";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { cloneDeep } from 'lodash';
import EasyGhostCharacter from "../../Types/Character/EasyGhostCharacter";
import HardGhostCharacter from "../../Types/Character/HardGhostCharacter";
import GhostCharacter from "../../Types/Character/base/GhostCharacter";
import { mergeGameField, ghostEatsHackman } from "../../UtilityFunctions/gameFieldSliceHelper/mergeGameFieldHelper";
import Snack from "../../Components/GameFieldComponent/FieldComponents/Path/Snack";
import data from "../../data.json"


const initialStateHackman: HackmanCharacter = new HackmanCharacter(CharacterIdentifier.Hackman, 12, 10);
const greenGhost = new EasyGhostCharacter(CharacterIdentifier.GreenGhost, 7, 9);
const redGhost = new EasyGhostCharacter(CharacterIdentifier.RedGhost, 7, 11);
const orangeGhost = new HardGhostCharacter(CharacterIdentifier.OrangeGhost, 9, 9, 12, 10);
const blueGhost = new HardGhostCharacter(CharacterIdentifier.BlueGhost, 9, 11, 12, 10);
const ghosts: GhostCharacter[] = [greenGhost, redGhost, orangeGhost, blueGhost];
let block: number[] = [];
initialStateHackman.attach(orangeGhost);
initialStateHackman.attach(blueGhost);

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
		players: data
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
				if (state.hackman.moveable !== Moveable.No) {
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
						
						if (state.gameField[positionToCheck.y][positionToCheck.x] === Coin || state.gameField[positionToCheck.y][positionToCheck.x] === Snack || state.gameField[positionToCheck.y][positionToCheck.x] === Empty) {
							state.gameField[state.hackman.position.y][state.hackman.position.x] = Empty;
							state.gameField[positionToCheck.y][positionToCheck.x] = Hackman;
							state.hackman.position.y = positionToCheck.y;
							state.hackman.position.x = positionToCheck.x;
							state.hackman.determineIfMoveable(state.gameField);
							if (state.gameField[positionToCheck.y][positionToCheck.x] === Coin) {
								state.eatenCoins++;
								state.score += 1;
							}
							else if (state.gameField[positionToCheck.y][positionToCheck.x] === Snack) {
								state.eatenCoins++;
								state.score += 5;
							}
							state.hackman.canJump = false;
						}
						else if (state.gameField[positionToCheck.y][positionToCheck.x] === GreenGhost) {
							if (greenGhost.isEdible) {
								if(greenGhost.cachedField === Coin || greenGhost.cachedField === Snack){
									state.eatenCoins++;
								}
								state.gameField[state.hackman.position.y][state.hackman.position.x] = Empty;
								state.gameField[positionToCheck.y][positionToCheck.x] = Hackman;
								state.hackman.position.y = positionToCheck.y;
								state.hackman.position.x = positionToCheck.x;
								state.hackman.determineIfMoveable(state.gameField);
								state.ghosts[0].resetToStartPosition();
								state.gameField[ghosts[0].position.y][ghosts[0].position.x] = GreenGhost;
								state.score += 10;
							}
							else {
								ghostEatsHackman(state.gameField, state.hackman, state.ghosts);
							}
							state.hackman.canJump = false;
						}
						else if (state.gameField[positionToCheck.y][positionToCheck.x] === RedGhost) {
							if (redGhost.isEdible) {
								if(redGhost.cachedField === Coin || redGhost.cachedField === Snack){
									state.eatenCoins++;
								}
								state.gameField[state.hackman.position.y][state.hackman.position.x] = Empty;
								state.gameField[positionToCheck.y][positionToCheck.x] = Hackman;
								state.hackman.position.y = positionToCheck.y;
								state.hackman.position.x = positionToCheck.x;
								state.hackman.determineIfMoveable(state.gameField);
								state.ghosts[1].resetToStartPosition();
								state.gameField[ghosts[1].position.y][ghosts[1].position.x] = RedGhost;
								state.score += 10;
							}
							else {
								ghostEatsHackman(state.gameField, state.hackman, state.ghosts);
							}
							state.hackman.canJump = false;
						}
						else if (state.gameField[positionToCheck.y][positionToCheck.x] === OrangeGhost) {
							if (orangeGhost.isEdible) {
								if(orangeGhost.cachedField === Coin || orangeGhost.cachedField === Snack){
									state.eatenCoins++;
								}
								state.gameField[state.hackman.position.y][state.hackman.position.x] = Empty;
								state.gameField[positionToCheck.y][positionToCheck.x] = Hackman;
								state.hackman.position.y = positionToCheck.y;
								state.hackman.position.x = positionToCheck.x;
								state.hackman.determineIfMoveable(state.gameField);
								state.ghosts[2].resetToStartPosition();
								state.gameField[ghosts[2].position.y][ghosts[2].position.x] = OrangeGhost;
								state.score += 10;
							}
							else {
								ghostEatsHackman(state.gameField, state.hackman, state.ghosts);
							}
							state.hackman.canJump = false;
						}
						else if (state.gameField[positionToCheck.y][positionToCheck.x] === BlueGhost) {
							if (blueGhost.isEdible) {
								if(blueGhost.cachedField === Coin || blueGhost.cachedField === Snack){
									state.eatenCoins++;
								}
								state.gameField[state.hackman.position.y][state.hackman.position.x] = Empty;
								state.gameField[positionToCheck.y][positionToCheck.x] = Hackman;
								state.hackman.position.y = positionToCheck.y;
								state.hackman.position.x = positionToCheck.x;
								state.hackman.determineIfMoveable(state.gameField);
								state.ghosts[3].resetToStartPosition();
								state.gameField[ghosts[3].position.y][ghosts[3].position.x] = BlueGhost;
								state.score += 10;
							}
							else {
								ghostEatsHackman(state.gameField, state.hackman, state.ghosts);
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
			state.gameField = SpielfeldLayout();
		},
		winGame: (state) => {
			state.win = true;
			state.isPaused = true;
		},
	},
});

export default gameFieldSlice;