import "./css/gameOverOverlay.css"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../State/store"
import { useEffect, useState } from "react"
import { bindActionCreators } from "redux"
import gameFieldSlice from "../../../State/gameFieldSlice/gameFieldSlice"


const GameOver:React.FC = () => {
    
    const gameOver: boolean = useSelector((state: State) => state.gameOver);
    const eatenCoins: number = useSelector((state:State) => state.eatenCoins)
    const [Message, SetMessage] = useState("Game Over")
    const [Header, SetHeader] = useState("")
    const [DisplayOverlay, SetDisplayOverlay] = useState("go-overlay-wrapper go-hide-overlay")
    
    const dispatch = useDispatch();
    const { restartGame } = bindActionCreators(
        gameFieldSlice.actions,
        dispatch
        );
        

    useEffect(() => {        
        if(gameOver){
            SetDisplayOverlay("go-overlay-wrapper go-show-overlay")
            if(eatenCoins > 130){
                SetMessage("Close. Next time... YOU WILL WIN!")
                SetHeader("Pity.")
            }
            else if(eatenCoins < 130 && eatenCoins > 91){
                SetMessage("Not bad!")
                SetHeader("THE END")
            }
            else if(eatenCoins < 90){
                SetMessage("Noob. Just noob.")
                SetHeader("WTF???")
            }
        }
        else
            SetDisplayOverlay("go-overlay-wrapper go-hide-overlay")

    }, [gameOver])


    return(
        <div className={DisplayOverlay}>
            <div className="go-overlay-box">
                <h2>{Header}</h2>
                <p>{Message}</p>
                <button id="restart-game" onClick={() => restartGame()}>
                    Restart
                </button>
            </div>
        </div>
    )
}

export default GameOver