import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../../StaticAssets/data.json";

const appStateSlice = createSlice({
    name: "appState",
    initialState: {
        playerName: "Guest",
        playerHand: false,
        gameIsRunning: false,
        isPaused: false,
        gameLocked:false,
        difficult: 1,
        players: data,
    },
    reducers: {
        gameStarted: (state) => {
            state.gameIsRunning = true;
            state.gameLocked = false;
        },
		pauseGame: (state, payload: PayloadAction<boolean>) => {
            state.isPaused = payload.payload;
        },
        resetAppState: (state) => {
            state.isPaused = false;
            state.gameIsRunning = false;
            state.gameLocked = false;
        },
        lockGameField:(state)=>{
            state.gameLocked = true;
            state.gameIsRunning = false;
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
