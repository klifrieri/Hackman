import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appStateSlice from "../../State/appState/appStateSlice";
import { State } from "../../State/store";
import HighScores from "./StartMenu/Highscores";
import "./css/win.css";

const Win: React.FC = () => {

    const win: boolean = useSelector((state: State) => state.appState.win);
    const score: number = useSelector((state: State) => state.gameState.score);
    //const playerName: string = useSelector((state:State) => state.playerName)

    const dispatch = useDispatch();
    const { resetAppState: restartGame } = bindActionCreators(appStateSlice.actions, dispatch);


    return (
        <>
            <h2 className="win-overlay-header">WIN!</h2>
            <HighScores />
            <h4>Your score: {score}</h4>
            <button id="win-restart-game" className="btn" onClick={() => restartGame()}>
                New Game
            </button>
        </>
    );
};

export default Win;
