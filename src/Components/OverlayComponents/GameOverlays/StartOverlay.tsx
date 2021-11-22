import Image from "../../../IMG/hackman1.png"
import {  State } from "../../../State/store"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import gameStateSlice from "../../../State/gameState/gameStateSlice"
import Help from "./ChildComponents/HelpDialog"
import Options from "./ChildComponents/OptionsDialog"
import "./css/startOverlay.css"
import appStateSlice from "../../../State/appState/appStateSlice"


const Start:React.FC = () => {


    const dispatch = useDispatch();
    const { startGame, openHelp, openSettings } = bindActionCreators(appStateSlice.actions, dispatch);

    const start = useSelector((state:State) => state.appState.start)
    const settings = useSelector((state:State) => state.appState.settings)
    const help = useSelector((state:State) => state.appState.help)    


    return (
        <div className="s-overlay-wrapper">
            {((!settings || !help) && start) &&
                <div className="s-overlay-menu">
                    <div className="s-overlay-header">
                        <div className="s-overlay-header-l s-text">HAC</div>
                        <div className="s-overlay-header-img">
                            <img src={Image} alt="Hackman-Logo" id="image"></img>
                        </div>
                        <div className="s-overlay-header-r s-text">MAN</div>
                    </div>
                    <div className="s-overlay-buttons">
                        <button id="s-start" className="s-overlay-button" onClick={() => startGame()}>START</button>
                        <button id="s-options" className="s-overlay-button" onClick={() => openSettings()}>OPTIONS</button>
                        <button id="s-help" className="s-overlay-button" onClick={() => openHelp()}>HELP</button>
                    </div>
                </div>                
            }
            {(help && !start)  &&                
                <Help/>
            }
            {(settings && !start) &&                
                <Options pComp={false}/>
            }
        </div>
    )
}

export default Start