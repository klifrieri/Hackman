import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import gameFieldSlice from "../../../State/gameFieldSlice/gameFieldSlice";
import { State, store } from "../../../State/store";
import './settingsOverlay.css';


const Overlay: React.FC = () => {


    const dispatch = useDispatch();
    const { pauseGame, openOptions, restartGame} = bindActionCreators(gameFieldSlice.actions, dispatch);
    const options: boolean = useSelector((state: State) => state.options);
    const isPaused: boolean = useSelector((state:State) => state.isPaused)
    const [DisplayOverlay, SetDisplayOverlay] = useState("overlay-wrapper show-overlay")
    let close = document.getElementById("close-overlay") as HTMLButtonElement
    let newGame = document.getElementById("restart-game-options") as HTMLButtonElement

    useEffect(() => {        
        if(options)
            SetDisplayOverlay("overlay-wrapper show-overlay")
        else
            SetDisplayOverlay("overlay-wrapper hide-overlay")
    }, [options])


    close?.addEventListener("click", () => {
        store.dispatch(openOptions(!options));
        store.dispatch(pauseGame(!isPaused));
    })
    newGame?.addEventListener("click", () => {
        store.dispatch(openOptions(!options));
        store.dispatch(pauseGame(!isPaused));
        store.dispatch(restartGame)
    })

    return(
        <div className={DisplayOverlay}>
            <div className="overlay-box">
                <h2>Optionen</h2>
                <div className="overlay-controls">
                    <button id="restart-game-options" className="btn-game">
                        Neues Spiel
                    </button>
                    <button id="options" className="btn-game">
                        Einstellungen
                    </button>
                    <button id="close-overlay" className="btn-game">
                        Schließen
                    </button>
                </div>
            </div>
        </div>
    )
} 

export default Overlay