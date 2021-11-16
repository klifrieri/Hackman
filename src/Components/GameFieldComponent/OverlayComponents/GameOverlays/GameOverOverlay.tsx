import "./gameOverOverlay.css"
import { useDispatch, useSelector } from "react-redux"
import { State, store } from "../../../../State/store"
import { useEffect, useState } from "react"
import { bindActionCreators } from "redux"
import gameFieldSlice from "../../../../State/slices/gameFieldSlice"


const GameOver:React.FC = () => {
    
    const gameOver: boolean = useSelector((state: State) => state.gameOver);
    const eatenCoins: number = useSelector((state:State) => state.eatenCoins)
    const [Message, SetMessage] = useState("Game Over")
    const [DisplayOverlay, SetDisplayOverlay] = useState("go-overlay-wrapper go-hide-overlay")

    let restartButton = document.getElementById("restart-game")

    
    const dispatch = useDispatch();
    const { restartGame } = bindActionCreators(
        gameFieldSlice.actions,
        dispatch
        );
        
    restartButton?.addEventListener("click", () => {
        store.dispatch(restartGame)
    })

    useEffect(() => {        
        if(gameOver){
            SetDisplayOverlay("go-overlay-wrapper go-show-overlay")
            if(eatenCoins > 130)
            SetMessage("Game Over")
            else if(eatenCoins < 130 && eatenCoins > 91)
                SetMessage("Das kannst du besser!")
            else if(eatenCoins < 90)
                SetMessage("Du hast Nachrang. Noob.")
        }
        else
            SetDisplayOverlay("go-overlay-wrapper go-hide-overlay")

    }, [gameOver])


    return(
        <div className={DisplayOverlay}>
            <div className="go-overlay-box">
                <h2>GAME OVER</h2>
                <p>{Message}</p>
                <button id="restart-game">
                    Neues Spiel
                </button>
            </div>
        </div>
    )
}

export default GameOver