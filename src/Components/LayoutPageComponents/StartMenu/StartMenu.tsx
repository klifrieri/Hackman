import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import appStateSlice from "../../../State/appState/appStateSlice";
import gameStateSlice from "../../../State/gameState/gameStateSlice";
import { State } from "../../../State/store";
import Image from "../../../StaticAssets/hackman1.png";
import "./css/startMenu.css";

const StartMenu: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { gameStarted, resetAppState } = bindActionCreators(appStateSlice.actions, dispatch);
    const { resetGameState } = bindActionCreators(gameStateSlice.actions, dispatch);
    const gameIsRunning = useSelector((state: State) => state.appState.gameIsRunning);

    const startGame = () => {
        gameStarted();
        navigate("/game");
    };

    const restartGame = () => {
        resetAppState();
        resetGameState();

        gameStarted();
        navigate("/game");
    };

    return (
        <>
            <div className="s-overlay-header">
                <div className="s-overlay-header-l orange-text">HAC</div>
                <div className="s-overlay-header-img">
                    <img src={Image} alt="Hackman-Logo" id="image"></img>
                </div>
                <div className="s-overlay-header-r orange-text">MAN</div>
            </div>
            <div className="btn-wrapper">
                <button onClick={startGame} className="btn">{gameIsRunning ? "CONTINUE" : "START"}</button>
                {gameIsRunning && <button onClick={restartGame} className="btn">RESTART</button>}
                <Link to="/options" className="btn">OPTIONS</Link>
                <Link to="/highscores" className="btn">HIGHSCORES</Link>
                <Link to="/help" className="btn">HELP</Link>
            </div>
        </>
    )
}

export default StartMenu;