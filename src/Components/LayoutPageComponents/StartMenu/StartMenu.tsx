import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { State } from "../../../State/store";
import Image from "../../../StaticAssets/hackman1.png";
import useCustomNavigator from "../../../UtilityFunctions/CustomHooks/useCustomNavigator";
import "./css/startMenu.css";
const StartMenu: React.FC = () => {
    const gameIsRunning = useSelector((state: State) => state.appState.gameIsRunning);
    const {startGame,restartGame} = useCustomNavigator();

    return (
        <>
            <div className="s-overlay-header">
                <div className="s-overlay-header-l orange-text">HAC</div>
                <div className="s-overlay-header-img">
                    <img src={Image} alt="Hackman-Logo" id="image"></img>
                </div>
                <div className="s-overlay-header-r orange-text">MAN</div>
            </div>
            <div className="btn-wrapper flex-columns">
                <button onClick={startGame} className="btn">{gameIsRunning ? "CONTINUE" : "START"}</button>
                {gameIsRunning && <button onClick={restartGame} className="btn">RESTART</button>}
                <Link to={"/" + process.env.REACT_APP_URL + "/options"} className="btn">OPTIONS</Link>
                <Link to={"/" + process.env.REACT_APP_URL + "/highscores"} className="btn">HIGHSCORES</Link>
                <Link to={"/" + process.env.REACT_APP_URL + "/help"} className="btn">HELP</Link>
            </div>
        </>
    )
}

export default StartMenu;