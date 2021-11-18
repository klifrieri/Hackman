import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import gameFieldSlice from "../../../State/gameFieldSlice/gameFieldSlice";
import { State } from "../../../State/store";
import HighscoreTable from "../../StatsComponent/HighscoreTable";
import "./css/winOverlay.css";

const WinOverlay: React.FC = () => {

    const win: boolean = useSelector((state: State) => state.win);
    const score: number = useSelector((state: State) => state.score);
    //const playerName: string = useSelector((state:State) => state.playerName)
    const [DisplayOverlay, SetDisplayOverlay] = useState("win-overlay-wrapper hide-overlay");

    const dispatch = useDispatch();
    const { restartGame } = bindActionCreators(gameFieldSlice.actions, dispatch);

    useEffect(() => {
        if (win) {
            SetDisplayOverlay("win-overlay-wrapper show-overlay");

        }
        else SetDisplayOverlay("win-overlay-wrapper hide-overlay");
    }, [win]);

    return (
        <div className={DisplayOverlay}>
            <div className="win-overlay-box">
                <h2 className="win-overlay-header">WIN!</h2>
                <HighscoreTable />
                <h4>Your score: {score}</h4>
                <button id="win-restart-game" onClick={() => restartGame()}>
                    New Game
                </button>
            </div>
        </div>
    );
};

export default WinOverlay;
