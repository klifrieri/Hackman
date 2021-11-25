import "./endedGame.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { State } from "../../../State/store";
import { Link } from "react-router-dom";
import useCustomNavigator from "../../../UtilityFunctions/CustomHooks/useCustomNavigator";


const EndedGame: React.FC = () => {
    const score:number = useSelector((state:State)=>state.gameState.score);
    const {restartGame} = useCustomNavigator();

    return (
        <>
            <h1>Game Over!</h1>
            <p>You reached {score} points!</p>
            <div className="btn-wrapper flex-row">
                <Link to="/" className="btn">Back</Link>
                <button onClick={restartGame} className="btn">New Game</button>
            </div>
        </>
    )
}

export default EndedGame