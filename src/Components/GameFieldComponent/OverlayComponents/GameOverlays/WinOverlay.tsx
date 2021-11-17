import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import gameFieldSlice from "../../../../State/slices/gameFieldSlice";
import { State, store } from "../../../../State/store";
import HighscoreTable from "../../../StatsComponent/HighscoreTable";
import './css/winOverlay.css';


const WinOverlay: React.FC = () => {

    const win: boolean = useSelector((state: State) => state.win);
    const eatenCoins: number = useSelector((state:State) => state.eatenCoins)

    const [DisplayOverlay, SetDisplayOverlay] = useState("win-overlay-wrapper hide-overlay")

    let restartButton = document.getElementById("win-restart-game")

    
    const dispatch = useDispatch();
    const { restartGame } = bindActionCreators(
        gameFieldSlice.actions,
        dispatch
        );
        
    restartButton?.addEventListener("click", () => {
        store.dispatch(restartGame)
    })
    

    useEffect(() => {
        
        if(win)
            SetDisplayOverlay("win-overlay-wrapper show-overlay")
        else
            SetDisplayOverlay("win-overlay-wrapper hide-overlay")

    }, [win])

    return(
        <div className={DisplayOverlay}>
            <div className="win-overlay-box">
                <h2 className="win-overlay-header">WIN!</h2>
                <HighscoreTable/>
                <h4>Your score: {eatenCoins}</h4>
                <button id="win-restart-game">
                    New Game
                </button>
            </div>
        </div>
    )
} 

export default WinOverlay