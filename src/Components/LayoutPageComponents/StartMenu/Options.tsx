import "./css/options.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import { FaCheck, FaMinus, FaPlus, FaRegHandPointLeft, FaRegHandPointRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import appStateSlice from "../../../State/appState/appStateSlice";
import { State } from "../../../State/store";


const Options: React.FC = () => {
    const dispatch = useDispatch();
    const { changePlayerName, changeDifficult, changePlayingHand } = bindActionCreators(appStateSlice.actions, dispatch);
    const difficult = useSelector((state: State) => state.appState.difficult);
    const playerName = useSelector((state: State) => state.appState.playerName);
    const playerHand = useSelector((state:State) => state.appState.playerHand)
    const gameStarted = useSelector((state: State) => state.appState.gameIsRunning);
    let name = document.getElementById("s-opt-name-i") as HTMLInputElement;
    const [BtnPlus, SetBtnPlus] = useState(false);
    const [BtnMinus, SetBtnMinus] = useState(false);


    useEffect(() => {
        if (difficult <= 1) {
            SetBtnMinus(true);
            SetBtnPlus(false);
        } else if (difficult >= 4) {
            SetBtnMinus(false);
            SetBtnPlus(true);
        } else if (difficult > 1 && difficult < 4) {
            SetBtnMinus(false);
            SetBtnPlus(false);
        }
    }, [difficult]);

    return (
        <>
            <div className="overlay-heading dorange-text heading-fontsize">OPTIONS</div>
            <div className="option-section">
                <div className="overlay-text text-fontsize white-text">Name:</div>
                <div className="option-subsection">
                    <input id="name-input" placeholder={playerName}></input>
                    <button id="accept-name-btn" className="small-btn green-background" onClick={() => changePlayerName(name.value)}>
                        <FaCheck />
                    </button>
                </div>
            </div>
            {!gameStarted && (
                <div className="option-section">
                    <div className="overlay-text text-fontsize white-text">Difficult:</div>
                    <div className="option-subsection">
                        <button disabled={BtnMinus} id="s-minus" className="small-btn difficult-btn red-background" onClick={() => changeDifficult("minus")}>
                            <FaMinus />
                        </button>
                        <div className="overlay-text text-fontsize white-text">{difficult}</div>
                        <button disabled={BtnPlus} id="s-plus" className="small-btn difficult-btn green-background" onClick={() => changeDifficult("plus")}>
                            <FaPlus />
                        </button>
                    </div>
                </div>
            )}
            <div className="option-section">
                <div className="overlay-text text-fontsize white-text">Handed:</div>
                <div className="option-subsection">
                    <div className="hand-icon">
                        <FaRegHandPointLeft />
                    </div>
                    <div className="toggle">
                        <label className="switch">
                            <input type="checkbox" defaultChecked={playerHand} onClick={() => changePlayingHand()} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="hand-icon">
                        <FaRegHandPointRight />
                    </div>
                </div>
            </div>
            <div className="btn-wrapper flex-columns">
                <Link className="btn" to="/">Back</Link>
            </div>
        </>
    );
};

export default Options;
