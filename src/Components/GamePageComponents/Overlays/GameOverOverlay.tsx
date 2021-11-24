import "./gameOverOverlay.css"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../../State/store"
import { useEffect, useState } from "react"
import { bindActionCreators } from "redux"
import appStateSlice from "../../../State/appState/appStateSlice"


const GameOver:React.FC = () => {
    const eatenCoins: number = useSelector((state:State) => state.gameState.eatenCoins);
    const [Message, SetMessage] = useState("Game Over")
    const [Header, SetHeader] = useState("")
 
    const dispatch = useDispatch();
    const { resetAppState: restartGame } = bindActionCreators(
        appStateSlice.actions,
        dispatch
        );
        

    useEffect(() => {    
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
        
    },[])


    return(
        <div className="go-overlay-wrapper">
            <div className="go-overlay-box">
                <h2>{Header}</h2>
                <p>{Message}</p>
                <button id="restart-game" className="btn" onClick={() => restartGame()}>
                    Restart
                </button>
            </div>
        </div>
    )
}

export default GameOver