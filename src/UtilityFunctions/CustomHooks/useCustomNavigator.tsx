import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { bindActionCreators } from "redux";
import appStateSlice from "../../State/appState/appStateSlice";
import gameStateSlice from "../../State/gameState/gameStateSlice";


const useCustomNavigator = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { gameStarted, resetAppState, lockGameField, pauseGame } = bindActionCreators(appStateSlice.actions, dispatch);
    const { resetGameState } = bindActionCreators(gameStateSlice.actions, dispatch);

    const startGame = () => {
        gameStarted();
        navigate("/" + process.env.REACT_APP_URL + "/game")
    };

    const restartGame = () => {
        resetAppState();
        resetGameState();
        gameStarted();
        navigate("/" + process.env.REACT_APP_URL + "/game")
    };
    const endGame = () => {
        lockGameField();
        navigate("/" + process.env.REACT_APP_URL + "/end")
    }
    const menuWhilePlaying = () => {
        pauseGame(true);
        navigate("/" + process.env.REACT_APP_URL);
    }
    return { startGame, restartGame, endGame, menuWhilePlaying };
}

export default useCustomNavigator;