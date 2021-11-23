import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../../data.json";

const appStateSlice = createSlice({
    name: "appState",
    initialState: {
        playerName: "Guest",
        playerHand: false,
        isPaused: false,
        menu: false,
        help: false,
        settings: false,
        gameOver: false,
        win: false,
        difficult: 1,
        gameStarted: false,
        players: data,
    },
    reducers: {
		pauseGame: (state, payload: PayloadAction<boolean>) => {
			state.isPaused = payload.payload;
		},
		openMenu: (state, payload: PayloadAction<boolean>) => {
			state.menu = payload.payload;
		},
		openGameOver: (state, payload: PayloadAction<boolean>) => {
			state.gameOver = payload.payload;
		},
		restartGame: (state) => {
			// state.eatenCoins = 0;
			// state.hackman.remainingLifes = 3;
			state.gameOver = false;
			state.win = false;
			state.isPaused = false;
			// state.score = 0;
			// state.hackman.resetToStartPosition();
			// for (let i = 0; i < ghosts.length; i++) {
			// 	ghosts[i].resetToStartPosition();
			// }
			// state.gameField = createGameField();
		},
		winGame: (state) => {
			state.win = true;
			state.isPaused = true;
		},
        changePlayerName: (state, payload: PayloadAction<string>) => {
            state.playerName = payload.payload;
        },
        changeDifficult: (state, payload: PayloadAction<string>) => {
            if (payload.payload === "plus") state.difficult += 1;
            else if (payload.payload === "minus") state.difficult -= 1;
        },
        changePlayingHand: (state) => {
            state.playerHand = !state.playerHand;
            console.log(state.playerHand);
        },
        openHelp: (state) => {
            state.help = true;
        },
        openSettings: (state) => {
            state.settings = true;
        },
        backToStartMenu: (state, payload: PayloadAction<string>) => {
            if (payload.payload === "options") {
                state.settings = false;
            } else if (payload.payload === "help") {
                state.help = false;
            }
        },
        backToMenu: (state) => {
            state.menu = true
            state.settings = false
        }
    },
});

export default appStateSlice;
