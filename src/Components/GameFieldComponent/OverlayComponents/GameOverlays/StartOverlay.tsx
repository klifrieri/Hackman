import "./css/startOverlay.css"
import Image from "../../../../IMG/hackman1.png"
import {  State } from "../../../../State/store"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import gameFieldSlice from "../../../../State/slices/gameFieldSlice"
import { useEffect, useState } from "react"
import { FaCheck, FaMinus, FaPlus, FaRegHandPointLeft, FaRegHandPointRight } from "react-icons/fa"


const Start:React.FC = () => {


    const dispatch = useDispatch();
    const { startGame, changePlayerName, changeDifficult, changePlayingHand } = bindActionCreators(gameFieldSlice.actions, dispatch);
    const difficult = useSelector((state:State) => state.difficult)
    const playerName = useSelector((state:State) => state.playerName)
    const [Options, SetOptions] = useState(false)
    const [Help, SetHelp] = useState(false)
    const [Main, SetMain] = useState(true)
    let name = document.getElementById("s-opt-name-i") as HTMLInputElement
    const [BtnPlus, SetBtnPlus] = useState(false)
    const [BtnMinus, SetBtnMinus] = useState(false)
    


    useEffect(() => {    
        if(difficult <= 1){
            SetBtnMinus(true)
            SetBtnPlus(false)
        }
        else if(difficult >= 4){
            SetBtnMinus(false)
            SetBtnPlus(true)
        }
        else if(difficult > 1 && difficult < 4){
            SetBtnMinus(false)
            SetBtnPlus(false)
        }        
    }, [difficult])




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
                        <button id="s-start" className="s-overlay-button" onClick={() => startGame()}>START</button>
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
            {(Options && !Main) &&
                <div className="s-overlay-opt">
                    <div className="s-opt-h">OPTIONS</div>
                    <div className="s-opt-el">
                        <div className="s-opt-t">Name:</div>
                        <div className="s-opt-w">
                            <input id="s-opt-name-i" placeholder={playerName}></input>
                            <button id="s-opt-name" onClick={() => changePlayerName(name.value)}><FaCheck/></button>
                        </div>
                    </div>
                    <div className="s-opt-el">
                        <div className="s-opt-t">Difficult:</div>
                        <div className="s-opt-w">
                            <button disabled={BtnMinus} id="s-minus" className="s-opt-dif-btn minus" onClick={() => changeDifficult("minus")}><FaMinus/></button>
                            <div className="s-opt-t">{difficult}</div>
                            <button disabled={BtnPlus} id="s-plus" className="s-opt-dif-btn plus" onClick={() => changeDifficult("plus")}><FaPlus/></button>
                        </div>
                    </div>
                    <div className="s-opt-el">
                        <div className="s-opt-t">Handed:</div>
                        <div className="s-opt-w">
                            <div className="s-opt-hand-icon"><FaRegHandPointLeft/></div>
                            <div className="toggle">
                                <label className="switch">
                                    <input type="checkbox" onClick={() => changePlayingHand()}/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="s-opt-hand-icon"><FaRegHandPointRight/></div>
                        </div>
                    </div>
                    <div className="s-overlay-buttons">
                        <button id="s-opt-back-btn" className="s-overlay-button" onClick={() => {SetOptions(false); SetMain(true)}}>BACK</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Start