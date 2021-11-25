import "./gameOver.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import appStateSlice from "../../State/appState/appStateSlice";
import { State } from "../../State/store";
import { Link } from "react-router-dom";


const EndedGame: React.FC = () => {
    const eatenCoins: number = useSelector((state: State) => state.gameState.eatenCoins);
    const [Message, SetMessage] = useState("Game Over")
    const [Header, SetHeader] = useState("")

    return (
        <div className="go-overlay-wrapper">
            <div className="go-overlay-box">
                <h2>{Header}</h2>
                <p>{Message}</p>
                <div className="btn-wrapper flex-row">
                    <Link to="/" className="btn">Back</Link>
                    <button className="btn">New Game</button>
                </div>
            </div>
        </div>
    )
}

export default EndedGame