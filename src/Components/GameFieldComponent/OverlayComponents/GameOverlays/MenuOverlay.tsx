import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import gameFieldSlice from "../../../../State/slices/gameFieldSlice";
import { State, store } from "../../../../State/store";
import Options from "./ChildComponents/Options";
import './css/settingsOverlay.css';


const Overlay: React.FC = () => {


    const dispatch = useDispatch();
    const { pauseGame, openOptions, restartGame, } = bindActionCreators(gameFieldSlice.actions, dispatch);
    const menu: boolean = useSelector((state: State) => state.menu);
    const isPaused: boolean = useSelector((state:State) => state.isPaused)
    const settings = useSelector((state:State) => state.settings)
    const [DisplayOverlay, SetDisplayOverlay] = useState("overlay-wrapper show-overlay")
    let close = document.getElementById("close-overlay") as HTMLButtonElement
    let newGame = document.getElementById("restart-game-options") as HTMLButtonElement

    useEffect(() => {        
        if(menu)
            SetDisplayOverlay("overlay-wrapper show-overlay")
        else
            SetDisplayOverlay("overlay-wrapper hide-overlay")
    }, [menu])


    close?.addEventListener("click", () => {
        store.dispatch(openOptions(!menu));
        store.dispatch(pauseGame(!isPaused));
    })
    newGame?.addEventListener("click", () => {
        store.dispatch(openOptions(!menu));
        store.dispatch(pauseGame(!isPaused));
        store.dispatch(restartGame)
    })

    return(
        
        <div className={DisplayOverlay}>
            {!settings &&
                <div className="overlay-box">
                    <h2>MENU</h2>
                    <div className="overlay-controls">
                        <button id="restart-game-options" className="btn-game">
                            New Game
                        </button>
                        <button id="options" className="btn-game">
                            Options
                        </button>
                        <button id="close-overlay" className="btn-game">
                            Close
                        </button>
                    </div>
                </div>
            }
            {settings &&
                <Options />
            }
        </div>
    )
} 

export default Overlay