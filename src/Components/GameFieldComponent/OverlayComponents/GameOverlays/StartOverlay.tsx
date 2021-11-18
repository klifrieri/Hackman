import "./css/startOverlay.css"
import Image from "../../../../IMG/hackman1.png"
import {  State } from "../../../../State/store"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import gameFieldSlice from "../../../../State/slices/gameFieldSlice"
import Options from "./ChildComponents/OptionsDIalog"
import Help from "./ChildComponents/HelpDialog"


const Start:React.FC = () => {


    const dispatch = useDispatch();
    const { startGame, openHelp, openSettings } = bindActionCreators(gameFieldSlice.actions, dispatch);

    const start = useSelector((state:State) => state.start)
    const settings = useSelector((state:State) => state.settings)
    const help = useSelector((state:State) => state.help)    


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