import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import appStateSlice from "./appState/appStateSlice";
import gameStateSlice from "./gameState/gameStateSlice";


//If you want to use the redux dev tools comment this store in and the other one out
//! f5 debugging is not working then
// export const store = createStore(gameFieldSlice.reducer,compose(
//     applyMiddleware(thunk),
//     (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
// ) );

const reducer = combineReducers({
    appState: appStateSlice.reducer,
    gameState: gameStateSlice.reducer
});

export const store = createStore(reducer, applyMiddleware(thunk));

export type State = ReturnType<typeof store.getState>