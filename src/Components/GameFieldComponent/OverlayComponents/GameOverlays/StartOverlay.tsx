import "./css/startOverlay.css"
import Image from "../../../../IMG/hackman1.png"
import {  store } from "../../../../State/store"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import gameFieldSlice from "../../../../State/slices/gameFieldSlice"
import { useState } from "react"


const Start:React.FC = () => {


    const dispatch = useDispatch();
    const { startGame } = bindActionCreators(gameFieldSlice.actions, dispatch);
    const [Options, SetOptions] = useState(false)
    const [Help, SetHelp] = useState(true)
    const [Main, SetMain] = useState(false)



    return (
        <div className="s-overlay-wrapper">
            {((!Options || !Help) && Main) &&
                <div className="s-overlay-menu">
                    <div className="s-overlay-header">
                        <div className="s-overlay-header-l s-text">HAC</div>
                        <div className="s-overlay-header-img">
                            <img src={Image} alt="Hackman-Logo" id="image"></img>
                        </div>
                        <div className="s-overlay-header-r s-text">MAN</div>
                    </div>
                    <div className="s-overlay-buttons">
                        <button id="s-start" className="s-overlay-button" onClick={() => store.dispatch(startGame)}>START</button>
                        <button id="s-options" className="s-overlay-button" onClick={() => {SetOptions(true); SetMain(false)}}>OPTIONS</button>
                        <button id="s-help" className="s-overlay-button" onClick={() => {SetHelp(true); SetMain(false)}}>HELP</button>
                    </div>
                </div>                
            }
            {(Help && !Main)  &&
                <div className="s-overlay-help">
                    <div className="s-help-h">HELP</div>
                    <div className="s-help-t">1. Move Hackman with <i>Keyboard-Arrows</i> or <i>W, A, S, D</i></div>
                    <div className="s-help-t">2. Set a Block with <i>SPACE</i> or Jump with <i>SHIFT-L</i></div>
                    <div className="s-help-t">3. Press <i>P</i> for Pause or <i>ESC</i> to open the options</div>
                    <div className="s-overlay-buttons">
                        <button className="s-overlay-button" onClick={() => {SetHelp(false); SetMain(true)}}>Back</button>
                    </div>
                </div>
            }
            {Options &&
                <div className="s-overlay-opt">

                </div>
            }
        </div>
    )
}

export default Start