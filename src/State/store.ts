import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import gameFieldSlice from "./slices/gameFieldSlice";

export const store = createStore(gameFieldSlice.reducer,applyMiddleware(thunk));

export type State = ReturnType<typeof store.getState>