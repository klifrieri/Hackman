import "./css/optionsDialog.css";
import { State } from "../../../../../State/store";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import gameFieldSlice from "../../../../../State/slices/gameFieldSlice";
import { useEffect, useState } from "react";
import { FaCheck, FaMinus, FaPlus, FaRegHandPointLeft, FaRegHandPointRight } from "react-icons/fa";

interface IOptionsProps{
    pComp:boolean
}

const Options: React.FC<IOptionsProps> = (props) => {
    const dispatch = useDispatch();
    const { changePlayerName, changeDifficult, changePlayingHand, backToStartMenu, backToMenu } = bindActionCreators(gameFieldSlice.actions, dispatch);
    const difficult = useSelector((state: State) => state.difficult);
    const playerName = useSelector((state: State) => state.playerName);
    const playerHand = useSelector((state:State) => state.playerHand)
    const gameStarted = useSelector((state: State) => state.gameStarted);
    let name = document.getElementById("s-opt-name-i") as HTMLInputElement;
    const [BtnPlus, SetBtnPlus] = useState(false);
    const [BtnMinus, SetBtnMinus] = useState(false);

    const parentComponentMenu = props.pComp

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
                            <input type="checkbox" checked={playerHand} onClick={() => changePlayingHand()} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="s-opt-hand-icon">
                        <FaRegHandPointRight />
                    </div>
                </div>
            </div>
            {parentComponentMenu &&
                <div className="s-overlay-buttons">
                <button id="s-opt-back-btn" className="s-overlay-button" onClick={() => backToMenu()}>
                    BACK
                </button>
            </div>
            }
            {!parentComponentMenu &&
                <div className="s-overlay-buttons">
                    <button id="s-opt-back-btn" className="s-overlay-button" onClick={() => backToStartMenu("options")}>
                        BACK
                    </button>
                </div>            
            }
        </div>
    );
};

export default Options;
