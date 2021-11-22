import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appStateSlice from "../../../State/appState/appStateSlice";
import { State } from "../../../State/store";
import Options from "./ChildComponents/OptionsDialog";
import './css/menuOverlay.css';


const Overlay: React.FC = () => {


    const dispatch = useDispatch();
    const { pauseGame, openMenu, restartGame, openSettings } = bindActionCreators(appStateSlice.actions, dispatch);
    const menu: boolean = useSelector((state: State) => state.appState.menu);
    const isPaused: boolean = useSelector((state:State) => state.appState.isPaused)
    const settings = useSelector((state:State) => state.appState.settings)
    const [DisplayOverlay, SetDisplayOverlay] = useState("overlay-wrapper show-overlay")

    useEffect(() => {        
        if(menu)
            SetDisplayOverlay("overlay-wrapper show-overlay")
        else
            SetDisplayOverlay("overlay-wrapper hide-overlay")
    }, [menu])



    return(
        
        <div className={DisplayOverlay}>
            {!settings &&
                <div className="overlay-box">
                    <h2>MENU</h2>
                    <div className="overlay-controls">
                        <button id="restart-game-options" className="s-overlay-button" onClick={() => {openMenu(!menu); pauseGame(!isPaused); restartGame()}}>
                            New Game
                        </button>
                        <button id="options" className="s-overlay-button" onClick={() => openSettings()}>
                            Options
                        </button>
                        <button id="close-overlay" className="s-overlay-button" onClick={() => openMenu(!menu)}>
                            Close
                        </button>
                    </div>
                </div>
            }
            {settings &&
                <Options pComp={menu}/>
            }
        </div>
    )
} 

export default Overlay