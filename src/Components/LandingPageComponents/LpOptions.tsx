import "./css/lpOptions.css";
import { State } from "../../State/store";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import gameStateSlice from "../../State/gameState/gameStateSlice";
import { useEffect, useState } from "react";
import { FaCheck, FaMinus, FaPlus, FaRegHandPointLeft, FaRegHandPointRight } from "react-icons/fa";
import appStateSlice from "../../State/appState/appStateSlice";
import { Link } from "react-router-dom";


const LpOptions: React.FC = () => {
    const dispatch = useDispatch();
    const { changePlayerName, changeDifficult, changePlayingHand, backToStartMenu, backToMenu } = bindActionCreators(appStateSlice.actions, dispatch);
    const difficult = useSelector((state: State) => state.appState.difficult);
    const playerName = useSelector((state: State) => state.appState.playerName);
    const playerHand = useSelector((state:State) => state.appState.playerHand)
    const gameStarted = useSelector((state: State) => state.appState.gameStarted);
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
        <div className="s-overlay-opt">
            <div className="s-opt-h">OPTIONS</div>
            <div className="s-opt-el">
                <div className="s-opt-t">Name:</div>
                <div className="s-opt-w">
                    <input id="s-opt-name-i" placeholder={playerName}></input>
                    <button id="s-opt-name" onClick={() => changePlayerName(name.value)}>
                        <FaCheck />
                    </button>
                </div>
            </div>
            {!gameStarted && (
                <div className="s-opt-el">
                    <div className="s-opt-t">Difficult:</div>
                    <div className="s-opt-w">
                        <button disabled={BtnMinus} id="s-minus" className="s-opt-dif-btn minus" onClick={() => changeDifficult("minus")}>
                            <FaMinus />
                        </button>
                        <div className="s-opt-t">{difficult}</div>
                        <button disabled={BtnPlus} id="s-plus" className="s-opt-dif-btn plus" onClick={() => changeDifficult("plus")}>
                            <FaPlus />
                        </button>
                    </div>
                </div>
            )}
            <div className="s-opt-el">
                <div className="s-opt-t">Handed:</div>
                <div className="s-opt-w">
                    <div className="s-opt-hand-icon">
                        <FaRegHandPointLeft />
                    </div>
                    <div className="toggle">
                        <label className="switch">
                            <input type="checkbox" defaultChecked={playerHand} onClick={() => changePlayingHand()} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="s-opt-hand-icon">
                        <FaRegHandPointRight />
                    </div>
                </div>
            </div>
            <div className="s-overlay-buttons">
                <Link className="s-overlay-button" to="/">Back</Link>
            </div>
        </div>
    );
};

export default LpOptions;
