import "./gameOverOverlay.css"
import { emitter } from "../../UtilityFunctions/move/MoveGhost"
import { useSelector } from "react-redux"
import { State } from "../../State/store"

const GameOver:React.FC = () => {
    
    const eatenCoins = useSelector((state:State) => state.eatenCoins)
    let message: string = "hallo du noob"
    let openOverlay: string = "go-overlay-wrapper hide-overlay"

    emitter.on("OPENGAMEOVER", () =>{
        openOverlay = "go-overlay-wrapper show-overlay"
        if(eatenCoins > 130)
            message = "Game Over"
        else if(eatenCoins < 130 && eatenCoins > 91)
            message = "Das kannst du besser!"
        else if(eatenCoins < 90)
            message = "Du hast Nachrang. Noob."
    })


    return(
        <div className={openOverlay}>
            <div className="go-overlay-box">
                <p>{message}</p>
                <button id="restart-game">
                    Neues Spiel
                </button>
            </div>
        </div>
    )
}

export default GameOver