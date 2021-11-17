import "./gameOverOverlay.css"
import { useDispatch, useSelector } from "react-redux"
import { State, store } from "../../../../State/store"
import { useEffect, useState } from "react"
import { bindActionCreators } from "redux"
import gameFieldSlice from "../../../../State/gameFieldSlice/gameFieldSlice"


const GameOver:React.FC = () => {
    
    const gameOver: boolean = useSelector((state: State) => state.gameOver);
    const score: number = useSelector((state:State) => state.score)
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
//Score
    useEffect(() => {        
        if(gameOver){
            SetDisplayOverlay("go-overlay-wrapper go-show-overlay")
            if(score > 130)
            SetMessage("Game Over")
            else if(score < 130 && score > 91)
                SetMessage("Das kannst du besser!")
            else if(score < 90)
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