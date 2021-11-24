import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../../StaticAssets/data.json";

const appStateSlice = createSlice({
    name: "appState",
    initialState: {
        playerName: "Guest",
        playerHand: false,
        gameStarted:false,
        isPaused: false,
        gameLost: false,
        win: false,
        difficult: 1,
        players: data,
    },
    reducers: {
		pauseGame: (state, payload: PayloadAction<boolean>) => {
			state.isPaused = payload.payload;
		},
		resetAppState: (state) => {
			state.gameLost = false;
			state.win = false;
			state.isPaused = false;
            state.gameStarted = false;
		},
		winGame: (state) => {
			state.win = true;
			state.isPaused = true;
		},
        gameOver: (state) => {
			state.gameLost = true;
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
    },
});

export default appStateSlice;
