import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import gameFieldSlice from "./slices/gameFieldSlice";

const reducer = combineReducers({
    gameField:gameFieldSlice.reducer
})

export const store = createStore(gameFieldSlice.reducer,applyMiddleware(thunk));

export type State = ReturnType<typeof store.getState>